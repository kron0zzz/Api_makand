export default class UpdatePosition {
  constructor(positonRepository) {
    this.positonRepository = positonRepository;
  }

  async execute(id, positonData) {
    return await this.positonRepository.update(
      id,
      positonData
    );
  }
}