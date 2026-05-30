export default class GetEmployeesTable {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute() {
    return await this.employeeRepository.findTableData();
  }
}