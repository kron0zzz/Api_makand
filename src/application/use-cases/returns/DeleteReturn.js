export default class DeleteReturn {

  constructor(
    returnRepository,
    orderDetailRepository,
    machineryStockRepository,
    orderRepository,
    rentalCutRepository
  ) {

    this.returnRepository =
      returnRepository;

    this.orderDetailRepository =
      orderDetailRepository;

    this.machineryStockRepository =
      machineryStockRepository;

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

    await this.machineryStockRepository
      .discountStock(
        detail.stock_id,
        returnRecord.returned_quantity
      );

    const stock =
      await this.machineryStockRepository
        .findById(
          detail.stock_id
        );

    if (stock.stock_quantity > 0) {

      if (stock.is_motorized) {

        await this.machineryStockRepository
          .setMaintenance(
            detail.stock_id
          );

      } else {

        await this.machineryStockRepository
          .setAvailable(
            detail.stock_id
          );

      }

    } else {

      await this.machineryStockRepository
        .setOccupied(
          detail.stock_id
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