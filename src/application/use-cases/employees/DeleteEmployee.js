export default class DeleteEmployee {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(id) {
    return await this.employeeRepository.delete(id);
  }
}