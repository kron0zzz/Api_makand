export default class GetCustomersTable {

  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute() {
    return await this.customerRepository.findTableData();
  }

}