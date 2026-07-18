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
    return await this.roleRepository.update(id, roleData);
  }
}