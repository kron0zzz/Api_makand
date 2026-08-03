export default class GetMachineryStockById {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(id) {
    return await this.machineryStockRepository.findById(id);
  }
}