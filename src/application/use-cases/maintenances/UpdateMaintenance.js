export default class UpdateMaintenance {
  constructor(maintenanceRepository) {
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute(id, maintenanceData) {
    return await this.maintenanceRepository.update(id, maintenanceData);
  }
}