export default class DeleteMachineryStock {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(id) {
    return await this.machineryStockRepository.delete(id);
  }
}