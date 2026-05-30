import CreatePosition from "../../application/use-cases/positions/CreatePosition.js";
import GetPositions from "../../application/use-cases/positions/GetPositions.js";
import GetPositionById from "../../application/use-cases/positions/GetPositionById.js";
import UpdatePosition from "../../application/use-cases/positions/UpdatePosition.js";
import DeletePosition from "../../application/use-cases/positions/DeletePosition.js";

import PositionRepository from "../repositories/PositionRepository.js";

const positionRepository = new PositionRepository();

export const createPosition = async (req, res) => {
  try {
    const createPosition =
      new CreatePosition(positionRepository);

    const position = await createPosition.execute(
      req.body
    );

    res.status(201).json(position);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getPositions = async (req, res) => {
  try {
    const getPositions =
      new GetPositions(positionRepository);

    const positions = await getPositions.execute();

    res.status(200).json(positions);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getPositionById = async (req, res) => {
  try {
    const getPositionById =
      new GetPositionById(positionRepository);

    const position =
      await getPositionById.execute(req.params.id);

    if (!position) {
      return res.status(404).json({
        error: "Cargo no encontrado"
      });
    }

    res.status(200).json(position);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const updatePosition =
      new UpdatePosition(positionRepository);

    const updatedPosition =
      await updatePosition.execute(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedPosition);

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: " no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const deletePosition =
      new DeletePosition(positionRepository);

    await deletePosition.execute(req.params.id);

    res.status(204).send();

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Cargo no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};