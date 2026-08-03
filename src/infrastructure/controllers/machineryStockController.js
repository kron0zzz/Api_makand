import CreateMachineryStock from "../../application/use-cases/machinery_stocks/CreateMachineryStock.js";
import GetMachineryStocks from "../../application/use-cases/machinery_stocks/GetMachineryStocks.js";
import GetMachineryStockById from "../../application/use-cases/machinery_stocks/GetMachineryStockById.js";
import UpdateMachineryStock from "../../application/use-cases/machinery_stocks/UpdateMachineryStock.js";
import DeleteMachineryStock from "../../application/use-cases/machinery_stocks/DeleteMachineryStock.js";
import GetMachineryStocksTable from "../../application/use-cases/machinery_stocks/GetMachineryStocksTable.js";

import MachineryStockRepository from "../repositories/machineryStockRepository.js";

const machineryStockRepository = new MachineryStockRepository();

// Cambiado a createMachineryStock
export const createMachineryStock = async (req, res) => {
  try {
    const createUseCase = new CreateMachineryStock(machineryStockRepository);
    const stock = await createUseCase.execute(req.body);
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a getMachineryStocks
export const getMachineryStocks = async (req, res) => {
  try {
    const getStocksUseCase = new GetMachineryStocks(machineryStockRepository);
    const stocks = await getStocksUseCase.execute();
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a getMachineryStockById
export const getMachineryStockById = async (req, res) => {
  try {
    const getByIdUseCase = new GetMachineryStockById(machineryStockRepository);
    const stock = await getByIdUseCase.execute(req.params.id);

    if (!stock) {
      return res.status(404).json({ error: "Maquinaria no encontrada" });
    }

    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a updateMachineryStock
export const updateMachineryStock = async (req, res) => {
  try {
    const updateUseCase = new UpdateMachineryStock(machineryStockRepository);
    const updatedStock = await updateUseCase.execute(
      req.params.id,
      req.body
    );

    if (!updatedStock) {
      return res.status(404).json({ error: "No se encontró el stock de maquinaria para actualizar" });
    }

    res.status(200).json(updatedStock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a deleteMachineryStock
export const deleteMachineryStock = async (req, res) => {
  try {
    const deleteUseCase = new DeleteMachineryStock(machineryStockRepository);
    const deletedStock = await deleteUseCase.execute(req.params.id);

    if (!deletedStock) {
      return res.status(404).json({ error: "No se encontró el stock de maquinaria para eliminar" });
    }

    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a getMachineryStocksTable
export const getMachineryStocksTable = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";

    const getTableUseCase = new GetMachineryStocksTable(machineryStockRepository);
    const stocks = await getTableUseCase.execute(page, limit, search);

    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};