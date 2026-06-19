export default class GetRoles {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute() {
    return await this.roleRepository.findAll();
  }
}