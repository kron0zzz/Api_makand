export default class GetPositions {
  constructor(positonRepository) {
    this.positonRepository = positonRepository;
  }

  async execute(page, limit, search) {
    return await this.positonRepository.findAll(page, limit, search);
  }
}