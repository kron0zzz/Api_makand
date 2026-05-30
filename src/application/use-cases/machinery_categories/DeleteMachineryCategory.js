export default class DeleteMachineryCategory {
  constructor(machineryCategoryRepository) {
    this.machineryCategoryRepository = machineryCategoryRepository;
  }

  async execute(id) {
    return await this.machineryCategoryRepository.delete(id);
  }
}