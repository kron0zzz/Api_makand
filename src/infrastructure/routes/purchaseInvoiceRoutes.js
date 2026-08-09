import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";

import { 
  createPurchaseInvoice, 
  createPurchaseComplete,
  getPurchaseInvoices, 
  getPurchaseInvoiceById, 
  updatePurchaseInvoice, 
  deletePurchaseInvoice, 
  getPurchaseInvoicesTable 
} from "../controllers/purchaseInvoiceController.js";

const router = Router();

// Protegemos el endpoint con tu middleware de autenticación
router.use(authMiddleware);

router.post("/complete", authMiddleware, authorize('Crear Factura de Compra Completa'), createPurchaseComplete);
router.post("/", authMiddleware, authorize('Crear Factura de Compra'), createPurchaseInvoice);
router.get("/table", authMiddleware, authorize('Listar Factura de Compra'), getPurchaseInvoicesTable);
router.get("/", authMiddleware, authorize('Listar Factura de Compra'), getPurchaseInvoices);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Factura de Compra'), getPurchaseInvoiceById);
router.put("/:id", authMiddleware, authorize('Editar Factura de Compra'), updatePurchaseInvoice);
router.delete("/:id", authMiddleware, authorize('Eliminar Factura de Compra'), deletePurchaseInvoice);

export default router;