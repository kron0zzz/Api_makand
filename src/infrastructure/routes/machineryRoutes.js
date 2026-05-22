import { Router } from "express";
import { 
  createMachinery, 
  getMachineries, 
  getMachineryById, 
  updateMachinery, 
  deleteMachinery, 
  getMachineriesTable 
} from "../controllers/machineryController.js";

const router = Router();

router.post("/", createMachinery);
router.get("/", getMachineries);
router.get("/table", getMachineriesTable); // Recuerda poner esta ruta antes de la que tiene :id
router.get("/:id", getMachineryById);
router.put("/:id", updateMachinery);
router.delete("/:id", deleteMachinery);

export default router;