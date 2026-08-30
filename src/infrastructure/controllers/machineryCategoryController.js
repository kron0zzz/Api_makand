import CreateMachineryCategory from "../../application/use-cases/machinery_categories/CreateMachineryCategory.js";
import GetMachineryCategories from "../../application/use-cases/machinery_categories/GetMachineryCategories.js";
import GetMachineryCategoryById from "../../application/use-cases/machinery_categories/GetMachineryCategoryById.js";
import UpdateMachineryCategory from "../../application/use-cases/machinery_categories/UpdateMachineryCategory.js";
import DeleteMachineryCategory from "../../application/use-cases/machinery_categories/DeleteMachineryCategory.js";
import GetMachineryCategoriesTable from "../../application/use-cases/machinery_categories/GetMachineryCategoriesTable.js";

import MachineryCategoryRepository from "../repositories/MachineryCategoryRepository.js";

const machineryCategoryRepository = new MachineryCategoryRepository();

export const createMachineryCategory = async (req, res, next) => {
  try {
    const createUseCase = new CreateMachineryCategory(machineryCategoryRepository);
    const category = await createUseCase.execute(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

// Cambiado a getMachineryCategories
export const getMachineryCategories = async (req, res, next) => {
  try {
    const getCategoriesUseCase = new GetMachineryCategories(machineryCategoryRepository);
    const categories = await getCategoriesUseCase.execute();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

// Cambiado a getMachineryCategoryById
export const getMachineryCategoryById = async (req, res, next) => {
  try {
    const getByIdUseCase = new GetMachineryCategoryById(machineryCategoryRepository);
    const category = await getByIdUseCase.execute(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoría de maquinaria no encontrada" });
    }

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// Cambiado a updateMachineryCategory
export const updateMachineryCategory = async (req, res, next) => {
  try {
    const updateUseCase = new UpdateMachineryCategory(machineryCategoryRepository);
    const updatedCategory = await updateUseCase.execute(
      req.params.id,
      req.body
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "No se encontró la categoría de maquinaria para actualizar" });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

// Cambiado a deleteMachineryCategory
export const deleteMachineryCategory = async (req, res, next) => {
  try {
    const deleteUseCase = new DeleteMachineryCategory(machineryCategoryRepository);
    const deletedCategory = await deleteUseCase.execute(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "No se encontró la categoría de maquinaria para eliminar" });
    }

    res.status(204).send(); 
  } catch (err) {
    next(err);
  }
};

// Cambiado a getMachineryCategoriesTable
export const getMachineryCategoriesTable = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";

    const getTableUseCase = new GetMachineryCategoriesTable(machineryCategoryRepository);
    const categories = await getTableUseCase.execute(page, limit, search);

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};