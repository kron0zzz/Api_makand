import { Router } from "express";
import { createPosition, getPositions, getPositionById, updatePosition, deletePosition} from "../controllers/positionController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
const router = Router();

router.post("/", authMiddleware, authorize('Crear Posición'), createPosition);
router.get("/", authMiddleware, authorize('Listar Posiciones'), getPositions);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Posición'), getPositionById);
router.put("/:id", authMiddleware, authorize('Editar Posición'), updatePosition);
router.delete("/:id", authMiddleware, authorize('Eliminar Posición'), deletePosition);


export default router;
