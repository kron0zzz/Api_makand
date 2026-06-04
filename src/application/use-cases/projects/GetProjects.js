export default class GetProjects {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute() {
    return await this.projectRepository.findAll();
  }
}