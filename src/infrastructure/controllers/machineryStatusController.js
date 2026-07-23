import CreateMachineryStatus from "../../application/use-cases/machinery_status/CreateMachineryStatus.js";
import GetMachineryStatuses from "../../application/use-cases/machinery_status/GetMachineryStatuses.js";
import GetMachineryStatusById from "../../application/use-cases/machinery_status/GetMachineryStatusById.js";
import UpdateMachineryStatus from "../../application/use-cases/machinery_status/UpdateMachineryStatus.js";
import DeleteMachineryStatus from "../../application/use-cases/machinery_status/DeleteMachineryStatus.js";
import GetMachineryStatusesTable from "../../application/use-cases/machinery_status/GetMachineryStatusesTable.js";

import MachineryStatusRepository from "../repositories/MachineryStatusRepository.js";

const machineryStatusRepository = new MachineryStatusRepository();

export const createMachineryStatus = async (req, res) => {
  try {
    const createUseCase = new CreateMachineryStatus(machineryStatusRepository);
    const status = await createUseCase.execute(req.body);
    res.status(201).json(status);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMachineryStatuses = async (req, res) => {
  try {
    const getStatusesUseCase = new GetMachineryStatuses(machineryStatusRepository);
    const statuses = await getStatusesUseCase.execute();
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMachineryStatusById = async (req, res) => {
  try {
    const getByIdUseCase = new GetMachineryStatusById(machineryStatusRepository);
    const status = await getByIdUseCase.execute(req.params.id);

    if (!status) {
      return res.status(404).json({ error: "Estado de maquinaria no encontrado" });
    }

    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMachineryStatus = async (req, res) => {
  try {
    const updateUseCase = new UpdateMachineryStatus(machineryStatusRepository);
    const updatedStatus = await updateUseCase.execute(
      req.params.id,
      req.body
    );

    if (!updatedStatus) {
      return res.status(404).json({ error: "No se encontró el estado de maquinaria para actualizar" });
    }

    res.status(200).json(updatedStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMachineryStatus = async (req, res) => {
  try {
    const deleteUseCase = new DeleteMachineryStatus(machineryStatusRepository);
    const deletedStatus = await deleteUseCase.execute(req.params.id);

    if (!deletedStatus) {
      return res.status(404).json({ error: "No se encontró el estado de maquinaria para eliminar" });
    }

    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMachineryStatusesTable = async (req, res) => {
  try {
    const getTableUseCase = new GetMachineryStatusesTable(machineryStatusRepository);
    const statuses = await getTableUseCase.execute();
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
