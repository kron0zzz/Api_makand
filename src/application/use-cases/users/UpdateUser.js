// export default class UpdateUser {
//   constructor(userRepository) {
//     this.userRepository = userRepository;
//   }

//   async execute(id, userData) {
//     return await this.userRepository.update(
//       id,
//       userData
//     );
//   }
// }

export default class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, userData) {
    // Buscamos el usuario actual en la base de datos
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("Usuario no encontrado");
    }

    // Si no se envía una contraseña nueva, mantenemos la que ya tenía guardada
    const passwordToSave = (userData.user_password && userData.user_password.trim() !== "")
      ? userData.user_password 
      : existingUser.user_password;

    const dataToUpdate = {
      ...userData,
      user_password: passwordToSave
    };

    return await this.userRepository.update(id, dataToUpdate);
  }
}