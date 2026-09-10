import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";

import {
  createMachinery,
  createMachineryComplete,
  getMachineries,
  getMachineryById,
  updateMachinery,
  deleteMachinery,
  getMachineriesTable
} from "../controllers/machineryController.js";

const router = Router();


router.get("/table", authMiddleware, authorize('Listar Maquinaria'), getMachineriesTable); 
router.get("/", authMiddleware, authorize('Listar Maquinaria'), getMachineries);
router.post("/", authMiddleware, authorize('Crear Maquinaria'), createMachinery);
router.post("/complete", authMiddleware, authorize('Crear Maquinaria'), createMachineryComplete);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Maquinaria'), getMachineryById);
router.put("/:id", authMiddleware, authorize('Editar Maquinaria'), updateMachinery);
router.delete("/:id", authMiddleware, authorize('Eliminar Maquinaria'), deleteMachinery);

export default router;