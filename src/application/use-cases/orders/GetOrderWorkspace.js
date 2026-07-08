export default class GetOrderWorkspace {

  constructor(
    orderRepository
  ) {

    this.orderRepository =
      orderRepository;

  }

  async execute(orderId) {

    // Verificar que el pedido exista
    const order =
      await this.orderRepository
        .findFullById(orderId);

    if (!order) {

      throw new Error(
        "Pedido no encontrado"
      );

    }

    // Obtener details + devoluciones
    const details =
      await this.orderRepository
        .findWorkspaceData(orderId);

    // Agregar los details al pedido
    order.details = details;

    return order;

  }

}