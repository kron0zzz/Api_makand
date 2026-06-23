const authorize = (requiredPermission) => {
  return (req, res, next) => {
    // Obtenemos los permisos del usuario desde el token (que ya decodificamos en el authMiddleware)
    const userPermissions = req.user.permissions;

    // Verificamos si el permiso requerido está en la lista del usuario
    if (userPermissions && userPermissions.includes(requiredPermission)) {
      next(); // ¡Tiene permiso! Puede pasar.
    } else {
      return res.status(403).json({ 
        error: "Acceso denegado: No tienes permiso para realizar esta acción." 
      });
    }
  };
};

export default authorize;