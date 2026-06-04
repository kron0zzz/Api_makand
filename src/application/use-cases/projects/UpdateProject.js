export default class UpdateProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id, projectData) {
    return await this.projectRepository.update(id, projectData);
  }
}