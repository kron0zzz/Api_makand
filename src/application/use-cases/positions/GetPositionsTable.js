export default class GetPositionsTable {

  constructor(positonRepository) {
    this.positonRepository = positonRepository;
  }

  async execute() {
    return await this.positonRepository.findTableData();
  }

}