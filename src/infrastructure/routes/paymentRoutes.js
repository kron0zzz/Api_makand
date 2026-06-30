import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentsTable
} from "../controllers/paymentController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", authMiddleware, authorize('Crear Pago'), createPayment);
router.get("/", authMiddleware, authorize('Listar Pago'), getPayments);
router.get("/table", authMiddleware, authorize('Listar Pago en Tabla'), getPaymentsTable); //no está en la BD
router.get("/:id", authMiddleware, authorize('Ver Detalle de Pago'), getPaymentById);
router.put("/:id", authMiddleware, authorize('Editar Pago'), updatePayment);
router.delete("/:id", authMiddleware, authorize('Eliminar Pago'), deletePayment);

export default router;