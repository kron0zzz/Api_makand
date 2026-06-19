export default class CreateRole {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(roleData) {
    // roleData vendrá igual: { role_name: 'Supervisor', permissionIds: [1, 2] }
    return await this.roleRepository.create(roleData);
  }
}