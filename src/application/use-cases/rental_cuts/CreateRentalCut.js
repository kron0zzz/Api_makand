export default class CreateRentalCut {

  constructor(
    rentalCutRepository,
    orderRepository,
    orderDetailRepository,
    returnRepository,
    additionalChargeRepository
  ) {

    this.rentalCutRepository = rentalCutRepository;
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.returnRepository = returnRepository;
    this.additionalChargeRepository = additionalChargeRepository;
  }

  async execute(data) {

    const {
      order_id,
      cut_notes,
      period_end_date
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
      new Date(period_end_date);


    if (
      periodEndDate <=
      new Date(periodStartDate)
    ) {

      throw new Error(
        "La fecha final debe ser mayor que la fecha inicial del corte"
      );

    }

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

      const returns =
        await this.returnRepository
          .findByOrderDetailId(
            detail.order_detail_id
          );

      let currentQuantity =
        detail.quantity_to_dispatch;

      let currentDate =
        new Date(
          periodStartDate
        );

      let detailTotal = 0;

      for (const item of returns) {

        const returnDate =
          new Date(
            item.return_date
          );

        if (
          returnDate <
          periodStartDate
        ) {

          currentQuantity -=
            item.returned_quantity;

          continue;

        }

        if (
          returnDate >
          periodEndDate
        ) {

          break;

        }

        const tramoDias =
          Math.round(
            (
              returnDate -
              currentDate
            ) /
            millisecondsPerDay
          );

        if (
          tramoDias > 0 &&
          currentQuantity > 0
        ) {

          detailTotal +=
            currentQuantity *
            Number(
              detail.rental_unit_price
            ) *
            tramoDias;

        }

        currentQuantity -=
          item.returned_quantity;

        currentDate =
          returnDate;

      }

      const remainingDays =
        Math.ceil(
          (
            periodEndDate -
            currentDate
          ) /
          millisecondsPerDay
        );

      if (
        remainingDays > 0 &&
        currentQuantity > 0
      ) {

        detailTotal +=
          currentQuantity *
          Number(
            detail.rental_unit_price
          ) *
          remainingDays;

      }

      totalCutAmount +=
        detailTotal;

    }

    // =========================================
    // Integración de Cobros Adicionales
    // =========================================
    const pendingCharges = await this.additionalChargeRepository.findPendingByOrderId(order_id);
    
    let extraChargesTotal = 0;
    for (const charge of pendingCharges) {
      extraChargesTotal += Number(charge.amount || 0);
    }
    
    totalCutAmount += extraChargesTotal;

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

    // =========================================
    // Marcar cobros adicionales como procesados
    // =========================================
    await this.additionalChargeRepository.markAsProcessedByOrderId(order_id);

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