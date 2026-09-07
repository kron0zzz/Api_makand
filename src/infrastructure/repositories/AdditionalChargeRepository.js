import pool from "../../config/database.js";

export default class AdditionalChargeRepository {
  async create(chargeData, client = pool) {
    if (!chargeData || Object.keys(chargeData).length === 0) {
      throw new Error("No se recibieron datos del cobro adicional.");
    }

    const query = `
      INSERT INTO additional_charges (
        charge_type_id,
        order_id,
        return_id,
        charge_description,
        charge_amount,
        processed
      )
      VALUES ($1, $2, $3, $4, $5, false)
      RETURNING *
    `;

    const values = [
      chargeData.charge_type_id || chargeData.chargeTypeId,
      chargeData.order_id || chargeData.orderId || null,
      chargeData.return_id || chargeData.returnId || null,
      chargeData.charge_description || chargeData.description || "",
      chargeData.charge_amount !== undefined ? chargeData.charge_amount : chargeData.amount
    ];

    const result = await client.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM additional_charges");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM additional_charges WHERE additional_charge_id = $1",
      [id]
    );
    return result.rows[0];
  }

  async update(id, chargeData) {
    if (!chargeData) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE additional_charges
      SET 
        charge_type_id = $1,
        order_id = $2,
        return_id = $3,
        charge_description = $4,
        charge_amount = $5
      WHERE additional_charge_id = $6
      RETURNING *
    `;

    const values = [
      chargeData.charge_type_id || chargeData.chargeTypeId,
      chargeData.order_id || chargeData.orderId || null,
      chargeData.return_id || chargeData.returnId || null,
      chargeData.charge_description || chargeData.description || "",
      chargeData.charge_amount !== undefined ? chargeData.charge_amount : chargeData.amount,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM additional_charges WHERE additional_charge_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  // =========================================
  // MÉTODOS ACTUALIZADOS PARA EL PROCESO DE CORTES
  // =========================================

  async findPendingByOrderId(orderId) {
    // Busca los cargos vinculados directamente al pedido O a través de las devoluciones de este
    const query = `
      SELECT DISTINCT
        ac.additional_charge_id as id,
        ac.charge_type_id,
        ac.order_id,
        ac.return_id,
        ac.charge_description,
        ac.charge_amount as amount
      FROM additional_charges ac
      LEFT JOIN returns r ON ac.return_id = r.return_id
      LEFT JOIN order_details od ON r.order_detail_id = od.order_detail_id
      WHERE (ac.order_id = $1 OR od.order_id = $1)
        AND (ac.processed = false OR ac.processed IS NULL)
    `;
    const result = await pool.query(query, [orderId]);
    return result.rows;
  }

  async markAsProcessedByOrderId(orderId) {
    // Marca como procesados los cargos del pedido o de sus devoluciones asociadas
    const query = `
      UPDATE additional_charges ac
      SET processed = true 
      FROM returns r
      LEFT JOIN order_details od ON r.order_detail_id = od.order_detail_id
      WHERE (ac.order_id = $1 OR (ac.return_id = r.return_id AND od.order_id = $1))
        AND (ac.processed = false OR ac.processed IS NULL)
    `;
    await pool.query(query, [orderId]);
  }

  async findByOrderId(
    orderId,
    client = pool
  ) {

    const query = `
      SELECT *
      FROM additional_charges
      WHERE order_id = $1
    `;

    const result = await client.query(
      query,
      [orderId]
    );

    return result.rows;

  }

  async findTransportByOrderId(
    orderId,
    client = pool
  ) {

    const query = `
      SELECT *
      FROM additional_charges
      WHERE order_id = $1
        AND charge_description = 'Transporte de entrega'
      LIMIT 1
    `;

    const result = await client.query(
      query,
      [orderId]
    );

    return result.rows[0];

  }

  async updateTransportAmount(
    chargeId,
    amount,
    client = pool
  ) {

    const query = `
      UPDATE additional_charges
      SET charge_amount = $1
      WHERE additional_charge_id = $2
      RETURNING *
    `;

    const result = await client.query(
      query,
      [amount, chargeId]
    );

    return result.rows[0];

  }

  // =========================================

  async findTableData(page = 1, limit = 10, search = "") {
    const offset = (page - 1) * limit;

    const query = `
        SELECT
            ac.additional_charge_id,
            ac.charge_type_id,
            ct.charge_type_name,
            ac.order_id,
            ac.return_id,
            ac.charge_description,
            ac.charge_amount
        FROM additional_charges ac
        LEFT JOIN charge_types ct ON ac.charge_type_id = ct.charge_type_id
        WHERE
            $1 = ''
            OR LOWER(ac.charge_description) LIKE LOWER($2)
            OR LOWER(ct.charge_type_name) LIKE LOWER($2)
        ORDER BY ac.additional_charge_id
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM additional_charges ac
        LEFT JOIN charge_types ct ON ac.charge_type_id = ct.charge_type_id
        WHERE
            $1 = ''
            OR LOWER(ac.charge_description) LIKE LOWER($2)
            OR LOWER(ct.charge_type_name) LIKE LOWER($2)
        `,
        [search, `%${search}%`]
    );

    const total = Number(totalQuery.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

