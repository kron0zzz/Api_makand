import pool from "../../config/database.js";

export default class MachineryStatusRepository {

  async create(statusData) {
    if (!statusData || Object.keys(statusData).length === 0) {
      throw new Error("No se recibieron datos del estado de maquinaria en el repositorio.");
    }

    const query = `
      INSERT INTO machinery_status (status_name)
      VALUES ($1)
      RETURNING *
    `;

    const values = [
      statusData.status_name || statusData.statusName || 'Sin Nombre'
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM machinery_status");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM machinery_status WHERE status_id = $1",
      [id]
    );
    return result.rows[0];
  }

  async update(id, statusData) {
    if (!statusData) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE machinery_status
      SET status_name = $1
      WHERE status_id = $2
      RETURNING *
    `;

    const values = [
      statusData.status_name || statusData.statusName,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM machinery_status WHERE status_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData() {
    const query = `
      SELECT
        status_id,
        status_name
      FROM machinery_status
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}