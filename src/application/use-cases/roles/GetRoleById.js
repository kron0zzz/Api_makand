export default class GetRoleById {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(id) {
    return await this.roleRepository.findById(id);
  }
}