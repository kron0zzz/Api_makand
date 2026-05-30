export default class GetEmployeeById {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(id) {
    return await this.employeeRepository.findById(id);
  }
}