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

    const permissions = await this.userRepository.findPermissionsByRoleId(user.role_id);
    console.log("DEBUG: Permisos obtenidos para el usuario", user.user_id, ":", permissions);

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role_id: user.role_id,
        permissions: permissions 
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return {
      token,
      user: {
        user_id: user.user_id,
        user_email: user.user_email,
        role_id: user.role_id,
        permissions: permissions 
      }
    };
  }
}