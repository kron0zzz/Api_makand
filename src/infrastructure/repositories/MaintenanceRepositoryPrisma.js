import pool from "../../config/database.js";

export default class MaintenanceRepositoryPrisma {
  async create(maintenanceData) {
    if (!maintenanceData || Object.keys(maintenanceData).length === 0) {
      throw new Error("No se recibieron datos del mantenimiento.");
    }

    const query = `
      INSERT INTO maintenances (
        machinery_id,
        maintenance_date,
        revision_notes
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [
      maintenanceData.machinery_id,
      maintenanceData.maintenance_date,
      maintenanceData.revision_notes || null
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const query = `
      SELECT m.*, ma.machinery_name
      FROM maintenances m
      LEFT JOIN machinery ma ON m.machinery_id = ma.machinery_id
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT m.*, ma.machinery_name
      FROM maintenances m
      LEFT JOIN machinery ma ON m.machinery_id = ma.machinery_id
      WHERE m.maintenance_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async update(id, maintenanceData) {
    if (!maintenanceData) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE maintenances
      SET 
        machinery_id = $1,
        maintenance_date = $2,
        revision_notes = $3
      WHERE maintenance_id = $4
      RETURNING *
    `;

    const values = [
      maintenanceData.machinery_id,
      maintenanceData.maintenance_date,
      maintenanceData.revision_notes || null,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM maintenances WHERE maintenance_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData() {
    const query = `
      SELECT
        maintenance_id,
        machinery_id,
        maintenance_date,
        revision_notes
      FROM maintenances
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}