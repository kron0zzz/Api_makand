export default class GetCustomerById {
    constructor(customerRepository) {
      this.customerRepository = customerRepository;
    }
  
    async execute(id) {
      return await this.customerRepository.findById(id);
    }
}