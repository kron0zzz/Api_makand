import bcrypt from "bcrypt";

export default class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const { employee_id, user_password, user_status, role_id } = userData;

    // 1. Validar que sí llegue el ID del empleado desde el frontend/Postman
    if (!employee_id) {
      throw new Error("El id del empleado es obligatorio para crear un usuario.");
    }

    // 2. Buscar el correo real del empleado en la Base de Datos usando tu repositorio
    const employeeEmail = await this.userRepository.findEmployeeEmail(employee_id);

    if (!employeeEmail) {
      throw new Error("No se encontró ningún empleado con el ID especificado.");
    }

    // 3. Hashear la contraseña que viene en los datos del usuario
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // 4. Construir el objeto final inyectando el correo recuperado y la clave encriptada
    const finalUserData = {
      user_email: employeeEmail, // 👈 Se asigna automáticamente el del empleado
      user_password: hashedPassword,
      user_status,
      role_id,
      employee_id
    };

    // 5. Guardar el usuario con la estructura limpia
    return await this.userRepository.create(finalUserData);
  }
}