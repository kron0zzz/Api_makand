import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { 
  createRole, 
  getRoles, 
  getRoleById, 
  updateRole, 
  deleteRole, 
  getRolesTable, 
  getPermissions, 
  getRoleByPermissions, 
  updateRolePermissions
} from "../controllers/roleController.js"; 

const router = Router();

// Rutas fijas
router.get("/table", authMiddleware, authorize('Listar Rol'), getRolesTable);
router.get("/permissions/list", authMiddleware, authorize('Listar Rol'), getPermissions);

// Rutas dinámicas
router.put("/:id/permissions", authMiddleware, authorize('Editar Rol'), updateRolePermissions);
router.get("/:id/permissions", authMiddleware, authorize('Ver Detalle de Rol'), getRoleByPermissions);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Rol'), getRoleById);

// Acciones generales
router.post("/", authMiddleware, authorize('Crear Rol'), createRole);
router.get("/", authMiddleware, authorize('Listar Rol'), getRoles);
router.put("/:id", authMiddleware, authorize('Editar Rol'), updateRole);
router.delete("/:id", authMiddleware, authorize('Eliminar Rol'), deleteRole);

export default router;