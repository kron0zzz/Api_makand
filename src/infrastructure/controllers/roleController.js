import RoleRepository from "../repositories/RoleRepository.js";
import CreateRole from "../../application/use-cases/roles/CreateRole.js";
import GetRoles from "../../application/use-cases/roles/GetRoles.js";
import GetRoleById from "../../application/use-cases/roles/GetRoleById.js";
import UpdateRole from "../../application/use-cases/roles/UpdateRole.js";
import DeleteRole from "../../application/use-cases/roles/DeleteRole.js";
import GetRolesTable from "../../application/use-cases/roles/GetRolesTable.js";

// Instanciamos el repositorio y los casos de uso aquí mismo (Singleton)
const roleRepository = new RoleRepository();
const createRoleUC = new CreateRole(roleRepository);
const getRolesUC = new GetRoles(roleRepository);
const getRoleByIdUC = new GetRoleById(roleRepository);
const updateRoleUC = new UpdateRole(roleRepository);
const deleteRoleUC = new DeleteRole(roleRepository);
const getRolesTableUC = new GetRolesTable(roleRepository);

// Exportamos funciones directas para que coincidan con lo que pide el router
export const createRole = async (req, res) => {
  try {
    const newRole = await createRoleUC.execute(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await getRolesUC.execute();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await getRoleByIdUC.execute(req.params.id);
    if (!role) return res.status(404).json({ error: "Rol no encontrado" });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const updatedRole = await updateRoleUC.execute(req.params.id, req.body);
    if (!updatedRole) return res.status(404).json({ error: "Rol no encontrado" });
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const deletedRole = await deleteRoleUC.execute(req.params.id);
    if (!deletedRole) return res.status(404).json({ error: "Rol no encontrado" });
    res.status(200).json({ message: "Rol eliminado con éxito", role: deletedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRolesTable = async (req, res) => {
  try {
    const tableData = await getRolesTableUC.execute();
    res.status(200).json(tableData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};