import pool from "../../../config/database.js";

export default class CancelOrder {

  constructor(
    orderRepository,
    orderDetailRepository,
    machineryStockRepository,
    paymentRepository,
    rentalCutRepository,
    returnRepository
  ) {

    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.machineryStockRepository = machineryStockRepository;
    this.paymentRepository = paymentRepository;
    this.rentalCutRepository = rentalCutRepository;
    this.returnRepository = returnRepository;

  }

  async execute(orderId) {

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Pedido no encontrado.");
    }

    if (Number(order.order_status_id) === 4) {
      throw new Error("No puede anularse un pedido cerrado.");
    }

    if (Number(order.order_status_id) === 5) {
      throw new Error("El pedido ya está anulado.");
    }

    const hasReturns = await this.returnRepository.existsByOrder(orderId);

    if (hasReturns) {
      throw new Error("El pedido registra devoluciones.");
    }

    const hasCuts = await this.rentalCutRepository.existsByOrder(orderId);

    if (hasCuts) {
      throw new Error("El pedido registra cortes.");
    }

    const hasPayments = await this.paymentRepository.existsByOrder(orderId);

    if (hasPayments) {
      throw new Error("El pedido registra pagos.");
    }

    const client = await pool.connect();

    try {

      await client.query("BEGIN");

      const details = await this.orderDetailRepository.findByOrder(
        orderId,
        client
      );

      for (const detail of details) {
        await this.machineryStockRepository.increaseStock(
          detail.stock_id,
          detail.quantity_to_dispatch,
          client
        );
        await this.machineryStockRepository.setAvailable(
          detail.stock_id,
          client
        );
      }

      const updatedOrder = await this.orderRepository.updateStatus(
        orderId,
        5,
        client
      );

      await client.query("COMMIT");

      return updatedOrder;

    } catch (error) {

      await client.query("ROLLBACK");

      throw error;

    } finally {

      client.release();

    }

  }

}
