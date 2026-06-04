import { Router } from "express";
import {
  createChargeType,
  getChargeTypes,
  getChargeTypesTable,
  getChargeTypeById,
  updateChargeType,
  deleteChargeType
} from "../controllers/chargeTypeController.js";

const router = Router();

router.get("/table", getChargeTypesTable);
router.post("/", createChargeType);
router.get("/", getChargeTypes);
router.get("/:id", getChargeTypeById);
router.put("/:id", updateChargeType);
router.delete("/:id", deleteChargeType);

export default router;