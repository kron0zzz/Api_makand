import CreateSubRental from "../../application/use-cases/sub_rentals/CreateSubRental.js";
import GetSubRentals from "../../application/use-cases/sub_rentals/GetSubRentals.js";
import GetSubRentalById from "../../application/use-cases/sub_rentals/GetSubRentalById.js";
import UpdateSubRental from "../../application/use-cases/sub_rentals/UpdateSubRental.js";
import DeleteSubRental from "../../application/use-cases/sub_rentals/DeleteSubRental.js";
import GetSubRentalsTable from "../../application/use-cases/sub_rentals/GetSubRentalsTable.js";
import SubRentalRepository from "../repositories/SubRentalRepository.js";

const subRentalRepository = new SubRentalRepository();

export const createSubRental = async (req, res) => {
  try {
    const useCase = new CreateSubRental(subRentalRepository);
    const subRental = await useCase.execute(req.body);
    res.status(201).json(subRental);
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ 
        error: "La maquinaria (machinery_id) o el proveedor (supplier_id) especificados no existen." 
      });
    }
    res.status(500).json({ error: err.message });
  }
};

export const getSubRentals = async (req, res) => {
  try {
    const useCase = new GetSubRentals(subRentalRepository);
    const subRentals = await useCase.execute();
    res.status(200).json(subRentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubRentalById = async (req, res) => {
  try {
    const useCase = new GetSubRentalById(subRentalRepository);
    const id = parseInt(req.params.id, 10);
    const subRental = await useCase.execute(id);

    if (!subRental) {
      return res.status(404).json({ error: "Registro de subalquiler no encontrado" });
    }
    res.status(200).json(subRental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSubRental = async (req, res) => {
  try {
    const useCase = new UpdateSubRental(subRentalRepository);
    const id = parseInt(req.params.id, 10);
    const updated = await useCase.execute(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Subalquiler no encontrado para actualizar" });
    }
    res.status(200).json(updated);
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "Los identificadores de maquinaria o proveedor no son válidos." });
    }
    res.status(500).json({ error: err.message });
  }
};

export const deleteSubRental = async (req, res) => {
  try {
    const useCase = new DeleteSubRental(subRentalRepository);
    const id = parseInt(req.params.id, 10);
    const deleted = await useCase.execute(id);

    if (!deleted) {
      return res.status(404).json({ error: "Subalquiler no encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubRentalsTable = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const useCase = new GetSubRentalsTable(subRentalRepository);
    const tableData = await useCase.execute(page, limit, search);
    res.status(200).json(tableData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};