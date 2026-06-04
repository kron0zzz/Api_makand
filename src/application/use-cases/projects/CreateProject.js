export default class CreateProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(projectData) {
    return await this.projectRepository.create(projectData);
  }
}