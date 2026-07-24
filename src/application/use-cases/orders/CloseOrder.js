import pool from "../../../config/database.js";

import GetOrderBalance from "./GetOrderBalance.js";

export default class CloseOrder {

  constructor(
    orderRepository,
    orderDetailRepository,
    rentalCutRepository,
    paymentRepository,
    returnRepository
  ) {

    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.rentalCutRepository = rentalCutRepository;
    this.paymentRepository = paymentRepository;
    this.returnRepository = returnRepository;

    this.getOrderBalanceUseCase =
      new GetOrderBalance(
        orderRepository,
        rentalCutRepository,
        paymentRepository
      );

  }

  async execute(orderId) {

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Pedido no encontrado.");
    }

    if (Number(order.order_status_id) === 5) {
      throw new Error("El pedido fue cancelado y no puede cerrarse.");
    }

    const hasPendingReturns =
      await this.orderDetailRepository.hasPendingReturns(
        orderId
      );

    if (hasPendingReturns) {
      throw new Error(
        "No es posible cerrar el pedido porque existen equipos pendientes por devolver."
      );
    }

    const balance =
      await this.getOrderBalanceUseCase.execute(
        orderId
      );

    if (balance.pending_balance > 0) {
      throw new Error(
        "No es posible cerrar el pedido porque existe un saldo pendiente."
      );
    }

    const lastReturnDate =
      await this.returnRepository.getLastReturnDate(
        orderId
      );

    if (lastReturnDate) {

      if (!order.last_cut_date) {
        throw new Error(
          "No es posible cerrar el pedido porque aún no se ha generado un corte de alquiler posterior a las devoluciones."
        );
      }

      if (new Date(lastReturnDate) > new Date(order.last_cut_date)) {
        throw new Error(
          "No es posible cerrar el pedido porque existen devoluciones posteriores al último corte de alquiler."
        );
      }

    }

    const client = await pool.connect();

    try {

      await client.query("BEGIN");

      const updatedOrder =
        await this.orderRepository.closeOrder(
          orderId,
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
