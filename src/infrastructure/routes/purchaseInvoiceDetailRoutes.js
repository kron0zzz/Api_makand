import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";

import { 
  createPurchaseInvoiceDetail, 
  getPurchaseInvoiceDetails, 
  getPurchaseInvoiceDetailById, 
  updatePurchaseInvoiceDetail, 
  deletePurchaseInvoiceDetail, 
  getPurchaseInvoiceDetailsTable 
} from "../controllers/purchaseInvoiceDetailController.js";

const router = Router();

router.use(authMiddleware);

router.get("/table", authMiddleware, authorize('Listar Detalle de Factura de Compra'), getPurchaseInvoiceDetailsTable);
router.post("/", authMiddleware, authorize('Crear Detalle de Factura de Compra'), createPurchaseInvoiceDetail);
router.get("/", authMiddleware, authorize('Listar Detalle de Factura de Compra'), getPurchaseInvoiceDetails);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Detalle de Factura de Compra'), getPurchaseInvoiceDetailById);
router.put("/:id", authMiddleware, authorize('Editar Detalle de Factura de Compra'), updatePurchaseInvoiceDetail);
router.delete("/:id", authMiddleware, authorize('Eliminar Detalle de Factura de Compra'), deletePurchaseInvoiceDetail);

export default router;
