import AdditionalChargeRepository from "../../../infrastructure/repositories/AdditionalChargeRepository.js";

export default class GetOrderFull {

  constructor(
    orderRepository,
    additionalChargeRepository
  ) {

    this.orderRepository = orderRepository;
    this.additionalChargeRepository = additionalChargeRepository;

  }

  async execute(id) {

    const order =
      await this.orderRepository
        .findFullById(id);

    if (!order) {
      return null;
    }

    const details =
      await this.orderRepository
        .findDetailsByOrderId(id);

    const additionalCharges =
      await this.additionalChargeRepository
        .findByOrderId(id);

    return {
      ...order,
      details,
      additional_charges: additionalCharges
    };

  }

}
