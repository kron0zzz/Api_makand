export default class GetPositionById {
  constructor(positonRepository) {
    this.positonRepository = positonRepository;
  }

  async execute(id) {
    return await this.positonRepository.findById(id);
  }
}