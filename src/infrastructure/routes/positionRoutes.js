import { Router } from "express";
import { createPosition, getPositions, getPositionById, updatePosition, deletePosition, getPositionsTable} from "../controllers/positionController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
const router = Router();

router.get("/table", authMiddleware, authorize('Listar Cargo'), getPositionsTable);
router.post("/", authMiddleware, authorize('Crear Cargo'), createPosition);
router.get("/", authMiddleware, authorize('Listar Cargo'), getPositions);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Cargo'), getPositionById);
router.put("/:id", authMiddleware, authorize('Editar Cargo'), updatePosition);
router.delete("/:id", authMiddleware, authorize('Eliminar Cargo'), deletePosition);



export default router;
