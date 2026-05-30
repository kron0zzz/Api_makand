export default class GetMachineryCategoryById {
  constructor(machineryCategoryRepository) {
    this.machineryCategoryRepository = machineryCategoryRepository;
  }

  async execute(id) {
    return await this.machineryCategoryRepository.findById(id);
  }
}