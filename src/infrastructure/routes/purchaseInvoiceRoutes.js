// src/infrastructure/routes/purchaseInvoiceRoutes.js
import { Router } from "express";
import { 
  createPurchaseInvoice, 
  getPurchaseInvoices, 
  getPurchaseInvoiceById, 
  updatePurchaseInvoice, 
  deletePurchaseInvoice, 
  getPurchaseInvoicesTable 
} from "../controllers/purchaseInvoiceController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

// Protegemos el endpoint con tu middleware de autenticación
router.use(authMiddleware);

router.get("/table", getPurchaseInvoicesTable);
router.post("/", createPurchaseInvoice);
router.get("/", getPurchaseInvoices);
router.get("/:id", getPurchaseInvoiceById);
router.put("/:id", updatePurchaseInvoice);
router.delete("/:id", deletePurchaseInvoice);

export default router;