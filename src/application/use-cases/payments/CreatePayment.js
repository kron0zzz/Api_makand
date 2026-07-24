export default class CreatePayment {

  constructor(
    paymentRepository,
    orderRepository,
    getOrderBalance
  ) {

    this.paymentRepository =
      paymentRepository;

    this.orderRepository =
      orderRepository;

    this.getOrderBalance =
      getOrderBalance;

  }

  async execute(
    paymentData
  ) {

    const {
      order_id,
      payment_amount
    } = paymentData;



    // =====================
    // Verificar pedido
    // =====================

    const order =
      await this.orderRepository
        .findById(order_id);

    if (!order) {

      throw new Error(
        "El pedido no existe"
      );

    }



    // =====================
    // Validar monto
    // =====================

    if (
      Number(payment_amount) <= 0
    ) {

      throw new Error(
        "El valor del pago debe ser mayor a cero"
      );

    }



    // =====================
    // Obtener saldo
    // =====================

    const balance =
      await this.getOrderBalance
        .execute(order_id);



    // =====================
    // Validar deuda pendiente
    // =====================

    if (
      balance.pending_balance <= 0
    ) {

      throw new Error(
        "Este pedido no tiene saldo pendiente"
      );

    }



    // =====================
    // Validar sobrepago
    // =====================

    if (
      Number(payment_amount) >
      balance.pending_balance
    ) {

      throw new Error(
        `El saldo pendiente es de ${balance.pending_balance}`
      );

    }



    // =====================
    // Crear pago
    // =====================

    const payment =
      await this.paymentRepository
        .create(paymentData);



    // =====================
    // Verificar pago completo
    // =====================

    const remainingBalance =
      balance.pending_balance -
      Number(payment_amount);

    if (remainingBalance <= 0) {

      await this.orderRepository
        .updateStatus(
          order_id,
          3
        );

    }



    return payment;

  }

}