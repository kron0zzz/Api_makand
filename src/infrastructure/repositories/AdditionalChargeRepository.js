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
        charge_amount
      )
      VALUES ($1, $2, $3, $4, $5)
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
  // MÉTODOS AÑADIDOS PARA EL PROCESO DE CORTES
  // =========================================

  async findPendingByOrderId(orderId) {
    // Busca los cargos de este pedido que aún no han sido procesados en un corte
    const query = `
      SELECT 
        additional_charge_id as id,
        charge_type_id,
        order_id,
        return_id,
        charge_description,
        charge_amount as amount
      FROM additional_charges 
      WHERE order_id = $1 AND (processed = false OR processed IS NULL)
    `;
    const result = await pool.query(query, [orderId]);
    return result.rows;
  }

  async markAsProcessedByOrderId(orderId) {
    // Marca los cargos de este pedido como procesados para que no se cobren doble
    const query = `
      UPDATE additional_charges 
      SET processed = true 
      WHERE order_id = $1 AND (processed = false OR processed IS NULL)
    `;
    await pool.query(query, [orderId]);
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