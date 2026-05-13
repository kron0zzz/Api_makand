import CreateVehicle from "../../application/use-cases/vehicles/CreateVehicle.js";
import GetVehicles from "../../application/use-cases/vehicles/GetVehicles.js";
import GetVehicleById from "../../application/use-cases/vehicles/GetVehicleById.js";
import UpdateVehicle from "../../application/use-cases/vehicles/UpdateVehicle.js";
import DeleteVehicle from "../../application/use-cases/vehicles/DeleteVehicle.js";
import GetVehiclesTable from "../../application/use-cases/vehicles/GetVehiclesTable.js";

import VehicleRepository from "../repositories/VehicleRepository.js";

const vehicleRepository = new VehicleRepository();

const validateVehiclePayload = (data) => {
  const requiredFields = [
    "vehicle_status",
    "vehicle_brand",
    "vehicle_model",
    "license_plate",
    "capacity_kg"
  ];

  const missingFields = requiredFields.filter(
    (field) => data[field] === undefined || data[field] === null || data[field] === ""
  );

  if (missingFields.length > 0) {
    return `Faltan campos obligatorios: ${missingFields.join(", ")}`;
  }

  return null;
};

export const createVehicle = async (req, res) => {
  const validationError = validateVehiclePayload(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const createVehicle = new CreateVehicle(vehicleRepository);
    const vehicle = await createVehicle.execute(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        error: "Ya existe un vehículo con esa placa"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const getVehicles = new GetVehicles(vehicleRepository);
    const vehicles = await getVehicles.execute();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const getVehicleById = new GetVehicleById(vehicleRepository);
    const vehicle = await getVehicleById.execute(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        error: "Vehículo no encontrado"
      });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateVehicle = async (req, res) => {
  const validationError = validateVehiclePayload(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const updateVehicle = new UpdateVehicle(vehicleRepository);
    const updatedVehicle = await updateVehicle.execute(req.params.id, req.body);

    if (!updatedVehicle) {
      return res.status(404).json({
        error: "Vehículo no encontrado"
      });
    }

    res.status(200).json(updatedVehicle);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        error: "Ya existe un vehículo con esa placa"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const deleteVehicle = new DeleteVehicle(vehicleRepository);
    const deletedVehicle = await deleteVehicle.execute(req.params.id);

    if (!deletedVehicle) {
      return res.status(404).json({
        error: "Vehículo no encontrado"
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};



export const getVehiclesTable = async (req, res) => {
  try {
    const getVehiclesTable =
      new GetVehiclesTable(vehicleRepository);

    const vehicles = await getVehiclesTable.execute();

    res.status(200).json(vehicles);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};