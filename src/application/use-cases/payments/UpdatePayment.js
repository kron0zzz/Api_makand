export default class UpdatePayment {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(id, paymentData) {
    return await this.paymentRepository.update(
      id,
      paymentData
    );
  }
}