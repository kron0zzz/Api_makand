import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import {
  createReturn,
  getReturns,
  getReturnById,
  updateReturn,
  deleteReturn,
  getReturnsTable
} from "../controllers/returnController.js";


const router = Router();

router.use(authMiddleware);

router.post("/", authMiddleware, authorize('Crear Devolución'), createReturn);
router.get("/", authMiddleware, authorize('Listar Devoluciones'), getReturns);
router.get("/table", authMiddleware, authorize('Listar Devoluciones'), getReturnsTable);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Devolución'), getReturnById);
router.put("/:id", authMiddleware, authorize('Editar Devolución'), updateReturn);
router.delete("/:id", authMiddleware, authorize('Eliminar Devolución'), deleteReturn);

export default router;