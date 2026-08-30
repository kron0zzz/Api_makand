import CreateChargeType from "../../application/use-cases/chargeTypes/CreateChargeType.js";
import GetChargeTypes from "../../application/use-cases/chargeTypes/GetChargeTypes.js";
import GetChargeTypesTable from "../../application/use-cases/chargeTypes/GetChargeTypesTable.js";
import GetChargeTypeById from "../../application/use-cases/chargeTypes/GetChargeTypeById.js";
import UpdateChargeType from "../../application/use-cases/chargeTypes/UpdateChargeType.js";
import DeleteChargeType from "../../application/use-cases/chargeTypes/DeleteChargeType.js";

import ChargeTypeRepositoryPrisma from "../repositories/ChargeTypeRepositoryPrisma.js";

const chargeTypeRepository = new ChargeTypeRepositoryPrisma();

export const createChargeType = async (req, res, next) => {
  try {
    const createChargeTypeUseCase = new CreateChargeType(chargeTypeRepository);
    const chargeType = await createChargeTypeUseCase.execute(req.body);
    res.status(201).json(chargeType);
  } catch (err) {
    next(err);
  }
};

export const getChargeTypes = async (req, res, next) => {
  try {
    const getChargeTypesUseCase = new GetChargeTypes(chargeTypeRepository);
    const chargeTypes = await getChargeTypesUseCase.execute();
    res.status(200).json(chargeTypes);
  } catch (err) {
    next(err);
  }
};

export const getChargeTypeById = async (req, res, next) => {
  try {
    const getChargeTypeByIdUseCase = new GetChargeTypeById(chargeTypeRepository);
    const chargeType = await getChargeTypeByIdUseCase.execute(req.params.id);

    if (!chargeType) {
      return res.status(404).json({ error: "Tipo de cobro no encontrado" });
    }

    res.status(200).json(chargeType);
  } catch (err) {
    next(err);
  }
};

export const updateChargeType = async (req, res, next) => {
  try {
    const updateChargeTypeUseCase = new UpdateChargeType(chargeTypeRepository);
    const updatedChargeType = await updateChargeTypeUseCase.execute(
      req.params.id,
      req.body
    );

    if (!updatedChargeType) {
      return res.status(404).json({ error: "No se encontró el tipo de cobro para actualizar" });
    }

    res.status(200).json(updatedChargeType);
  } catch (err) {
    next(err);
  }
};

export const deleteChargeType = async (req, res, next) => {
  try {
    const deleteChargeTypeUseCase = new DeleteChargeType(chargeTypeRepository);
    const deletedChargeType = await deleteChargeTypeUseCase.execute(req.params.id);

    if (!deletedChargeType) {
      return res.status(404).json({ error: "No se encontró el tipo de cobro para eliminar" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getChargeTypesTable = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const getChargeTypesTableUseCase = new GetChargeTypesTable(chargeTypeRepository);
    const chargeTypes = await getChargeTypesTableUseCase.execute(page, limit, search);
    res.status(200).json(chargeTypes);
  } catch (err) {
    next(err);
  }
};