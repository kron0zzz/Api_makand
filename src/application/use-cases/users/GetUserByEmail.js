export default class GetUserByEmail {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    return await this.userRepository.findById(id);
  }
}