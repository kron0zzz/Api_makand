// export default class UpdateEmployee {
//   constructor(employeeRepository) {
//     this.employeeRepository = employeeRepository;
//   }

//   async execute(id, employeeData) {
//     if (!id) {
//       throw new Error("Se requiere el ID del empleado para actualizar.");
//     }
//     return await this.employeeRepository.update(id, employeeData);
//   }
// }


export default class UpdateEmployee {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(id, employeeData) {
    if (!id) {
      throw new Error("Se requiere el ID del empleado para actualizar.");
    }
    return await this.employeeRepository.update(id, employeeData);
  }
}