export default class GetMachineryCategoriesTable {
  constructor(machineryCategoryRepository) {
    this.machineryCategoryRepository = machineryCategoryRepository;
  }
  
  async execute(page, limit, search) {
    return await this.machineryCategoryRepository.findTableData(page, limit, search);
  }
}