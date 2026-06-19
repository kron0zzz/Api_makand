import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.user_password);

    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    // 1. Buscar los permisos asociados al rol del usuario
    const permissions = await this.userRepository.findPermissionsByRoleId(user.role_id);

    // 2. Inyectar los permisos en el Payload del Token JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role_id: user.role_id,
        permissions: permissions // 👈 Útil para los middlewares de protección en el backend
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h"
      }
    );

    // 3. Devolver la respuesta con los permisos para el Frontend
    return {
      token,
      user: {
        user_id: user.user_id,
        user_email: user.user_email,
        role_id: user.role_id,
        permissions: permissions // 👈 El front usará esto para ocultar/mostrar botones del menú
      }
    };

  }
  
}