export default class GetProjectsTable {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(page, limit, search) {
    return await this.projectRepository.findTableData(page, limit, search);
  }
}