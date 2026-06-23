import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, getOrdersTable, createCompleteOrder, getOrderFull} from "../controllers/orderController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import  authorize  from '../../middlewares/authorize.js';

const router = Router();

router.use(authMiddleware)

router.post("/", authMiddleware, authorize('Crear Orden'), createOrder);
router.get("/", authMiddleware, authorize('Listar Ordenes'), getOrders);
router.get("/table", authMiddleware, authorize('Listar Ordenes en Tabla'), getOrdersTable);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Orden'), getOrderById);
router.get("/:id/full", authMiddleware, authorize('Ver Detalle Completo de Orden'), getOrderFull);
router.put("/:id", authMiddleware, authorize('Editar Orden'), updateOrder);
router.delete("/:id", authMiddleware, authorize('Eliminar Orden'), deleteOrder);
router.post("/complete", authMiddleware, authorize('Crear Orden Completa'), createCompleteOrder);


export default router;
