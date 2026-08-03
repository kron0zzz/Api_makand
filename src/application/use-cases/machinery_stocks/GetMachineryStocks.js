export default class GetMachineryStocks {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute() {
    return await this.machineryStockRepository.findAll();
  }
}