import { Router } from "express";
import { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle, getVehiclesTable} from "../controllers/vehicleController.js";

const router = Router();

router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/table", getVehiclesTable);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
