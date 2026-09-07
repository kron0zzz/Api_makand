import CutScheduleService, { CUT_FREQUENCY } from "../../../infrastructure/services/CutScheduleService.js";

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

    const order =
      await this.orderRepository
        .findById(order_id);

    if (!order) {

      throw new Error(
        "El pedido no existe"
      );

    }

    if (order.cut_frequency) {
      this.validateCutDate(order, period_end_date);
    }

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

    const details =
      await this.orderDetailRepository
        .findByOrderId(
          order_id
        );

    let totalCutAmount = 0;

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

    console.log("-----------------------------------------");
    console.log("Generando corte para el pedido ID:", order_id);

    const pendingCharges = await this.additionalChargeRepository.findPendingByOrderId(order_id);
    
    console.log("Cargos pendientes encontrados por el repositorio:", pendingCharges);

    let extraChargesTotal = 0;
    for (const charge of pendingCharges) {
      const chargeAmountValue = charge.amount !== undefined ? charge.amount : charge.charge_amount;
      console.log(`Sumando cargo ID ${charge.id || charge.additional_charge_id} por un valor de:`, chargeAmountValue);
      extraChargesTotal += Number(chargeAmountValue || 0);
    }
    
    console.log("Total extra a sumar en este corte:", extraChargesTotal);
    totalCutAmount += extraChargesTotal;
    console.log("Total final del corte (Alquiler + Extras):", totalCutAmount);
    console.log("-----------------------------------------");

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

    await this.additionalChargeRepository.markAsProcessedByOrderId(order_id);

    await this.orderRepository
      .updateLastCutDate(
        order_id,
        periodEndDate
      );

    return rentalCut;

  }

  validateCutDate(order, periodEndDate) {
    const cutDate = CutScheduleService.parseLocalDate(periodEndDate);

    const startDate = CutScheduleService.parseLocalDate(order.order_creation_date);

    if (cutDate < startDate) {
      throw new Error(
        "La fecha del corte no puede ser anterior a la fecha de inicio del pedido"
      );
    }

    if (!CutScheduleService.isValidCutDate(cutDate, order.cut_frequency)) {
      const frequencyLabel = order.cut_frequency === CUT_FREQUENCY.QUINCENAL
        ? "día 15 o último día del mes"
        : "último día del mes";
      throw new Error(
        `La fecha del corte no es válida para la frecuencia ${order.cut_frequency}. Debe corresponder al ${frequencyLabel}`
      );
    }
  }

}