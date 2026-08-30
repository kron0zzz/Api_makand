import CreateMaintenance from "../../application/use-cases/maintenances/CreateMaintenance.js";
import GetMaintenances from "../../application/use-cases/maintenances/GetMaintenances.js";
import GetMaintenancesTable from "../../application/use-cases/maintenances/GetMaintenancesTable.js";
import GetMaintenanceById from "../../application/use-cases/maintenances/GetMaintenanceById.js";
import UpdateMaintenance from "../../application/use-cases/maintenances/UpdateMaintenance.js";
import DeleteMaintenance from "../../application/use-cases/maintenances/DeleteMaintenance.js";

import MaintenanceRepositoryPrisma from "../repositories/MaintenanceRepositoryPrisma.js";
import MachineryStockRepository from "../repositories/machineryStockRepository.js";

const maintenanceRepository = new MaintenanceRepositoryPrisma();
const machineryStockRepository = new MachineryStockRepository();

export const createMaintenance = async (req, res, next) => {
  try {
    const createMaintenanceUseCase = new CreateMaintenance(maintenanceRepository, machineryStockRepository);
    const maintenance = await createMaintenanceUseCase.execute(req.body);
    res.status(201).json(maintenance);
  } catch (err) {
    next(err);
  }
};

export const getMaintenances = async (req, res, next) => {
  try {
    const getMaintenancesUseCase = new GetMaintenances(maintenanceRepository);
    const maintenances = await getMaintenancesUseCase.execute();
    res.status(200).json(maintenances);
  } catch (err) {
    next(err);
  }
};

export const getMaintenancesTable = async (req, res, next) => {
  try {
    const getMaintenancesTableUseCase = new GetMaintenancesTable(maintenanceRepository);
    const maintenances = await getMaintenancesTableUseCase.execute();
    res.status(200).json(maintenances);
  } catch (err) {
    next(err);
  }
};

export const getMaintenanceById = async (req, res, next) => {
  try {
    const getMaintenanceByIdUseCase = new GetMaintenanceById(maintenanceRepository);
    const maintenance = await getMaintenanceByIdUseCase.execute(req.params.id);

    if (!maintenance) {
      return res.status(404).json({ error: "Mantenimiento no encontrado" });
    }

    res.status(200).json(maintenance);
  } catch (err) {
    next(err);
  }
};

export const updateMaintenance = async (req, res, next) => {
  try {
    const updateMaintenanceUseCase = new UpdateMaintenance(maintenanceRepository);
    const updatedMaintenance = await updateMaintenanceUseCase.execute(
      req.params.id,
      req.body
    );

    if (!updatedMaintenance) {
      return res.status(404).json({ error: "No se encontró el mantenimiento para actualizar" });
    }

    res.status(200).json(updatedMaintenance);
  } catch (err) {
    next(err);
  }
};

export const deleteMaintenance = async (req, res, next) => {
  try {
    const deleteMaintenanceUseCase = new DeleteMaintenance(maintenanceRepository);
    const deletedMaintenance = await deleteMaintenanceUseCase.execute(req.params.id);

    if (!deletedMaintenance) {
      return res.status(404).json({ error: "No se encontró el mantenimiento para eliminar" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
