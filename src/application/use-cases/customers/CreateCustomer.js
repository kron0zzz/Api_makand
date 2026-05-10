export default class CreateCustomer {
    constructor(customerRepository) {
      this.customerRepository = customerRepository;
    }
  
    async execute(customerData) {
      return await this.customerRepository.create(customerData);
    }
}