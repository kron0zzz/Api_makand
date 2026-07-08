import { Router } from "express";
import { createSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier, getSuppliersTable} from "../controllers/supplierController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import  authorize  from '../../middlewares/authorize.js';


const router = Router();

router.use(authMiddleware)

router.post("/", authMiddleware, authorize('Crear Proveedor'), createSupplier);
router.get("/", authMiddleware, authorize('Listar Proveedor'), getSuppliers);
router.get("/table", authMiddleware, authorize('Listar Proveedor'), getSuppliersTable);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Proveedor'), getSupplierById);
router.put("/:id", authMiddleware, authorize('Editar Proveedor'), updateSupplier);
router.delete("/:id", authMiddleware, authorize('Eliminar Proveedor'), deleteSupplier);

export default router;
