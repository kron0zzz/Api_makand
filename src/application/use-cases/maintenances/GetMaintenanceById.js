export default class GetMaintenanceById {
  constructor(maintenanceRepository) {
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute(id) {
    return await this.maintenanceRepository.findById(id);
  }
}