export default class GetOrdersTable {

  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(page, limit, search) {
    return await this.orderRepository.findTableData(page, limit, search);
  }

}