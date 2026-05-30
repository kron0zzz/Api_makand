export default class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, userData) {
    return await this.userRepository.update(
      id,
      userData
    );
  }
}