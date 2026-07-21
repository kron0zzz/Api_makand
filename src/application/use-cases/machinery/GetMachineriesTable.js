export default class GetMachineriesTable {
  constructor(machineryRepository) {
    this.machineryRepository = machineryRepository;
  }

  async execute(page, limit, search) {
    return await this.machineryRepository.findTableData(page, limit, search);
  }
}