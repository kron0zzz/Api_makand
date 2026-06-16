export default class UpdateReturn {
  constructor(returnRepository) {
    this.returnRepository = returnRepository;
  }

  async execute(id, returnData) {
    return await this.returnRepository.update(
      id,
      returnData
    );
  }
}