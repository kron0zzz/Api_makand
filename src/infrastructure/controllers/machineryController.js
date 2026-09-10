import CreateMachinery from "../../application/use-cases/machinery/CreateMachinery.js";
import CreateMachineryComplete from "../../application/use-cases/machinery/CreateMachineryComplete.js";
import GetMachineries from "../../application/use-cases/machinery/GetMachineries.js";
import GetMachineryById from "../../application/use-cases/machinery/GetMachineryById.js";
import UpdateMachinery from "../../application/use-cases/machinery/UpdateMachinery.js";
import DeleteMachinery from "../../application/use-cases/machinery/DeleteMachinery.js";
import GetMachineriesTable from "../../application/use-cases/machinery/GetMachineriesTable.js";
import MachineryRepository from "../repositories/MachineryRepository.js";
import MachineryStockRepository from "../repositories/machineryStockRepository.js";

const machineryRepository = new MachineryRepository();
const machineryStockRepository = new MachineryStockRepository();

export const createMachinery = async (req, res, next) => {
  try {
    const createUseCase = new CreateMachinery(machineryRepository);
    const machinery = await createUseCase.execute(req.body);
    res.status(201).json(machinery);
  } catch (err) {
    next(err);
  }
};

export const getMachineries = async (req, res, next) => {
  try {
    const getMachineriesUseCase = new GetMachineries(machineryRepository);
    const machineries = await getMachineriesUseCase.execute();
    res.status(200).json(machineries);
  } catch (err) {
    next(err);
  }
};

export const getMachineryById = async (req, res, next) => {
  try {
    const getByIdUseCase = new GetMachineryById(machineryRepository);
    const machinery = await getByIdUseCase.execute(req.params.id);

    if (!machinery) {
      return res.status(404).json({ error: "Maquinaria no encontrada" });
    }

    res.status(200).json(machinery);
  } catch (err) {
    next(err);
  }
};

export const updateMachinery = async (req, res, next) => {
  try {
    console.log("DATOS PARA ACTUALIZAR MAQUINARIA:", req.body);
    const updateUseCase = new UpdateMachinery(machineryRepository);
    const updatedMachinery = await updateUseCase.execute(
      req.params.id,
      req.body
    );

    if (!updatedMachinery) {
      return res.status(404).json({ error: "No se encontró la maquinaria para actualizar" });
    }

    res.status(200).json(updatedMachinery);
  } catch (err) {
    next(err);
  }
};

export const deleteMachinery = async (req, res, next) => {
  try {
    const deleteUseCase = new DeleteMachinery(machineryRepository);
    const deletedMachinery = await deleteUseCase.execute(req.params.id);

    if (!deletedMachinery) {
      return res.status(404).json({ error: "No se encontró la maquinaria para eliminar" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const createMachineryComplete = async (req, res, next) => {
  try {
    const { machineryData, stockData } = req.body;
    const createUseCase = new CreateMachineryComplete(machineryRepository, machineryStockRepository);
    const machinery = await createUseCase.execute(machineryData, stockData, req.user);
    res.status(201).json(machinery);
  } catch (err) {
    next(err);
  }
};

export const getMachineriesTable = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const getTableUseCase = new GetMachineriesTable(machineryRepository);
    const machineries = await getTableUseCase.execute(page, limit, search);
    res.status(200).json(machineries);
  } catch (err) {
    next(err);
  }
};