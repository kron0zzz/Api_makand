import { Router } from "express";
import { 
  createMachineryStatus, 
  getMachineryStatuses, 
  getMachineryStatusById, 
  updateMachineryStatus, 
  deleteMachineryStatus, 
  getMachineryStatusesTable 
} from "../controllers/machineryStatusController.js";

const router = Router();


router.get("/table", getMachineryStatusesTable); 
router.post("/", createMachineryStatus);       
router.get("/", getMachineryStatuses);          
router.get("/:id", getMachineryStatusById);    
router.put("/:id", updateMachineryStatus);   
router.delete("/:id", deleteMachineryStatus);

export default router;