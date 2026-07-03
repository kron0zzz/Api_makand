import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { 
  createRole, 
  getRoles, 
  getRoleById, 
  updateRole, 
  deleteRole, 
  getRolesTable 
} from "../controllers/roleController.js"; 

const router = Router();

router.post("/", authMiddleware, authorize('Crear Rol'), createRole); 
router.delete("/:id", authMiddleware, authorize('Eliminar Rol'), deleteRole);
router.put("/:id", authMiddleware, authorize('Editar Rol'), updateRole);
router.get("/table", authMiddleware, authorize('Listar Rol'), getRolesTable); 
router.get("/", authMiddleware, authorize('Listar Rol'), getRoles);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Rol'), getRoleById);

export default router;