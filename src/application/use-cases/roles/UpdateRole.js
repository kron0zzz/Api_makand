// export default class UpdateRole {
//   constructor(roleRepository) {
//     this.roleRepository = roleRepository;
//   }

//   async execute(id, roleData) {
//     return await this.roleRepository.update(id, roleData);
//   }
// }


export default class UpdateRole {
  constructor(roleRepository) { this.roleRepository = roleRepository; }
  async execute(id, roleData) {
    // Validar si se está desactivando el rol y hay usuarios asignados
    if (roleData.role_status === false) {
      const hasUsers = await this.roleRepository.hasUsersWithRole(id);
      if (hasUsers) {
        throw new Error('No se puede desactivar el rol porque hay usuarios asignados a este rol.');
      }
    }
    return await this.roleRepository.update(id, roleData);
  }
}