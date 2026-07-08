export default class GetPaymentsByOrderId {

  constructor(paymentRepository, rentalCutRepository) {
    this.paymentRepository = paymentRepository;
    this.rentalCutRepository = rentalCutRepository;
  }

  async execute(orderId) {

    const payments =
      await this.paymentRepository.findPaymentsByOrderId(orderId);

    const totalBilled =
      await this.rentalCutRepository.getTotalBilled(orderId);

    return {
      payments,
      total_billed: totalBilled
    };

  }

}