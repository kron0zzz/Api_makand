import CreateRentalCut from "../../application/use-cases/rental_cuts/CreateRentalCut.js";
import GetRentalCuts from "../../application/use-cases/rental_cuts/GetRentalCuts.js";
import GetRentalCutById from "../../application/use-cases/rental_cuts/GetRentalCutById.js";
import UpdateRentalCut from "../../application/use-cases/rental_cuts/UpdateRentalCut.js";
import DeleteRentalCut from "../../application/use-cases/rental_cuts/DeleteRentalCut.js";
import GetRentalCutsTable from "../../application/use-cases/rental_cuts/GetRentalCutsTable.js";
import GetRentalCutByOrderId from "../../application/use-cases/rental_cuts/GetRentalCutByOrderId.js";

import AdditionalChargeRepository from "../repositories/AdditionalChargeRepository.js";
import RentalCutRepository from "../repositories/RentalCutRepository.js";
import OrderRepository from "../repositories/OrderRepository.js";
import Order_detailRepository from "../repositories/Order_detailRepository.js";
import ReturnRepository from "../repositories/ReturnRepository.js";

const rentalCutRepository = new RentalCutRepository();
const orderRepository = new OrderRepository();
const order_detailRepository = new Order_detailRepository();
const returnRepository = new ReturnRepository();
const additionalChargeRepository = new AdditionalChargeRepository(); 

export const createRentalCut = async (req, res) => {
  try {
    const createRentalCut = new CreateRentalCut(
      rentalCutRepository, 
      orderRepository, 
      order_detailRepository, 
      returnRepository,
      additionalChargeRepository 
    );
    const rentalCut = await createRentalCut.execute(req.body);
    res.status(201).json(rentalCut);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRentalCuts = async (req, res) => {
  try {
    const getRentalCuts =
      new GetRentalCuts(rentalCutRepository);

    const rentalCuts = await getRentalCuts.execute();

    res.status(200).json(rentalCuts);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getRentalCutById = async (req, res) => {
  try {
    const getRentalCutById =
      new GetRentalCutById(rentalCutRepository);

    const rentalCut =
      await getRentalCutById.execute(req.params.id);

    if (!rentalCut) {
      return res.status(404).json({
        error: "Corte de alquiler no encontrado"
      });
    }

    res.status(200).json(rentalCut);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateRentalCut = async (req, res) => {
  try {
    const updateRentalCut =
      new UpdateRentalCut(rentalCutRepository);

    const updatedRentalCut =
      await updateRentalCut.execute(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedRentalCut);

  } catch (err) {

    if (!err.message) {
      return res.status(404).json({
        error: "Corte de alquiler no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteRentalCut = async (req, res) => {
  try {
    const deleteRentalCut =
      new DeleteRentalCut(rentalCutRepository);

    await deleteRentalCut.execute(req.params.id);

    res.status(204).send();

  } catch (err) {

    if (!err.message) {
      return res.status(404).json({
        error: "Corte de alquiler no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const getRentalCutsTable = async (req, res) => {
  try {
    const getRentalCutsTable =
      new GetRentalCutsTable(rentalCutRepository);

    const rentalCuts = await getRentalCutsTable.execute();

    res.status(200).json(rentalCuts);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};



export const getRentalCutByOrderId = async (req, res) => {
  try {
    const getRentalCutByOrderId =
      new GetRentalCutByOrderId(rentalCutRepository);

    const rentalCutsOrder =
      await getRentalCutByOrderId.execute(req.params.id);

    if (!rentalCutsOrder) {
      return res.status(404).json({
        error: "Corte de alquiler no encontrado"
      });
    }

    res.status(200).json(rentalCutsOrder);

  } catch (err) {
    console.error("ERROR DETECTADO EN getRentalCutByOrderId:", err);
    res.status(500).json({
      error: err.message
    });
  }
};