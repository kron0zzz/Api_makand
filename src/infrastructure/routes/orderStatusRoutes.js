import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import {
  createOrderStatus,
  getOrderStatuss,
  getOrderStatussTable,
  getOrderStatusById,
  updateOrderStatus,
  deleteOrderStatus
} from "../controllers/orderStatusController.js";

const router = Router();

router.get("/table", authMiddleware, authorize('Listar Estado de Orden'), getOrderStatussTable);
router.post("/", authMiddleware, authorize('Crear Estado de Orden'), createOrderStatus);
router.get("/", authMiddleware, authorize('Listar Estado de Orden'), getOrderStatuss);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Estado de Orden'), getOrderStatusById);
router.put("/:id", authMiddleware, authorize('Editar Estado de Orden'), updateOrderStatus);
router.delete("/:id", authMiddleware, authorize('Eliminar Estado de Orden'), deleteOrderStatus);

export default router;