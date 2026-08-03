export default class UpdateMachineryStock {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(id, machineryStockData) {
    if (machineryStockData.stock_quantity < 0) {
      throw new Error("La cantidad disponible (stock) no puede ser negativa.");
    }
    return await this.machineryStockRepository.update(id, machineryStockData);
  }
}