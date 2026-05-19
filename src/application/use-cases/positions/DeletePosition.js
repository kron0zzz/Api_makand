export default class DeletePositon {
  constructor(positonRepository) {
    this.positonRepository = positonRepository;
  }

  async execute(id) {
    return await this.positonRepository.delete(id);
  }
}