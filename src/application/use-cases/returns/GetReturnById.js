export default class GetReturnById {
  constructor(returnRepository) {
    this.returnRepository = returnRepository;
  }

  async execute(id) {
    return await this.returnRepository.findById(id);
  }
}