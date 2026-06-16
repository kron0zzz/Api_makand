export default class DeleteReturn {
  constructor(returnRepository) {
    this.returnRepository = returnRepository;
  }

  async execute(id) {
    return await this.returnRepository.delete(id);
  }
}