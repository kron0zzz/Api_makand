export default class CreateMachineryStock {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(machineryStockData) {
    if (machineryStockData.stock_quantity < 0) {
      throw new Error("La cantidad disponible (stock) no puede ser un número negativo.");
    }
    return await this.machineryStockRepository.create(machineryStockData);
  }
}