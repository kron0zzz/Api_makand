import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import {
  createProject,
  getProjects,
  getProjectsTable,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

const router = Router();

router.get("/table", authMiddleware, authorize('Listar Proyectos'), getProjectsTable);
router.post("/", authMiddleware, authorize('Crear Proyecto'), createProject);
router.get("/", authMiddleware, authorize('Listar Proyectos'), getProjects);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Proyecto'), getProjectById);
router.put("/:id", authMiddleware, authorize('Editar Proyecto'), updateProject);
router.delete("/:id", authMiddleware, authorize('Eliminar Proyecto'), deleteProject);

export default router;