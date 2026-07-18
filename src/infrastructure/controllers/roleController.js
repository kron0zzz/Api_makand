export const updateRole = async (req, res) => {
  try {
    const updatedRole = await updateRoleUC.execute(req.params.id, req.body);
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