export default class GetCustomersTable {

  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(page, limit, search) {
    return await this.customerRepository.findTableData(page, limit, search);
  }

}