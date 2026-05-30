import { Router } from "express";
import { 
  createMachineryCategory, 
  getMachineryCategories, 
  getMachineryCategoryById, 
  updateMachineryCategory, 
  deleteMachineryCategory, 
  getMachineryCategoriesTable 
} from "../controllers/machineryCategoryController.js"; 

const router = Router();

// 1. LAS RUTAS ESTÁTICAS PRIMERO
router.get("/table", getMachineryCategoriesTable); 

// 2. RUTAS DE COLECCIÓN
router.post("/", createMachineryCategory);       
router.get("/", getMachineryCategories);          

// 3. RUTAS DINÁMICAS (CON PARÁMETROS) AL FINAL
router.get("/:id", getMachineryCategoryById);    
router.put("/:id", updateMachineryCategory);   
router.delete("/:id", deleteMachineryCategory);

export default router;