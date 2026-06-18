export default class CreateMaintenance {
  constructor(maintenanceRepository) {
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute(maintenanceData) {
    return await this.maintenanceRepository.create(maintenanceData);
  }
}