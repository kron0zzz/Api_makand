export default class CreateMachineryCategory {
  constructor(machineryCategoryRepository) {
    this.machineryCategoryRepository = machineryCategoryRepository;
  }

  async execute(categoryData) {
    return await this.machineryCategoryRepository.create(categoryData);
  }
}