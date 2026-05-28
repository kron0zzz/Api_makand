import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectsTable,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

const router = Router();

router.get("/table", getProjectsTable);
router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;