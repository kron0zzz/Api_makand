export default class GetPositions {
  constructor(positonRepository) {
    this.positonRepository = positonRepository;
  }

  async execute() {
    return await this.positonRepository.findAll();
  }
}