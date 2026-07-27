export default class DeleteReturn {

  constructor(
    returnRepository,
    orderDetailRepository,
    machineryRepository,
    orderRepository,
    rentalCutRepository
  ) {

    this.returnRepository =
      returnRepository;

    this.orderDetailRepository =
      orderDetailRepository;

    this.machineryRepository =
      machineryRepository;

    this.orderRepository =
      orderRepository;

    this.rentalCutRepository =
      rentalCutRepository;

  }

  async execute(id) {

    const returnRecord =
      await this.returnRepository
        .findById(id);

    if (!returnRecord) {

      throw new Error(
        "La devolución no existe"
      );

    }

    const detail =
      await this.orderDetailRepository
        .findById(
          returnRecord.order_detail_id
        );

    const order =
      await this.orderRepository
        .findById(
          detail.order_id
        );

    if (
      order.order_status_id === 4 ||
      order.order_closing_date !== null
    ) {

      throw new Error(
        "No es posible eliminar devoluciones de un pedido cerrado"
      );

    }

    const hasCutAfter =
      await this.rentalCutRepository
        .existsCutAfterDate(
          order.order_id,
          returnRecord.return_date
        );

    if (hasCutAfter) {

      throw new Error(
        "No es posible eliminar esta devolución porque ya se registró un corte en ese periodo de tiempo"
      );

    }

    await this.returnRepository
      .delete(id);

    await this.machineryRepository
      .discountStock(
        detail.machinery_id,
        returnRecord.returned_quantity
      );

    const maquinaria =
      await this.machineryRepository
        .findById(
          detail.machinery_id
        );

    if (maquinaria.stock_quantity > 0) {

      if (maquinaria.is_motorized) {

        await this.machineryRepository
          .setMaintenance(
            detail.machinery_id
          );

      } else {

        await this.machineryRepository
          .setAvailable(
            detail.machinery_id
          );

      }

    } else {

      await this.machineryRepository
        .setOccupied(
          detail.machinery_id
        );

    }

    await this.orderDetailRepository
      .recalculateRentalStatus(
        returnRecord.order_detail_id
      );

    const hasPendingReturns =
      await this.orderDetailRepository
        .hasPendingReturns(
          detail.order_id
        );

    if (hasPendingReturns) {

      await this.orderRepository
        .updateStatus(
          detail.order_id,
          1
        );

    } else {

      await this.orderRepository
        .updateStatus(
          detail.order_id,
          2
        );

    }

    return returnRecord;

  }

}