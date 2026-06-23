export default class GetOrderBalance {

  constructor(
    orderRepository,
    rentalCutRepository,
    paymentRepository
  ) {

    this.orderRepository =
      orderRepository;

    this.rentalCutRepository =
      rentalCutRepository;

    this.paymentRepository =
      paymentRepository;

  }

  async execute(
    orderId
  ) {

    const order =
      await this.orderRepository
        .findById(orderId);

    if (!order) {

      throw new Error(
        "El pedido no existe"
      );

    }

    const totalCuts =
      await this.rentalCutRepository
        .getTotalCutAmount(
          orderId
        );

    const totalPaid =
      await this.paymentRepository
        .getTotalPaid(
          orderId
        );

    return {

      order_id:
        Number(orderId),

      total_cuts:
        totalCuts,

      total_paid:
        totalPaid,

      pending_balance:
        totalCuts - totalPaid

    };

  }

}