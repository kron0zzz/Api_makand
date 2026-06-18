export default class GetOrderStatussTable {
  constructor(orderStatusRepository) {
    this.orderStatusRepository = orderStatusRepository;
  }

  async execute() {
    return await this.orderStatusRepository.findTableData();
  }
}