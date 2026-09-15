import pool from "../../../config/database.js";

export default class CheckSerialsExist {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(machineryId, serials) {
    if (!serials || serials.length === 0) {
      return { existingSerials: [] };
    }

    const placeholders = serials.map((_, i) => `$${i + 2}`).join(",");
    const query = `
      SELECT serial_number
      FROM machinery_stock
      WHERE machinery_id = $1 
        AND serial_number IN (${placeholders})
        AND serial_number IS NOT NULL
        AND serial_number != ''
    `;
    const result = await pool.query(query, [machineryId, ...serials]);
    
    const existing = result.rows.map(row => ({ serial: row.serial_number }));
    return { existingSerials: existing };
  }
}