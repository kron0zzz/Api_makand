export default class CreateMaintenance {

  constructor(
    maintenanceRepository,
    machineryStockRepository
  ) {

    this.maintenanceRepository =
      maintenanceRepository;

    this.machineryStockRepository =
      machineryStockRepository;

  }

  async execute(maintenanceData) {

    const maintenance =
      await this.maintenanceRepository
        .create(maintenanceData);

    const stock =
      await this.machineryStockRepository
        .findById(
          maintenanceData.stock_id
        );

    if (stock && stock.is_motorized) {

      await this.machineryStockRepository
        .setAvailable(
          maintenanceData.stock_id
        );

    }

    return maintenance;

  }

}