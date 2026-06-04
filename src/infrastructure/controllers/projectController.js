import CreateProject from "../../application/use-cases/projects/CreateProject.js";
import GetProjects from "../../application/use-cases/projects/GetProjects.js";
import GetProjectsTable from "../../application/use-cases/projects/GetProjectsTable.js";
import GetProjectById from "../../application/use-cases/projects/GetProjectById.js";
import UpdateProject from "../../application/use-cases/projects/UpdateProject.js";
import DeleteProject from "../../application/use-cases/projects/DeleteProject.js";

import ProjectRepositoryPrisma from "../repositories/ProjectRepositoryPrisma.js";

const projectRepository = new ProjectRepositoryPrisma();

export const createProject = async (req, res) => {
  try {
    const createProjectUseCase = new CreateProject(projectRepository);
    const project = await createProjectUseCase.execute(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const getProjectsUseCase = new GetProjects(projectRepository);
    const projects = await getProjectsUseCase.execute();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectsTable = async (req, res) => {
  try {
    const getProjectsTableUseCase = new GetProjectsTable(projectRepository);
    const projects = await getProjectsTableUseCase.execute();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const getProjectByIdUseCase = new GetProjectById(projectRepository);
    const project = await getProjectByIdUseCase.execute(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleteProjectUseCase = new DeleteProject(projectRepository);
    const deletedProject = await deleteProjectUseCase.execute(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ error: "No se encontró el proyecto para eliminar" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};