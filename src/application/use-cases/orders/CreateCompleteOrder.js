import pool from "../../../config/database.js";

export default class CreateCompleteOrder {

  constructor(
    orderRepository,
    orderDetailRepository,
    machineryStockRepository,
    additionalChargeRepository 
  ) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.machineryStockRepository = machineryStockRepository;
    this.additionalChargeRepository = additionalChargeRepository; 
  }

  async execute(data, user) {

    const client = await pool.connect();

    try {

      await client.query("BEGIN");

      const {
        details,
        additional_charges, 
        ...orderData
      } = data;

      const finalOrderData = {
        ...orderData,
        user_id: user.user_id,
        order_status_id: 1,
        cut_frequency: orderData.cut_frequency || null
      };

      // Validaciones de stock de maquinaria
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

      // Creamos la orden principal
      const order =
        await this.orderRepository.create(
          finalOrderData,
          client
        );

      // Creamos los detalles de maquinaria
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
                Number(item.quantity_to_dispatch),
              machinery_rental_status: 
                item.machinery_rental_status ?? true
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
            Number(updatedStock.stock_quantity) === 0
        ) {
            await this.machineryStockRepository.setOccupied(
                item.stock_id,
                client
            );
        }

      }

      // Guardar automáticamente los cobros adicionales dentro de la transacción
      if (additional_charges && Array.isArray(additional_charges)) {
        for (const charge of additional_charges) {
          await this.additionalChargeRepository.create(
            {
              order_id: order.order_id,
              charge_type_id: charge.charge_type_id,
              charge_description: charge.charge_description || 'Cobro adicional',
              charge_amount: charge.charge_amount
            },
            client
          );
        }
      }

      // Consultar y calcular los cobros para incluirlos en el resultado
      const charges = await this.additionalChargeRepository.findPendingByOrderId(order.order_id);
      const totalAdditionalCharges = charges.reduce((acc, charge) => acc + Number(charge.amount || 0), 0);
      
      order.additional_charges = charges;
      order.total_additional_charges = totalAdditionalCharges;

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