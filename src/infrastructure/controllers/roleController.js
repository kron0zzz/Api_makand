// import RoleRepository from "../repositories/RoleRepository.js";
// import CreateRole from "../../application/use-cases/roles/CreateRole.js";
// import GetRoles from "../../application/use-cases/roles/GetRoles.js";
// import GetRoleById from "../../application/use-cases/roles/GetRoleById.js";
// import UpdateRole from "../../application/use-cases/roles/UpdateRole.js";
// import DeleteRole from "../../application/use-cases/roles/DeleteRole.js";
// import GetRolesTable from "../../application/use-cases/roles/GetRolesTable.js";
// import GetPermissions from "../../application/use-cases/roles/GetPermissions.js"; 
// import GetRolePermissions from "../../application/use-cases/roles/GetRolePermissions.js";

// const roleRepository = new RoleRepository();
// const createRoleUC = new CreateRole(roleRepository);
// const getRolesUC = new GetRoles(roleRepository);
// const getRoleByIdUC = new GetRoleById(roleRepository);
// const updateRoleUC = new UpdateRole(roleRepository);
// const deleteRoleUC = new DeleteRole(roleRepository);
// const getRolesTableUC = new GetRolesTable(roleRepository);
// const getPermissionsUC = new GetPermissions(roleRepository);
// const getRolePermissionsUC = new GetRolePermissions(roleRepository);

// // Exportamos funciones directas para que coincidan con lo que pide el router
// export const createRole = async (req, res) => {
//   try {
//     const newRole = await createRoleUC.execute(req.body);
//     res.status(201).json(newRole);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getRoles = async (req, res) => {
//   try {
//     const roles = await getRolesUC.execute();
//     res.status(200).json(roles);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getRoleById = async (req, res) => {
//   try {
//     const role = await getRoleByIdUC.execute(req.params.id);
//     if (!role) return res.status(404).json({ error: "Rol no encontrado" });
//     res.status(200).json(role);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const updateRole = async (req, res) => {
//   try {
//     const updatedRole = await updateRoleUC.execute(req.params.id, req.body);
//     if (!updatedRole) return res.status(404).json({ error: "Rol no encontrado" });
//     res.status(200).json(updatedRole);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const deleteRole = async (req, res) => {
//   try {
//     const deletedRole = await deleteRoleUC.execute(req.params.id);
//     if (!deletedRole) return res.status(404).json({ error: "Rol no encontrado" });
//     res.status(200).json({ message: "Rol eliminado con éxito", role: deletedRole });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getRolesTable = async (req, res) => {
//   try {
//     const tableData = await getRolesTableUC.execute();
//     res.status(200).json(tableData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getPermissions = async (req, res) => {
//   try {
//     const permissions = await getPermissionsUC.execute();
//     res.status(200).json(permissions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getRoleByPermissions = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("DEBUG: Petición recibida para Rol ID:", id); // Veremos si llega
    
//     const permissions = await getRolePermissionsUC.execute(id);
//     console.log("DEBUG: Permisos encontrados:", permissions); // Veremos qué devuelve la BD

//     console.log("DEBUG: Parámetros recibidos en req.params:", req.params);
    
//     res.status(200).json(permissions);
//   } catch (error) {
//     console.error("DEBUG: ERROR CRÍTICO EN CONTROLADOR:", error); // Veremos el error real
//     res.status(500).json({ error: error.message });
//   }
// };



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

// Esta es la función nueva que tu router necesita para el PUT /:id/permissions
export const updateRolePermissions = async (req, res) => {
  try {
    // Reutilizamos el mismo updateRoleUC porque tu repositorio 
    // ya maneja la lógica de limpiar y reinsertar permisos en el método update
    const updatedRole = await updateRoleUC.execute(req.params.id, req.body);
    res.status(200).json({ message: "Permisos actualizados", role: updatedRole });
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

export const getPermissions = async (req, res) => {
  try {
    const permissions = await getPermissionsUC.execute();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoleByPermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const permissions = await getRolePermissionsUC.execute(id);
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};