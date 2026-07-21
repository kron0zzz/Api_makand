export default class GetEmployeesTable {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(page, limit, search) {
    return await this.employeeRepository.findTableData(page, limit, search);
  }
}