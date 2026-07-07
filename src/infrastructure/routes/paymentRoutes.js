import { Router } from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentsTable,
  getPaymentsByOrderId
} from "../controllers/paymentController.js";

import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createPayment);
router.get("/", getPayments);
router.get("/table", getPaymentsTable);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);
router.get("/order/:id", getPaymentsByOrderId);

export default router;