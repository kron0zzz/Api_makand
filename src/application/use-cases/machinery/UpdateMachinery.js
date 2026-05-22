export default class UpdateMachinery {
  constructor(machineryRepository) {
    this.machineryRepository = machineryRepository;
  }

  async execute(id, machineryData) {
    if (machineryData.stock_quantity < 0) {
      throw new Error("La cantidad disponible (stock) no puede ser negativa.");
    }
    return await this.machineryRepository.update(id, machineryData);
  }
}