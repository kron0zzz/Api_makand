import RoleRepository from "../repositories/RoleRepository.js";
import CreateRole from "../../application/use-cases/roles/CreateRole.js";
import GetRoles from "../../application/use-cases/roles/GetRoles.js";
import GetRoleById from "../../application/use-cases/roles/GetRoleById.js";
import UpdateRole from "../../application/use-cases/roles/UpdateRole.js";
import DeleteRole from "../../application/use-cases/roles/DeleteRole.js";
import GetRolesTable from "../../application/use-cases/roles/GetRolesTable.js";
import GetPermissions from "../../application/use-cases/roles/GetPermissions.js";
import GetRolePermissions from "../../application/use-cases/roles/GetRolePermissions.js";


const roleRepository = new RoleRepository();
const createRoleUC = new CreateRole(roleRepository);
const getRolesUC = new GetRoles(roleRepository);
const getRoleByIdUC = new GetRoleById(roleRepository);
const updateRoleUC = new UpdateRole(roleRepository);
const deleteRoleUC = new DeleteRole(roleRepository);
const getRolesTableUC = new GetRolesTable(roleRepository);
const getPermissionsUC = new GetPermissions(roleRepository);
const getRolePermissionsUC = new GetRolePermissions(roleRepository);


export const createRole = async (req, res, next) => {
  try {
    const newRole = await createRoleUC.execute(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (req, res, next) => {
  try {
    const roles = await getRolesUC.execute();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (req, res, next) => {
  try {
    const role = await getRoleByIdUC.execute(req.params.id);
    if (!role) return res.status(404).json({ error: "Rol no encontrado" });
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const updatedRole = await updateRoleUC.execute(req.params.id, req.body);
    res.status(200).json(updatedRole);
  } catch (error) {
    next(error);
  }
};

export const updateRolePermissions = async (req, res, next) => {
  try {
    const updatedRole = await updateRoleUC.execute(req.params.id, req.body);
    res.status(200).json({ message: "Permisos actualizados", role: updatedRole });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const deletedRole = await deleteRoleUC.execute(req.params.id);
    if (!deletedRole) return res.status(404).json({ error: "Rol no encontrado" });
    res.status(200).json({ message: "Rol eliminado con éxito", role: deletedRole });
  } catch (error) {
    next(error);
  }
};

export const getRolesTable = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const tableData = await getRolesTableUC.execute(page, limit, search);
    res.status(200).json(tableData);
  } catch (error) {
    next(error);
  }
};

export const getPermissions = async (req, res, next) => {
  try {
    const permissions = await getPermissionsUC.execute();
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};

export const getRoleByPermissions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const permissions = await getRolePermissionsUC.execute(id);
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};