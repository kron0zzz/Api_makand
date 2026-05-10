export default class GetCustomers {
    constructor(customerRepository) {
      this.customerRepository = customerRepository;
    }
  
    async execute() {
      return await this.customerRepository.findAll();
    }
}