import pool from "../../../config/database.js";

export default class CreateCompleteOrder {

  constructor(
    orderRepository,
    orderDetailRepository,
    machineryStockRepository
  ) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.machineryStockRepository = machineryStockRepository;
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

      for (const item of details) {

        const stock =
          await this.machineryStockRepository.findById(
            item.stock_id,
            client
          );

        if (!stock) {
          throw new Error(
            `Stock ${item.stock_id} no encontrado`
          );
        }

        if (
          stock.stock_quantity <
          item.quantity_to_dispatch
        ) {
          throw new Error(
            `Stock insuficiente para ${stock.machinery_name}`
          );
        }

        if (
          stock.status_id !== 1
        ) {
          throw new Error(
            `El stock de ${stock.machinery_name} no está disponible para alquiler`
          );
        }

      }

      const order =
        await this.orderRepository.create(
          finalOrderData,
          client
        );

      for (const item of details) {

        const stock =
          await this.machineryStockRepository.findById(
            item.stock_id,
            client
          );

         await this.orderDetailRepository.create(
            {
              order_id: order.order_id,

              stock_id: item.stock_id,

              machinery_name_snapshot:
                stock.machinery_name,

              quantity_to_dispatch:
                item.quantity_to_dispatch,

              rental_unit_price:
                item.rental_unit_price,

              subtotal_weight_kg:
                Number(stock.weight_kg || 0) *
                Number(item.quantity_to_dispatch)
            },
            client
          );



        const updatedStock =
        await this.machineryStockRepository.discountStock(
            item.stock_id,
            item.quantity_to_dispatch,
            client
        );

        if (
            updatedStock.stock_quantity == 0
        ) {
            await this.machineryStockRepository.setOccupied(
                item.stock_id,
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