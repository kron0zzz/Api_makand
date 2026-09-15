import pool from "../../../config/database.js";

export default class CheckSerialsExistGlobal {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(serials) {
    if (!serials || serials.length === 0) {
      return { existingSerials: [] };
    }

    const placeholders = serials.map((_, i) => `$${i + 1}`).join(",");
    const query = `
      SELECT serial_number
      FROM machinery_stock
      WHERE serial_number IN (${placeholders})
        AND serial_number IS NOT NULL
        AND serial_number != ''
    `;
    const result = await pool.query(query, serials);
    
    const existing = result.rows.map(row => ({ serial: row.serial_number }));
    return { existingSerials: existing };
  }
}