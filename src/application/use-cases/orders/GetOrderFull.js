export default class GetOrderFull {

  constructor(orderRepository) {
    this.orderRepository =
      orderRepository;
  }

  async execute(id) {

    const order =
      await this.orderRepository
        .findFullById(id);

    if (!order) {
      return null;
    }

    const details =
      await this.orderRepository
        .findDetailsByOrderId(id);

    return {
      ...order,
      details
    };
  }

}