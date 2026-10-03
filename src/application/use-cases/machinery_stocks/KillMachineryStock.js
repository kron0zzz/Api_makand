const STATUS_NO_DISPONIBLE = 4;

export default class KillMachineryStock {
  constructor(machineryStockRepository) {
    this.machineryStockRepository = machineryStockRepository;
  }

  async execute(id, quantity) {
    const stockId = parseInt(id, 10);
    if (!Number.isInteger(stockId) || stockId <= 0) {
      throw new Error("El identificador del stock de maquinaria no es válido.");
    }

    const cantidad = parseInt(quantity, 10);
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("La cantidad a dar de baja debe ser un número entero mayor a cero.");
    }

    const stock = await this.machineryStockRepository.findById(stockId);
    if (!stock) {
      return null;
    }

    if (Number(stock.status_id) === STATUS_NO_DISPONIBLE) {
      throw new Error("Este registro de stock ya se encuentra dado de baja (No disponible).");
    }

    if (cantidad > Number(stock.stock_quantity)) {
      throw new Error(
        `La cantidad a dar de baja (${cantidad}) no puede ser superior a la cantidad disponible (${stock.stock_quantity}).`
      );
    }

    // Maquinaria motorizada: cada registro es una unidad física, se da de baja completa.
    if (stock.is_motorized) {
      if (cantidad !== 1) {
        throw new Error("La maquinaria motorizada se da de baja de a una unidad (cantidad 1).");
      }

      const actualizado = await this.machineryStockRepository.setNotAvailableByKill(stockId);

      if (!actualizado) {
        throw new Error("No se pudo dar de baja el equipo motorizado. Intenta nuevamente.");
      }
    } else {
      // Maquinaria no motorizada: se descuentan unidades y, si queda en 0, pasa a "No disponible".
      const actualizado = await this.machineryStockRepository.discountStockByKill(stockId, cantidad);

      if (!actualizado) {
        throw new Error(
          "No se pudo dar de baja la maquinaria. La cantidad disponible pudo haber cambiado, intenta nuevamente."
        );
      }
    }

    return await this.machineryStockRepository.findById(stockId);
  }
}
