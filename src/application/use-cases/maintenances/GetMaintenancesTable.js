export default class GetMaintenancesTable {
  constructor(maintenanceRepository) {
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute() {
    return await this.maintenanceRepository.findTableData();
  }
}