import { Router } from "express";
import { createSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier} from "../controllers/supplierController.js";

const router = Router();

router.post("/suppliers/", createSupplier);
router.get("/", getSuppliers);
router.get("/suppliers/:id", getSupplierById);
router.put("/suppliers/:id", updateSupplier);
router.delete("/suppliers/:id", deleteSupplier);

export default router;
