export default class CreateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderData) {
    return await this.orderRepository.create(orderData);
  }
}