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
router.get("/table", authMiddleware, authorize('Listar Tipo de Cargo'), getChargeTypesTable); 
router.get("/", authMiddleware, authorize('Listar Tipo de Cargo'), getChargeTypes);
router.post("/", authMiddleware, authorize('Crear Tipo de Cargo'), createChargeType);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Tipo de Cargo'), getChargeTypeById);
router.put("/:id", authMiddleware, authorize('Editar Tipo de Cargo'), updateChargeType);
router.delete("/:id", authMiddleware, authorize('Eliminar Tipo de Cargo'), deleteChargeType);export default router;