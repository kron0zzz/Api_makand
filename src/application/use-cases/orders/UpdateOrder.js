import pool from "../../../config/database.js";

import RentalCutRepository from "../../../infrastructure/repositories/RentalCutRepository.js";
import AdditionalChargeRepository from "../../../infrastructure/repositories/AdditionalChargeRepository.js";

export default class UpdateOrder {

  constructor(
    orderRepository,
    rentalCutRepository,
    additionalChargeRepository
  ) {

    this.orderRepository = orderRepository;
    this.rentalCutRepository = rentalCutRepository;
    this.additionalChargeRepository = additionalChargeRepository;

  }

  async execute(id, orderData) {

    const currentOrder =
      await this.orderRepository.findById(id);

    if (!currentOrder) {
      throw new Error("Pedido no encontrado.");
    }

    const hasCuts =
      await this.rentalCutRepository.existsByOrder(id);

    if (hasCuts) {

      const currentDateStr = currentOrder.order_creation_date
        ? new Date(currentOrder.order_creation_date).toISOString().split("T")[0]
        : "";

      if (
        orderData.order_creation_date &&
        orderData.order_creation_date !== currentDateStr
      ) {
        throw new Error(
          "No es posible modificar la fecha de creación del pedido porque hay cortes registrados."
        );
      }

      if (orderData.include_delivery_transport !== undefined) {
        const currentTransport =
          await this.additionalChargeRepository.findTransportByOrderId(id);

        const hasTransport = !!currentTransport;

        if (orderData.include_delivery_transport !== hasTransport) {
          throw new Error(
            "No es posible modificar el servicio de transporte porque hay cortes registrados."
          );
        }
      }

    }

    const updatedOrder =
      await this.orderRepository.update(
        id,
        orderData
      );

    if (
      !hasCuts &&
      orderData.include_delivery_transport !== undefined
    ) {
      const existingTransport =
        await this.additionalChargeRepository.findTransportByOrderId(id);

      if (orderData.include_delivery_transport && !existingTransport) {
        await this.additionalChargeRepository.create({
          charge_type_id: 1,
          order_id: id,
          charge_description: "Transporte de entrega",
          charge_amount: orderData.delivery_transport_price || 0
        });
      } else if (!orderData.include_delivery_transport && existingTransport) {
        await this.additionalChargeRepository.delete(
          existingTransport.additional_charge_id
        );
      } else if (orderData.include_delivery_transport && existingTransport) {
        await this.additionalChargeRepository.updateTransportAmount(
          existingTransport.additional_charge_id,
          orderData.delivery_transport_price || 0
        );
      }
    }

    return updatedOrder;

  }

}
