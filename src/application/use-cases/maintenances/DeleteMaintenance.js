export default class DeleteMaintenance {
  constructor(maintenanceRepository) {
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute(id) {
    return await this.maintenanceRepository.delete(id);
  }
}