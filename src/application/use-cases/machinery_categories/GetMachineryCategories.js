export default class GetMachineryCategories {
  constructor(machineryCategoryRepository) {
    this.machineryCategoryRepository = machineryCategoryRepository;
  }

  async execute() {
    return await this.machineryCategoryRepository.findAll();
  }
}