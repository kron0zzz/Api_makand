export default class GetMachineryStocksTable {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(page, limit, search) {
    return await this.machineryStockRepository.findTableData(page, limit, search);
  }
}