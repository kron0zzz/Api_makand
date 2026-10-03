import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { 
  createMachineryStock, 
  getMachineryStocks, 
  getMachineryStockById, 
  updateMachineryStock, 
  deleteMachineryStock, 
  killMachineryStock,
  getMachineryStocksTable,
  getStockPdf,
  getLastSerialByMachineryId,
  getLastSerialGlobal,
  checkSerials,
  checkSerialsGlobal
} from "../controllers/machineryStockController.js"; 

const router = Router();


router.get("/table", authMiddleware, authorize('Listar Stock'), getMachineryStocksTable); 
router.post("/", authMiddleware, authorize('Crear Stock'), createMachineryStock);       
router.get("/", authMiddleware, authorize('Listar Stock'), getMachineryStocks);          

// rutas para obtener el serializado para regisrar compra
router.get("/last-serial/:machineryId", authMiddleware, authorize('Listar Stock'), getLastSerialByMachineryId);
router.get("/last-serial-global", authMiddleware, authorize('Listar Stock'), getLastSerialGlobal);
router.get("/check-serials/:machineryId", authMiddleware, authorize('Listar Stock'), checkSerials);
router.get("/check-serials-global", authMiddleware, authorize('Listar Stock'), checkSerialsGlobal);

router.get("/:id/pdf", authMiddleware, authorize('Ver Detalle de Stock'), getStockPdf);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Stock'), getMachineryStockById);    
router.put("/:id", authMiddleware, authorize('Editar Stock'), updateMachineryStock);   
router.delete("/:id", authMiddleware, authorize('Eliminar Stock'), deleteMachineryStock);

// dar de baja de maquinaria (motorizada y no motorizada)
router.patch("/:id/kill", authMiddleware, authorize('Editar Stock'), killMachineryStock);

export default router;