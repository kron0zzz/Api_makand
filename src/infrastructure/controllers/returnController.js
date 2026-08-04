import CreateReturn from "../../application/use-cases/returns/CreateReturn.js";
import GetReturns from "../../application/use-cases/returns/GetReturns.js";
import GetReturnById from "../../application/use-cases/returns/GetReturnById.js";
import UpdateReturn from "../../application/use-cases/returns/UpdateReturn.js";
import DeleteReturn from "../../application/use-cases/returns/DeleteReturn.js";
import GetReturnsTable from "../../application/use-cases/returns/GetReturnsTable.js";

import ReturnRepository from "../repositories/ReturnRepository.js";
import Order_detailRepository from "../repositories/Order_detailRepository.js";
import MachineryStockRepository from "../repositories/machineryStockRepository.js";
import OrderRepository from "../repositories/OrderRepository.js";
import RentalCutRepository from "../repositories/RentalCutRepository.js";

const returnRepository = new ReturnRepository();
const orderDetailRepository = new Order_detailRepository();
const machineryStockRepository = new MachineryStockRepository();
const orderRepository = new OrderRepository();
const rentalCutRepository = new RentalCutRepository();

export const createReturn = async (req, res) => {
  try {
    const createReturn = new CreateReturn(returnRepository, orderDetailRepository, machineryStockRepository, orderRepository);
    const returnData = await createReturn.execute(req.body);
    res.status(201).json(returnData);
  } catch (err) {
    console.error("ERROR DETALLADO EN REGISTRO DE DEVOLUCIÓN:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getReturns = async (req, res) => {
  try {
    const getReturns =
      new GetReturns(returnRepository);

    const returns = await getReturns.execute();

    res.status(200).json(returns);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getReturnById = async (req, res) => {
  try {
    const getReturnById =
      new GetReturnById(returnRepository);

    const returnData =
      await getReturnById.execute(req.params.id);

    if (!returnData) {
      return res.status(404).json({
        error: "Devolución no encontrada"
      });
    }

    res.status(200).json(returnData);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateReturn = async (req, res) => {
  try {
    const updateReturn =
      new UpdateReturn(returnRepository);

    const updatedReturn =
      await updateReturn.execute(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedReturn);

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Devolución no encontrada"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteReturn = async (req, res) => {
  try {
    const deleteReturn =
      new DeleteReturn(
        returnRepository,
        orderDetailRepository,
        machineryStockRepository,
        orderRepository,
        rentalCutRepository
      );

    const deletedReturn =
      await deleteReturn.execute(
        req.params.id
      );

    if (!deletedReturn) {

      return res.status(404).json({
        error: "Devolución no encontrada"
      });

    }

    res.status(204).send();

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Devolución no encontrada"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const getReturnsTable = async (req, res) => {
  try {
    const getReturnsTable =
      new GetReturnsTable(returnRepository);

    const returns = await getReturnsTable.execute();

    res.status(200).json(returns);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};