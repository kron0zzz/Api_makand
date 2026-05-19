export default class GetMachineryCategoriesTable {
  constructor(machineryCategoryRepository) {
    this.machineryCategoryRepository = machineryCategoryRepository;
  }
  
  async execute() {
    return await this.machineryCategoryRepository.findTableData();
  }
}