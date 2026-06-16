export default class GetReturns {
  constructor(returnRepository) {
    this.returnRepository = returnRepository;
  }

  async execute() {
    return await this.returnRepository.findAll();
  }
}