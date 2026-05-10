import { Router } from "express";
import { createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase} from "../controllers/purchaseController.js";

const router = Router();

router.post("/purchase/", createPurchase);
router.get("/purchases/", getPurchases);
router.get("/purchases/:id", getPurchaseById);
router.put("/purchases/:id", updatePurchase);
router.delete("/purchases/:id", deletePurchase);

export default router;
