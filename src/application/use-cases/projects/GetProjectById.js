export default class GetProjectById {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id) {
    return await this.projectRepository.findById(id);
  }
}