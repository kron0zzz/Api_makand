import { Router } from "express";
import { createOrder_detail, getOrder_details, getOrder_detailById, updateOrder_detail, deleteOrder_detail, getOrder_detailsTable} from "../controllers/order_detailController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import  authorize  from '../../middlewares/authorize.js';

const router = Router();

router.use(authMiddleware)

router.post("/", authMiddleware, authorize('Crear Detalle de Orden'), createOrder_detail);
router.get("/", authMiddleware, authorize('Listar Detalles de Orden'), getOrder_details);
router.get("/table", authMiddleware, authorize('Listar Detalles de Orden en Tabla'), getOrder_detailsTable);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Orden'), getOrder_detailById);
router.put("/:id", authMiddleware, authorize('Editar Detalle de Orden'), updateOrder_detail);
router.delete("/:id", authMiddleware, authorize('Eliminar Detalle de Orden'), deleteOrder_detail);


export default router;
