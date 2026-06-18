export default class CreateReturn {

  constructor(
    returnRepository,
    orderDetailRepository,
    machineryRepository
  ) {

    this.returnRepository =
      returnRepository;

    this.orderDetailRepository =
      orderDetailRepository;

    this.machineryRepository =
      machineryRepository;

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

    await this.machineryRepository
      .increaseStock(
        detail.machinery_id,
        returned_quantity
      );

    const maquinaria =
    await this.machineryRepository
      .findById(
        detail.machinery_id
      );

    if (maquinaria.stock_quantity > 0){

      if (maquinaria.is_motorized){
        await this.machineryRepository
        .setMaintenance(
          detail.machinery_id
        );
      }else{
        await this.machineryRepository
        .setAvailable(
          detail.machinery_id
        );
      }

      

    }

    return nuevaDevolucion;

  }

}