import { Router } from "express";
import {
  createMaintenance,
  getMaintenances,
  getMaintenancesTable,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance
} from "../controllers/maintenanceController.js";

const router = Router();

router.get("/table", getMaintenancesTable);
router.post("/", createMaintenance);
router.get("/", getMaintenances);
router.get("/:id", getMaintenanceById);
router.put("/:id", updateMaintenance);
router.delete("/:id", deleteMaintenance);

export default router;