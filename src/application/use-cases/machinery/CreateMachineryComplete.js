import pool from "../../../config/database.js";
import MachineryStockRepository from "../../../infrastructure/repositories/machineryStockRepository.js";

export default class CreateMachineryComplete {

  constructor(machineryRepository, machineryStockRepository) {
    this.machineryRepository = machineryRepository;
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(machineryData, stockData, user) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const {
        category_id,
        machinery_name,
        is_motorized,
        sale_price,
        daily_rental_price,
        weight_kg,
        machinery_description,
      } = machineryData;

      const machineryResult = await client.query(
        `INSERT INTO machinery (category_id, machinery_name, is_motorized, sale_price, daily_rental_price, weight_kg, machinery_description)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [category_id, machinery_name, is_motorized, sale_price, daily_rental_price, weight_kg, machinery_description]
      );

      const newMachinery = machineryResult.rows[0];

      if (is_motorized) {
        const teams = stockData.teams || [];

        for (const team of teams) {
          await this.machineryStockRepository.create({
            machinery_id: newMachinery.machinery_id,
            status_id: 1,
            serial_number: team.serial || null,
            is_owned: team.is_owned !== undefined ? team.is_owned : true,
            stock_quantity: 1,
            next_revision_date: team.next_revision_date || null,
          }, client);
        }
      } else {
        const stockQuantity = stockData.stock_quantity || 0;

        await this.machineryStockRepository.create({
          machinery_id: newMachinery.machinery_id,
          status_id: 1,
          serial_number: null,
          is_owned: true,
          stock_quantity: stockQuantity,
          next_revision_date: null,
        }, client);
      }

      await client.query("COMMIT");

      return newMachinery;

    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

}