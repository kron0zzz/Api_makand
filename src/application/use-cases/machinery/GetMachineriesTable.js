export default class GetMachineriesTable {
  constructor(machineryRepository) {
    this.machineryRepository = machineryRepository;
  }

  async execute() {
    return await this.machineryRepository.findTableData();
  }
}