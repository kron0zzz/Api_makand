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

  async execute(data, user) {

    const client = await pool.connect();

    try {

      await client.query("BEGIN");

      const {
        details,
        ...orderData
      } = data;

      const finalOrderData = {
        ...orderData,

        user_id: user.user_id,

        order_status_id: 1
      };

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

        if (
          machinery.status_id !== 1
        ) {
          throw new Error(
            `La maquinaria ${machinery.machinery_name} no está disponible para alquiler`
          );
        }

      }

      // Crear pedido

      const order =
        await this.orderRepository.create(
          finalOrderData,
          client
        );

      // Crear detalles y descontar stock

      for (const item of details) {


        const machinery =
          await this.machineryRepository.findById(
            item.machinery_id,
            client
          );

         await this.orderDetailRepository.create(
            {
              order_id: order.order_id,

              machinery_id: item.machinery_id,

              machinery_name_snapshot:
                machinery.machinery_name,

              quantity_to_dispatch:
                item.quantity_to_dispatch,

              rental_unit_price:
                item.rental_unit_price,

              subtotal_weight_kg:
                Number(machinery.weight_kg) *
                Number(item.quantity_to_dispatch)
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