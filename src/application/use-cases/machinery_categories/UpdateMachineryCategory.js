export default class UpdateMachineryCategory {
  constructor(machineryCategoryRepository) {
    this.machineryCategoryRepository = machineryCategoryRepository;
  }

  async execute(id, categoryData) {
    return await this.machineryCategoryRepository.update(id, categoryData);
  }
}