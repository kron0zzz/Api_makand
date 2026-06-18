export default class DeletePayment {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(id) {
    return await this.paymentRepository.delete(id);
  }
}