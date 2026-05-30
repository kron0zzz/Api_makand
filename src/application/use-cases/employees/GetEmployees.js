export default class GetEmployees {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute() {
    return await this.employeeRepository.findAll();
  }
}