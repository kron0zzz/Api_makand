// import { Router } from "express";
// import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, getOrdersTable, createCompleteOrder, getOrderFull} from "../controllers/orderController.js";
// import authMiddleware from "../../middlewares/authMiddleware.js";
// import  authorize  from '../../middlewares/authorize.js';

// const router = Router();

// router.use(authMiddleware)

// router.post("/", authMiddleware, authorize('Crear Orden'), createOrder);
// router.get("/", authMiddleware, authorize('Listar Orden'), getOrders);
// router.get("/table", authMiddleware, authorize('Listar Ordenes en Tabla'), getOrdersTable); //no está en la BD
// router.get("/:id", authMiddleware, authorize('Ver Detalle de Orden'), getOrderById);
// router.get("/:id/full", authMiddleware, authorize('Ver Detalle Completo de Orden'), getOrderFull); //no está en la BD
// router.put("/:id", authMiddleware, authorize('Editar Orden'), updateOrder);
// router.delete("/:id", authMiddleware, authorize('Eliminar Orden'), deleteOrder);
// router.post("/complete", authMiddleware, authorize('Crear Orden Completa'), createCompleteOrder); //no está en la BD


// export default router;


import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, getOrdersTable, createCompleteOrder, getOrderFull, getOrderWorkspace } from "../controllers/orderController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from '../../middlewares/authorize.js';

const router = Router();

router.use(authMiddleware);

router.post("/", authorize('Crear Orden'), createOrder);
router.get("/", authorize('Listar Orden'), getOrders);
router.get("/table", authorize('Listar Ordenes en Tabla'), getOrdersTable);
router.get("/:id", authorize('Ver Detalle de Orden'), getOrderById);
router.get("/:id/full", authorize('Ver Detalle Completo de Orden'), getOrderFull);
router.get("/:id/workspace", authorize('Ver Workspace de Orden'), getOrderWorkspace); // Nueva ruta
router.put("/:id", authorize('Editar Orden'), updateOrder);
router.delete("/:id", authorize('Eliminar Orden'), deleteOrder);
router.post("/complete", authorize('Crear Orden Completa'), createCompleteOrder);

export default router;