export default class UpdateCustomer {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(id, customerData) {
    return await this.customerRepository.update(
      id,
      customerData
    );
  }
}