import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { 
  createMachineryStatus, 
  getMachineryStatuses, 
  getMachineryStatusById, 
  updateMachineryStatus, 
  deleteMachineryStatus, 
  getMachineryStatusesTable 
} from "../controllers/machineryStatusController.js";

const router = Router();


router.get("/table", authMiddleware, authorize('Listar Estado de Maquinaria'), getMachineryStatusesTable); 
router.post("/", authMiddleware, authorize('Crear Estado de Maquinaria'), createMachineryStatus);       
router.get("/", authMiddleware, authorize('Listar Estado de Maquinaria'), getMachineryStatuses);          
router.get("/:id", authMiddleware, authorize('Ver Detalle de Estado de Maquinaria'), getMachineryStatusById);    
router.put("/:id", authMiddleware, authorize('Editar Estado de Maquinaria'), updateMachineryStatus);   
router.delete("/:id", authMiddleware, authorize('Eliminar Estado de Maquinaria'), deleteMachineryStatus);

export default router;