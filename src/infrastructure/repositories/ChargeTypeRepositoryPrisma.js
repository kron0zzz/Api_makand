import pool from "../../config/database.js";

export default class ChargeTypeRepositoryPrisma {
  async create(chargeTypeData) {
    if (!chargeTypeData || Object.keys(chargeTypeData).length === 0) {
      throw new Error("No se recibieron datos del tipo de cobro.");
    }

    const query = `
      INSERT INTO charge_types (charge_type_name)
      VALUES ($1)
      RETURNING *
    `;

    const values = [chargeTypeData.charge_type_name || chargeTypeData.name];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM charge_types");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM charge_types WHERE charge_type_id = $1",
      [id]
    );
    return result.rows[0];
  }

  async update(id, chargeTypeData) {
    if (!chargeTypeData) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE charge_types
      SET charge_type_name = $1
      WHERE charge_type_id = $2
      RETURNING *
    `;

    const values = [chargeTypeData.charge_type_name || chargeTypeData.name, id];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM charge_types WHERE charge_type_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData(page=1, limit=10, search ="") {
    const offset = (page - 1) * limit;

    const query = `
        SELECT
            charge_type_id,
            charge_type_name
        FROM charge_types
        WHERE
            $1 = ''
            OR LOWER(charge_type_name) LIKE LOWER($2)
        ORDER BY charge_type_id
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM charge_types
        WHERE
            $1 = ''
            OR LOWER(charge_type_name) LIKE LOWER($2)
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