import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import {
  createMaintenance,
  getMaintenances,
  getMaintenancesTable,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance
} from "../controllers/maintenanceController.js";

const router = Router();

router.get("/table", authMiddleware, authorize('Listar Mantenimientos'), getMaintenancesTable);
router.post("/", authMiddleware, authorize('Crear Mantenimiento'), createMaintenance);
router.get("/", authMiddleware, authorize('Listar Mantenimientos'), getMaintenances);
router.get("/:id", authMiddleware, authorize('Ver Detalle Mantenimiento'), getMaintenanceById);
router.put("/:id", authMiddleware, authorize('Editar Mantenimiento'), updateMaintenance);
router.delete("/:id", authMiddleware, authorize('Eliminar Mantenimiento'), deleteMaintenance);

export default router;