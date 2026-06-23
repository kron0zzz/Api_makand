import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { 
  createMachineryCategory, 
  getMachineryCategories, 
  getMachineryCategoryById, 
  updateMachineryCategory, 
  deleteMachineryCategory, 
  getMachineryCategoriesTable 
} from "../controllers/machineryCategoryController.js"; 

const router = Router();


router.get("/table", authMiddleware, authorize('Listar Categorías de Maquinaria'), getMachineryCategoriesTable); 
router.post("/", authMiddleware, authorize('Crear Categoría de Maquinaria'), createMachineryCategory);       
router.get("/", authMiddleware, authorize('Listar Categorías de Maquinaria'), getMachineryCategories);          
router.get("/:id", authMiddleware, authorize('Ver Detalle Categoría de Maquinaria'), getMachineryCategoryById);    
router.put("/:id", authMiddleware, authorize('Editar Categoría de Maquinaria'), updateMachineryCategory);   
router.delete("/:id", authMiddleware, authorize('Eliminar Categoría de Maquinaria'), deleteMachineryCategory);

export default router;