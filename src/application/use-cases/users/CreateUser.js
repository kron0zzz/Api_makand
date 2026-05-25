import bcrypt from "bcrypt";

export default class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    // Hashear contraseña
    const hashedPassword =
      await bcrypt.hash(
        userData.user_password,
        10
      );

    // Reemplazar contraseña normal por hash
    userData.user_password =
      hashedPassword;

    // Guardar usuario
    return await this.userRepository.create(
      userData
    );
  }
}