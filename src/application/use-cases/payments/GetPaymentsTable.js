export default class GetPaymentsTable {

  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute() {
    return await this.paymentRepository.findTableData();
  }

}