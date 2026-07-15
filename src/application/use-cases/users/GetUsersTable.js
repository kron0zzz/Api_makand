export default class GetUsersTable {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(page, limit, search) {
    return await this.userRepository.findTableData(page, limit, search);
  }

}

