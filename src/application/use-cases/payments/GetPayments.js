export default class GetPayments {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute() {
    return await this.paymentRepository.findAll();
  }
}