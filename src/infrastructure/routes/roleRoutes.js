import { Router } from "express";
import { 
  createRole, 
  getRoles, 
  getRoleById, 
  updateRole, 
  deleteRole, 
  getRolesTable 
} from "../controllers/roleController.js"; 

const router = Router();

// 1. LAS RUTAS ESTÁTICAS PRIMERO
router.get("/table", getRolesTable); 

// 2. RUTAS DE COLECCIÓN
router.post("/", createRole);       
router.get("/", getRoles);          

// 3. RUTAS DINÁMICAS (CON PARÁMETROS) AL FINAL
router.get("/:id", getRoleById);    
router.put("/:id", updateRole);   
router.delete("/:id", deleteRole);

export default router;