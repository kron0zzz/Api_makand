export default class GetPositionsTable {
  constructor(positonRepository) {
    this.positonRepository = positonRepository;
  }

  async execute(page, limit, search) {
    return await this.positonRepository.findTableData(page, limit, search);
  }
}