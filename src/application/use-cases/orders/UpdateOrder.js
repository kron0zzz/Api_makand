export default class UpdateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id, orderData) {
    return await this.orderRepository.update(
      id,
      orderData
    );
  }
}