export default class CreatePositon {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(customerData) {
    return await this.customerRepository.create(customerData);
  }
}