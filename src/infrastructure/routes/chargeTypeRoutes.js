import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import {
  createChargeType,
  getChargeTypes,
  getChargeTypesTable,
  getChargeTypeById,
  updateChargeType,
  deleteChargeType
} from "../controllers/chargeTypeController.js";

const router = Router();

// 2. PROTEGE LAS RUTAS
// Usamos authMiddleware para verificar sesión y authorize para verificar permisos
router.get("/table", authMiddleware, authorize('Listar Tipos de Cargo'), getChargeTypesTable); 
router.get("/", authMiddleware, authorize('Listar Tipos de Cargo'), getChargeTypes);
router.post("/", authMiddleware, authorize('Crear Tipos de Cargo'), createChargeType);
router.get("/:id", authMiddleware, authorize('Ver Detalle Tipos de Cargo'), getChargeTypeById);
router.put("/:id", authMiddleware, authorize('Editar Tipos de Cargo'), updateChargeType);
router.delete("/:id", authMiddleware, authorize('Eliminar Tipos de Cargo'), deleteChargeType);
export default router;