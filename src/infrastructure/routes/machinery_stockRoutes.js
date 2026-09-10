import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { 
  createMachineryStock, 
  getMachineryStocks, 
  getMachineryStockById, 
  updateMachineryStock, 
  deleteMachineryStock, 
  getMachineryStocksTable,
  getStockPdf
} from "../controllers/machineryStockController.js"; 

const router = Router();


router.get("/table", authMiddleware, authorize('Listar Stock'), getMachineryStocksTable); 
router.post("/", authMiddleware, authorize('Crear Stock'), createMachineryStock);       
router.get("/", authMiddleware, authorize('Listar Stock'), getMachineryStocks);          
router.get("/:id/pdf", authMiddleware, authorize('Ver Detalle de Stock'), getStockPdf);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Stock'), getMachineryStockById);    
router.put("/:id", authMiddleware, authorize('Editar Stock'), updateMachineryStock);   
router.delete("/:id", authMiddleware, authorize('Eliminar Stock'), deleteMachineryStock);

export default router;