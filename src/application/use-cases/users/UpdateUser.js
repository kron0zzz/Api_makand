import bcrypt from "bcrypt";

export default class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, userData) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("Usuario no encontrado");
    }

    let passwordToSave = existingUser.user_password;

    if (userData.user_password && userData.user_password.trim() !== "") {
      passwordToSave = await bcrypt.hash(userData.user_password, 10);
    }

    const dataToUpdate = {
      ...userData,
      user_password: passwordToSave
    };

    return await this.userRepository.update(id, dataToUpdate);
  }
}