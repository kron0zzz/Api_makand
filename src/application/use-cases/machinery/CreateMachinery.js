export default class CreateMachinery {
  constructor(machineryRepository) {
    this.machineryRepository = machineryRepository;
  }

  async execute(machineryData) {
    if (machineryData.stock_quantity < 0) {
      throw new Error("La cantidad disponible (stock) no puede ser un número negativo.");
    }
    return await this.machineryRepository.create(machineryData);
  }
}