export default class CreateReturn {
  constructor(returnRepository) {
    this.returnRepository = returnRepository;
  }

  async execute(returnData) {
    return await this.returnRepository.create(returnData);
  }
}