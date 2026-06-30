import { Router } from "express";
import { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle, getVehiclesTable} from "../controllers/vehicleController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import  authorize  from '../../middlewares/authorize.js';

const router = Router();

router.post("/", authMiddleware, authorize('Crear Vehículo'), createVehicle);
router.get("/", authMiddleware, authorize('Listar Vehículo'), getVehicles);
router.get("/table", authMiddleware, authorize('Listar Vehículo'), getVehiclesTable);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Vehículo'), getVehicleById);
router.put("/:id", authMiddleware, authorize('Editar Vehículo'), updateVehicle);
router.delete("/:id", authMiddleware, authorize('Eliminar Vehículo'), deleteVehicle);

export default router;
