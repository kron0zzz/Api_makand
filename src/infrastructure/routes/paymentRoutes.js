

import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { createPayment, getPayments, getPaymentById, updatePayment, deletePayment, getPaymentsTable, getPaymentsByOrderId } from "../controllers/paymentController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", authorize('Crear Pago'), createPayment);
router.get("/", authorize('Listar Pago'), getPayments);
router.get("/table", authorize('Listar Pago en Tabla'), getPaymentsTable);
router.get("/:id", authorize('Ver Detalle de Pago'), getPaymentById);
router.get("/order/:id", authorize('Listar Pagos por Orden'), getPaymentsByOrderId); // Nueva ruta
router.put("/:id", authorize('Editar Pago'), updatePayment);
router.delete("/:id", authorize('Eliminar Pago'), deletePayment);

export default router;