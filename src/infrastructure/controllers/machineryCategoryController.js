// import CreateMachineCategory from "../../application/use-cases/machinery_categories/CreateMachineryCategory.js";
// import GetMachineCategories from "../../application/use-cases/machinery_categories/GetMachineryCategories.js";
// import GetMachineCategoryById from "../../application/use-cases/machinery_categories/GetMachineryCategoryById.js";
// import UpdateMachineCategory from "../../application/use-cases/machinery_categories/UpdateMachineryCategory.js";
// import DeleteMachineCategory from "../../application/use-cases/machinery_categories/DeleteMachineryCategory.js";
// import GetMachineCategoriesTable from "../../application/use-cases/machinery_categories/GetMachineryCategoriesTable.js";

// import MachineryCategoryRepository from "../repositories/MachineryCategoryRepository.js";

// const machineryCategoryRepository = new MachineryCategoryRepository();

// export const createMachineCategory = async (req, res) => {
//   try {
//     const createUseCase = new CreateMachineryCategory(machineryCategoryRepository);
//     const category = await createUseCase.execute(req.body);
//     res.status(201).json(category);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getMachineCategories = async (req, res) => {
//   try {
//     const getCategoriesUseCase = new GetMachineryCategories(machineryCategoryRepository);
//     const categories = await getCategoriesUseCase.execute();
//     res.status(200).json(categories);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getMachineCategoryById = async (req, res) => {
//   try {
//     const getByIdUseCase = new GetMachineryCategoryById(machineryCategoryRepository);
//     const category = await getByIdUseCase.execute(req.params.id);

//     if (!category) {
//       return res.status(404).json({ error: "Categoría de maquinaria no encontrada" });
//     }

//     res.status(200).json(category);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const updateMachineCategory = async (req, res) => {
//   try {
//     console.log("DATOS PARA ACTUALIZAR CATEGORÍA DE MAQUINARIA:", req.body);
//     const updateUseCase = new UpdateMachineryCategory(machineryCategoryRepository);
//     const updatedCategory = await updateUseCase.execute(
//       req.params.id,
//       req.body
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({ error: "No se encontró la categoría de maquinaria para actualizar" });
//     }

//     res.status(200).json(updatedCategory);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const deleteMachineCategory = async (req, res) => {
//   try {
//     const deleteUseCase = new DeleteMachineryCategory(machineryCategoryRepository);
//     const deletedCategory = await deleteUseCase.execute(req.params.id);

//     if (!deletedCategory) {
//       return res.status(404).json({ error: "No se encontró la categoría de maquinaria para eliminar" });
//     }

//     res.status(204).send(); 
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getMachineCategoriesTable = async (req, res) => {
//   try {
//     const getTableUseCase = new GetMachineryCategoriesTable(machineryCategoryRepository);
//     const categories = await getTableUseCase.execute();
//     res.status(200).json(categories);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };













import CreateMachineryCategory from "../../application/use-cases/machinery_categories/CreateMachineryCategory.js";
import GetMachineryCategories from "../../application/use-cases/machinery_categories/GetMachineryCategories.js";
import GetMachineryCategoryById from "../../application/use-cases/machinery_categories/GetMachineryCategoryById.js";
import UpdateMachineryCategory from "../../application/use-cases/machinery_categories/UpdateMachineryCategory.js";
import DeleteMachineryCategory from "../../application/use-cases/machinery_categories/DeleteMachineryCategory.js";
import GetMachineryCategoriesTable from "../../application/use-cases/machinery_categories/GetMachineryCategoriesTable.js";

import MachineryCategoryRepository from "../repositories/MachineryCategoryRepository.js";

const machineryCategoryRepository = new MachineryCategoryRepository();

// Cambiado a createMachineryCategory
export const createMachineryCategory = async (req, res) => {
  try {
    const createUseCase = new CreateMachineryCategory(machineryCategoryRepository);
    const category = await createUseCase.execute(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a getMachineryCategories
export const getMachineryCategories = async (req, res) => {
  try {
    const getCategoriesUseCase = new GetMachineryCategories(machineryCategoryRepository);
    const categories = await getCategoriesUseCase.execute();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a getMachineryCategoryById
export const getMachineryCategoryById = async (req, res) => {
  try {
    const getByIdUseCase = new GetMachineryCategoryById(machineryCategoryRepository);
    const category = await getByIdUseCase.execute(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoría de maquinaria no encontrada" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a updateMachineryCategory
export const updateMachineryCategory = async (req, res) => {
  try {
    console.log("DATOS PARA ACTUALIZAR CATEGORÍA DE MAQUINARIA:", req.body);
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
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a deleteMachineryCategory
export const deleteMachineryCategory = async (req, res) => {
  try {
    const deleteUseCase = new DeleteMachineryCategory(machineryCategoryRepository);
    const deletedCategory = await deleteUseCase.execute(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "No se encontró la categoría de maquinaria para eliminar" });
    }

    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiado a getMachineryCategoriesTable
export const getMachineryCategoriesTable = async (req, res) => {
  try {
    const getTableUseCase = new GetMachineryCategoriesTable(machineryCategoryRepository);
    const categories = await getTableUseCase.execute();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};