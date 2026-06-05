export default class GetOrders {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    return await this.orderRepository.findAll();
  }
}