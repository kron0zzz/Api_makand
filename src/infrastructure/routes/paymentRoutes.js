import { Router } from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentsTable
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

export default router;