export default class GetRolesTable {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(page, limit, search) {
    return await this.roleRepository.findTableData(page, limit, search);
  }
}