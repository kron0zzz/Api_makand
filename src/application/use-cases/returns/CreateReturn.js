export default class CreateReturn {

  constructor(
    returnRepository,
    orderDetailRepository,
    machineryStockRepository,
    orderRepository
  ) {

    this.returnRepository =
      returnRepository;

    this.orderDetailRepository =
      orderDetailRepository;

    this.machineryStockRepository =
      machineryStockRepository;

    this.orderRepository =
      orderRepository;

  }

  async execute(
    returnData
  ) {

    const {
      order_detail_id,
      returned_quantity
    } = returnData;

    const detail =
      await this.orderDetailRepository
        .findById(
          order_detail_id
        );

    if (!detail) {

      throw new Error(
        "El detalle del pedido no existe"
      );

    }

    const totalReturned =
      await this.returnRepository
        .getReturnedQuantity(
          order_detail_id
        );

    const remaining =
      detail.quantity_to_dispatch -
      totalReturned;

    if (returned_quantity > remaining) {

      throw new Error(
        `Solo quedan ${remaining} unidades por devolver`
      );

    }

    if (returned_quantity <= 0) {

      throw new Error(
        "La cantidad devuelta debe ser mayor a 0"
      );

    }

    const nuevaDevolucion =
      await this.returnRepository
        .create(returnData);

    await this.machineryStockRepository
      .increaseStock(
        detail.stock_id,
        returned_quantity
      );

    const stock =
    await this.machineryStockRepository
      .findById(
        detail.stock_id
      );

    if (stock.stock_quantity > 0){

      if (stock.is_motorized){
        await this.machineryStockRepository
        .setMaintenance(
          detail.stock_id
        );
      }else{
        await this.machineryStockRepository
        .setAvailable(
          detail.stock_id
        );
      }



    }

    if (remaining - returned_quantity == 0){
      await this.orderDetailRepository
      .setReturned(
        order_detail_id
      );

    }

    const hasPendingReturns =
      await this.orderDetailRepository
        .hasPendingReturns(
          detail.order_id
        );

    if (!hasPendingReturns) {

      await this.orderRepository
        .updateStatus(
          detail.order_id,
          2
        );

    }

    return nuevaDevolucion;

  }

}