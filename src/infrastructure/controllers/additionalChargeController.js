import CreateAdditionalCharge from "../../application/use-cases/additionalCharges/CreateAdditionalCharge.js";
import GetAdditionalCharges from "../../application/use-cases/additionalCharges/GetAdditionalCharges.js";
import GetAdditionalChargeById from "../../application/use-cases/additionalCharges/GetAdditionalChargeById.js";
import UpdateAdditionalCharge from "../../application/use-cases/additionalCharges/UpdateAdditionalCharge.js";
import DeleteAdditionalCharge from "../../application/use-cases/additionalCharges/DeleteAdditionalCharge.js";
import GetAdditionalChargesTable from "../../application/use-cases/additionalCharges/GetAdditionalChargesTable.js";

import AdditionalChargeRepository from "../repositories/AdditionalChargeRepository.js";

const additionalChargeRepository = new AdditionalChargeRepository();

export const createAdditionalCharge = async (req, res) => {
  try {
    const createUseCase = new CreateAdditionalCharge(additionalChargeRepository);
    const charge = await createUseCase.execute(req.body);
    res.status(201).json(charge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdditionalCharges = async (req, res) => {
  try {
    const getUseCase = new GetAdditionalCharges(additionalChargeRepository);
    const charges = await getUseCase.execute();
    res.status(200).json(charges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdditionalChargeById = async (req, res) => {
  try {
    const getByIdUseCase = new GetAdditionalChargeById(additionalChargeRepository);
    const charge = await getByIdUseCase.execute(req.params.id);

    if (!charge) {
      return res.status(404).json({ error: "Cobro adicional no encontrado" });
    }

    res.status(200).json(charge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAdditionalCharge = async (req, res) => {
  try {
    const updateUseCase = new UpdateAdditionalCharge(additionalChargeRepository);
    const updatedCharge = await updateUseCase.execute(req.params.id, req.body);

    if (!updatedCharge) {
      return res.status(404).json({ error: "No se encontró el cobro adicional para actualizar" });
    }

    res.status(200).json(updatedCharge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAdditionalCharge = async (req, res) => {
  try {
    const deleteUseCase = new DeleteAdditionalCharge(additionalChargeRepository);
    const deletedCharge = await deleteUseCase.execute(req.params.id);

    if (!deletedCharge) {
      return res.status(404).json({ error: "No se encontró el cobro adicional para eliminar" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdditionalChargesTable = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const getTableUseCase = new GetAdditionalChargesTable(additionalChargeRepository);
    const result = await getTableUseCase.execute(page, limit, search);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};