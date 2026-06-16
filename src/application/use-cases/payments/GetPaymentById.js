export default class GetPaymentById {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(id) {
    return await this.paymentRepository.findById(id);
  }
}