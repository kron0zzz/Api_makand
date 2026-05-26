export default class CreateEmployee {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(employeeData) {
    // Validaciones puras de datos obligatorios antes de mandar al repositorio
    if (!employeeData.employee_document_number) {
      throw new Error("El número de documento es obligatorio.");
    }
    if (!employeeData.employee_email || !employeeData.employee_email.includes('@')) {
      throw new Error("El formato del correo electrónico no es válido.");
    }

    return await this.employeeRepository.create(employeeData);
  }
}