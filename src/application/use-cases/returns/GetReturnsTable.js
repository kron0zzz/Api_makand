export default class GetReturnsTable {

  constructor(returnRepository) {
    this.returnRepository = returnRepository;
  }

  async execute() {
    return await this.returnRepository.findTableData();
  }

}