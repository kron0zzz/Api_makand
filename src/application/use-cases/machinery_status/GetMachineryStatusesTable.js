export default class GetMachineryStatusesTable {
  constructor(machineryStatusRepository) {
    this.machineryStatusRepository = machineryStatusRepository;
  }

  async execute() {
    return await this.machineryStatusRepository.findTableData();
  }
}