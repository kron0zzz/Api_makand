import pool from "../../../config/database.js";

export default class GetLastSerialByMachineryId {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(machineryId) {
    const query = `
      SELECT serial_number
      FROM machinery_stock
      WHERE machinery_id = $1 
        AND serial_number IS NOT NULL 
        AND serial_number != ''
        AND serial_number ~ '^\d+$'
      ORDER BY stock_id DESC
      LIMIT 1
    `;
    const result = await pool.query(query, [machineryId]);
    if (result.rows.length > 0) {
      return { lastSerial: result.rows[0].serial_number };
    }
    return { lastSerial: null };
  }
}