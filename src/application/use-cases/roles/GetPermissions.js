class GetPermissions {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute() {
    return await this.roleRepository.findAllPermissions();
  }
}

export default GetPermissions;