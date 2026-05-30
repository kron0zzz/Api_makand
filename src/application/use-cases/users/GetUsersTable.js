export default class GetUsersTable {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    return await this.userRepository.findTableData();
  }

}