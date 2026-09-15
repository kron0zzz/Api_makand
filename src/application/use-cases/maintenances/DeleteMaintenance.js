import pool from "../../../config/database.js";
import MachineryStockRepository from "../../../infrastructure/repositories/machineryStockRepository.js";

export default class DeleteMaintenance {
  constructor(maintenanceRepository) {
    this.maintenanceRepository = maintenanceRepository;
    this.machineryStockRepository = new MachineryStockRepository();
  }

  async execute(id) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Get the maintenance to find the stock_id
      const maintenance = await this.maintenanceRepository.findById(id);
      if (!maintenance) {
        throw new Error("Mantenimiento no encontrado");
      }

      // Delete the maintenance
      const deletedMaintenance = await this.maintenanceRepository.delete(id);

      // Change the machinery stock status back to "en mantenimiento" (status_id=2)
      if (maintenance.stock_id) {
        await this.machineryStockRepository.setMaintenance(maintenance.stock_id, client);
      }

      await client.query("COMMIT");

      return deletedMaintenance;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}