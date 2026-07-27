export default class CreateMaintenance {

  constructor(
    maintenanceRepository,
    machineryRepository
  ) {

    this.maintenanceRepository =
      maintenanceRepository;

    this.machineryRepository =
      machineryRepository;

  }

  async execute(maintenanceData) {

    const maintenance =
      await this.maintenanceRepository
        .create(maintenanceData);

    const machinery =
      await this.machineryRepository
        .findById(
          maintenanceData.machinery_id
        );

    if (machinery && machinery.is_motorized) {

      await this.machineryRepository
        .setAvailable(
          maintenanceData.machinery_id
        );

    }

    return maintenance;

  }

}