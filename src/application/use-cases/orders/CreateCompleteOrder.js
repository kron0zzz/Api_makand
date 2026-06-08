import pool from "../../../config/database.js";

export default class CreateCompleteOrder {

  constructor(
    orderRepository,
    orderDetailRepository,
    machineryRepository
  ) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.machineryRepository = machineryRepository;
  }

  async execute(data) {

    const client = await pool.connect();

    try {

      await client.query("BEGIN");

      const {
        details,
        ...orderData
      } = data;

      // Validar stock

      for (const item of details) {

        const machinery =
          await this.machineryRepository.findById(
            item.machinery_id,
            client
          );

        if (!machinery) {
          throw new Error(
            `Maquinaria ${item.machinery_id} no encontrada`
          );
        }

        if (
          machinery.stock_quantity <
          item.quantity_to_dispatch
        ) {
          throw new Error(
            `Stock insuficiente para ${machinery.machinery_name}`
          );
        }

      }

      // Crear pedido

      const order =
        await this.orderRepository.create(
          orderData,
          client
        );

      // Crear detalles y descontar stock

      for (const item of details) {

        await this.orderDetailRepository.create(
          {
            order_id: order.order_id,
            machinery_id: item.machinery_id,
            machinery_name_snapshot:
              item.machinery_name_snapshot,
            quantity_to_dispatch:
              item.quantity_to_dispatch,
            rental_unit_price:
              item.rental_unit_price,
            subtotal_weight_kg:
              item.subtotal_weight_kg
          },
          client
        );



        const updatedMachinery =
        await this.machineryRepository.discountStock(
            item.machinery_id,
            item.quantity_to_dispatch,
            client
        );

        if (
            updatedMachinery.stock_quantity == 0
        ) {
            await this.machineryRepository.setOccupied(
                item.machinery_id,
                client
            );
        }

      }

      await client.query("COMMIT");

      return order;

    } catch (error) {

      await client.query("ROLLBACK");

      throw error;

    } finally {

      client.release();

    }

  }

}