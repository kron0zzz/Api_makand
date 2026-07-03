import { Router } from "express";
import {
  createRentalCut,
  getRentalCuts,
  getRentalCutById,
  updateRentalCut,
  deleteRentalCut,
  getRentalCutsTable,
  getRentalCutByOrderId
} from "../controllers/rentalCutController.js";

import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createRentalCut);
router.get("/", getRentalCuts);
router.get("/table", getRentalCutsTable);
router.get("/:id", getRentalCutById);
router.put("/:id", updateRentalCut);
router.delete("/:id", deleteRentalCut);
router.get("/order/:id", getRentalCutByOrderId);

export default router;