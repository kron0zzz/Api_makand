export default class DeleteCustomer {
   
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }

    async execute(id) {
        return await this.customerRepository.delete(id);
    }
}