export default class GetOrdersTable {

  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    return await this.orderRepository.findTableData();
  }

}