import { Router } from "express";
import { createSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier, getSuppliersTable} from "../controllers/supplierController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware)

router.post("/", createSupplier);
router.get("/", getSuppliers);
router.get("/table", getSuppliersTable);
router.get("/:id", getSupplierById);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);


export default router;
