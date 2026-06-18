export default class GetMaintenances {
  constructor(maintenanceRepository) {
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute() {
    return await this.maintenanceRepository.findAll();
  }
}