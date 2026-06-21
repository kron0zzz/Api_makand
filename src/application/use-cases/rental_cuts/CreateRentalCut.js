export default class CreateRentalCut {

  constructor(
    rentalCutRepository,
    orderRepository,
    orderDetailRepository,
    returnRepository
  ) {

    this.rentalCutRepository =
      rentalCutRepository;

    this.orderRepository =
      orderRepository;

    this.orderDetailRepository =
      orderDetailRepository;

    this.returnRepository =
      returnRepository;

  }

  async execute(data) {

    const {
      order_id,
      cut_notes
    } = data;



    // =====================
    // Buscar pedido
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
    // Definir periodo
    // =====================

    const periodStartDate =
      order.last_cut_date ||
      order.order_creation_date;

    const periodEndDate =
      new Date();



    // =====================
    // Calcular días
    // =====================

    const millisecondsPerDay =
      1000 * 60 * 60 * 24;

    const days =
      Math.ceil(
        (
          new Date(periodEndDate) -
          new Date(periodStartDate)
        ) /
        millisecondsPerDay
      );

    if (days <= 0) {

      throw new Error(
        "No existen días pendientes para generar corte"
      );

    }



    // =====================
    // Obtener detalles
    // =====================

    const details =
      await this.orderDetailRepository
        .findByOrderId(
          order_id
        );



    let totalCutAmount = 0;



    // =====================
    // Calcular valor
    // =====================

    for (const detail of details) {

      const returnedQuantity =
        await this.returnRepository
          .getReturnedQuantity(
            detail.order_detail_id
          );

      const activeQuantity =
        detail.quantity_to_dispatch -
        returnedQuantity;

      if (
        activeQuantity <= 0
      ) {
        continue;
      }

      const subtotal =
        activeQuantity *
        Number(
          detail.rental_unit_price
        ) *
        days;

      totalCutAmount +=
        subtotal;

    }



    // =====================
    // Crear corte
    // =====================

    const rentalCut =
      await this.rentalCutRepository
        .create({

          order_id,

          period_start_date:
            periodStartDate,

          period_end_date:
            periodEndDate,

          cut_amount:
            totalCutAmount,

          cut_notes

        });



    // =====================
    // Actualizar último corte
    // =====================

    await this.orderRepository
      .updateLastCutDate(
        order_id,
        periodEndDate
      );



    return rentalCut;

  }

}