import MachineryStockRepository from "../../../infrastructure/repositories/machineryStockRepository.js";
import MaintenanceRepositoryPrisma from "../../../infrastructure/repositories/MaintenanceRepositoryPrisma.js";
import { generateMachinerySheetPdf } from "../../../infrastructure/pdf/generators/MachinerySheetGenerator.js";

export default class GetStockPdf {
  constructor(machineryStockRepository, maintenanceRepository) {
    this.machineryStockRepository = machineryStockRepository;
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute(stockId) {
    const stock = await this.machineryStockRepository.findById(stockId);
    if (!stock) {
      const error = new Error("Equipo no encontrado");
      error.statusCode = 404;
      throw error;
    }

    // Only generate PDF for motorized equipment (has serial_number)
    if (!stock.serial_number) {
      const error = new Error("La hoja de vida solo está disponible para equipos motorizados");
      error.statusCode = 400;
      throw error;
    }

    const machinery = stock;
    const maintenances = await this.maintenanceRepository.findByStockId(stockId);

    const formatCurrency = (value) => {
      const number = Number(value) || 0;
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number);
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return "No programada";
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "No programada";
      return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const lastMaintenance = maintenances[0] || null;
    const nextRevision = stock.next_revision_date || null;

    let currentStatus = "Sin estado";
    currentStatus = stock.status_name || "Sin estado";

    const data = {
      machinery_name: stock.machinery_name || "",
      machinery_id: stock.machinery_id,
      stock_id: stock.stock_id,
      category_name: stock.category_name || "Sin categoría",
      machinery_description: stock.machinery_description || "Sin especificaciones o descripciones adicionales registradas.",
      is_motorized_label: stock.is_motorized ? "Motorizada" : "No motorizada",
      sale_price: formatCurrency(stock.sale_price),
      daily_rental_price: formatCurrency(stock.daily_rental_price),
      weight_kg: stock.weight_kg ? `${stock.weight_kg} Kg` : "No especificado",
      total_stock: stock.stock_quantity ?? 1,
      available_stock: stock.stock_quantity ?? 1,
      serial_number: stock.serial_number || "N/A",
      next_revision_date: formatDate(nextRevision),
      is_owned_label:
        stock.is_owned !== undefined
          ? stock.is_owned
            ? "Propio de la Empresa"
            : "Subcontratado / Externo"
          : "No especificado",
      current_status: currentStatus,
      last_maintenance_date: lastMaintenance ? formatDate(lastMaintenance.maintenance_date) : "Sin registros",
      last_maintenance_notes: lastMaintenance?.revision_notes || "Sin notas",
      next_maintenance_date: formatDate(nextRevision),
      maintenance_history: maintenances.map((m) => ({
        maintenance_date: formatDate(m.maintenance_date),
        serial_number: m.serial_number || "N/A",
        revision_notes: m.revision_notes || "Sin notas",
      })),
      generated_at: new Date().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    return generateMachinerySheetPdf(data);
  }
}