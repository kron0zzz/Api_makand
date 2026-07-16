class GetRolePermissions {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(roleId) {
    return await this.roleRepository.findPermissionsByRoleId(roleId);
  }
}

export default GetRolePermissions;