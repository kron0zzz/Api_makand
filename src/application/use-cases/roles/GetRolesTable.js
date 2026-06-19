export default class GetRolesTable {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute() {
    return await this.roleRepository.findTableData();
  }
}