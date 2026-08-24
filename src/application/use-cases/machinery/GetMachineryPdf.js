import MachineryRepository from "../../../infrastructure/repositories/MachineryRepository.js";
import MaintenanceRepositoryPrisma from "../../../infrastructure/repositories/MaintenanceRepositoryPrisma.js";
import { generateMachinerySheetPdf } from "../../../infrastructure/pdf/generators/MachinerySheetGenerator.js";

export default class GetMachineryPdf {
  constructor(machineryRepository, maintenanceRepository) {
    this.machineryRepository = machineryRepository;
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute(id) {
    const machinery = await this.machineryRepository.findByIdWithStock(id);
    if (!machinery) {
      const error = new Error("Maquinaria no encontrada");
      error.statusCode = 404;
      throw error;
    }

    const maintenances = await this.maintenanceRepository.findByMachineryId(id);

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

    const stockDetails = machinery.stock_details || [];
    const firstStock = stockDetails[0] || {};

    const lastMaintenance = maintenances[0] || null;
    const nextRevision = firstStock.next_revision_date || null;

    let currentStatus = "Sin stock registrado";
    if (machinery.is_motorized) {
      currentStatus = machinery.total_stock > 0 ? "Disponible" : "No disponible";
    } else if (stockDetails.length > 0) {
      currentStatus = firstStock.status_name || "Sin estado";
    }

    const data = {
      machinery_name: machinery.machinery_name || "",
      machinery_id: machinery.machinery_id,
      category_name: machinery.category_name || "Sin categoría",
      machinery_description: machinery.machinery_description || "Sin especificaciones o descripciones adicionales registradas.",
      is_motorized_label: machinery.is_motorized ? "Motorizada" : "No motorizada",
      sale_price: formatCurrency(machinery.sale_price),
      daily_rental_price: formatCurrency(machinery.daily_rental_price),
      weight_kg: machinery.weight_kg ? `${machinery.weight_kg} Kg` : "No especificado",
      total_stock: machinery.total_stock ?? 0,
      available_stock: machinery.available_stock ?? 0,
      serial_number: firstStock.serial_number || "N/A",
      next_revision_date: formatDate(nextRevision),
      is_owned_label:
        firstStock.is_owned !== undefined
          ? firstStock.is_owned
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
