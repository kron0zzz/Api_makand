import pool from "../../config/database.js";

export default class MaintenanceRepositoryPrisma {
  async create(maintenanceData) {
    if (!maintenanceData || Object.keys(maintenanceData).length === 0) {
      throw new Error("No se recibieron datos del mantenimiento.");
    }

    const query = `
      INSERT INTO maintenances (
        stock_id,
        maintenance_date,
        revision_notes
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [
      maintenanceData.stock_id,
      maintenanceData.maintenance_date,
      maintenanceData.revision_notes || null
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const query = `
      SELECT m.*, ma.machinery_name, ms.serial_number, ms.stock_quantity, s.status_name
      FROM maintenances m
      LEFT JOIN machinery_stock ms ON m.stock_id = ms.stock_id
      LEFT JOIN machinery ma ON ms.machinery_id = ma.machinery_id
      LEFT JOIN machinery_status s ON ms.status_id = s.status_id
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT m.*, ma.machinery_name, ms.serial_number, ms.stock_quantity, s.status_name
      FROM maintenances m
      LEFT JOIN machinery_stock ms ON m.stock_id = ms.stock_id
      LEFT JOIN machinery ma ON ms.machinery_id = ma.machinery_id
      LEFT JOIN machinery_status s ON ms.status_id = s.status_id
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
        stock_id = $1,
        maintenance_date = $2,
        revision_notes = $3
      WHERE maintenance_id = $4
      RETURNING *
    `;

    const values = [
      maintenanceData.stock_id,
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
        m.maintenance_id,
        m.stock_id,
        m.maintenance_date,
        m.revision_notes,
        ms.serial_number
      FROM maintenances m
      LEFT JOIN machinery_stock ms ON m.stock_id = ms.stock_id

    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findByMachineryId(machineryId) {
    const query = `
      SELECT
        m.maintenance_id,
        m.stock_id,
        m.maintenance_date,
        m.revision_notes,
        ms.serial_number,
        ms.machinery_id,
        s.status_name
      FROM maintenances m
      LEFT JOIN machinery_stock ms ON m.stock_id = ms.stock_id
      LEFT JOIN machinery_status s ON ms.status_id = s.status_id
      WHERE ms.machinery_id = $1
      ORDER BY m.maintenance_date DESC
    `;
    const result = await pool.query(query, [machineryId]);
    return result.rows;
  }
}