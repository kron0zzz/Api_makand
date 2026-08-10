import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import {
  createAdditionalCharge,
  getAdditionalCharges,
  getAdditionalChargesTable,
  getAdditionalChargeById,
  updateAdditionalCharge,
  deleteAdditionalCharge
} from "../controllers/additionalChargeController.js";

const router = Router();

router.get("/table", authMiddleware, authorize('Listar Cobro Adicional'), getAdditionalChargesTable); 
router.get("/", authMiddleware, authorize('Listar Cobro Adicional'), getAdditionalCharges);
router.post("/", authMiddleware, authorize('Crear Cobro Adicional'), createAdditionalCharge);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Cobro Adicional'), getAdditionalChargeById);
router.put("/:id", authMiddleware, authorize('Editar Cobro Adicional'), updateAdditionalCharge);
router.delete("/:id", authMiddleware, authorize('Eliminar Cobro Adicional'), deleteAdditionalCharge);

export default router;