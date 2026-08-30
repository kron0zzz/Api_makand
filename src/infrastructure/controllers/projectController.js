import CreateProject from "../../application/use-cases/projects/CreateProject.js";
import GetProjects from "../../application/use-cases/projects/GetProjects.js";
import GetProjectsTable from "../../application/use-cases/projects/GetProjectsTable.js";
import GetProjectById from "../../application/use-cases/projects/GetProjectById.js";
import UpdateProject from "../../application/use-cases/projects/UpdateProject.js";
import DeleteProject from "../../application/use-cases/projects/DeleteProject.js";

import ProjectRepositoryPrisma from "../repositories/ProjectRepositoryPrisma.js";

const projectRepository = new ProjectRepositoryPrisma();

export const createProject = async (req, res, next) => {
  try {
    const createProjectUseCase = new CreateProject(projectRepository);
    const project = await createProjectUseCase.execute(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const getProjectsUseCase = new GetProjects(projectRepository);
    const projects = await getProjectsUseCase.execute();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProjectsTable = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const getProjectsTableUseCase = new GetProjectsTable(projectRepository);
    const projects = await getProjectsTableUseCase.execute(page, limit, search);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const getProjectByIdUseCase = new GetProjectById(projectRepository);
    const project = await getProjectByIdUseCase.execute(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const updateProjectUseCase = new UpdateProject(projectRepository);
    const updatedProject = await updateProjectUseCase.execute(
      req.params.id,
      req.body
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "No se encontró el proyecto para actualizar" });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const deleteProjectUseCase = new DeleteProject(projectRepository);
    const deletedProject = await deleteProjectUseCase.execute(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ error: "No se encontró el proyecto para eliminar" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
