
import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, getOrdersTable, createCompleteOrder, getOrderFull, getOrderWorkspace, cancelOrder, closeOrder, getOrderInvoicePdf } from "../controllers/orderController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from '../../middlewares/authorize.js';

const router = Router();

router.use(authMiddleware);

router.post("/", authorize('Crear Orden'), createOrder);
router.get("/", authorize('Listar Orden'), getOrders);
router.get("/table", authorize('Listar Ordenes en Tabla'), getOrdersTable);
router.get("/:id/invoice", authorize('Ver Detalle de Orden'), getOrderInvoicePdf); // Generar factura PDF - DEBE IR ANTES DE /:id
router.get("/:id/full", authorize('Ver Detalle Completo de Orden'), getOrderFull);
router.get("/:id/workspace", authorize('Ver Workspace de Orden'), getOrderWorkspace); // Nueva ruta
router.get("/:id", authorize('Ver Detalle de Orden'), getOrderById);
router.put("/:id/cancel", authorize('Anular Orden'), cancelOrder);
router.put("/:id/close", authorize('Cerrar Orden'), closeOrder);
router.put("/:id", authorize('Editar Orden'), updateOrder);
router.delete("/:id", authorize('Eliminar Orden'), deleteOrder);
router.post("/complete", authorize('Crear Orden Completa'), createCompleteOrder);

export default router;
