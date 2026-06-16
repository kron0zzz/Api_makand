export default class CreatePayment {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(paymentData) {
    return await this.paymentRepository.create(paymentData);
  }
}