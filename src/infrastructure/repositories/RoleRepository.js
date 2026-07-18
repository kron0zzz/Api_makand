// // import pool from "../../config/database.js";

// // export default class RoleRepository {

// //   async create(roleData) {
// //     const { role_name, permissionIds } = roleData;

// //     await pool.query("BEGIN");
// //     try {
// //       const roleQuery = `
// //         INSERT INTO roles (role_name)
// //         VALUES ($1)
// //         RETURNING *
// //       `;
// //       const roleResult = await pool.query(roleQuery, [role_name]);
// //       const newRole = roleResult.rows[0];

// //       if (permissionIds && permissionIds.length > 0) {
// //         for (const permission_id of permissionIds) {
// //           const relationQuery = `
// //             INSERT INTO role_permissions (role_id, permission_id)
// //             VALUES ($1, $2)
// //           `;
// //           await pool.query(relationQuery, [newRole.role_id, permission_id]);
// //         }
// //       }

// //       await pool.query("COMMIT");
// //       return newRole;
// //     } catch (error) {
// //       await pool.query("ROLLBACK");
// //       throw error;
// //     }
// //   }

// //   async findAll() {
// //     const result = await pool.query("SELECT * FROM roles");
// //     return result.rows;
// //   }

// //   async findById(id) {
// //     const result = await pool.query(
// //       "SELECT * FROM roles WHERE role_id = $1",
// //       [id]
// //     );
// //     return result.rows[0];
// //   }

// //   async update(id, roleData) {
// //     const { role_name, permissionIds } = roleData;

// //     await pool.query("BEGIN");
// //     try {
// //       // 1. Actualizamos el nombre del rol
// //       const roleQuery = `
// //         UPDATE roles
// //         SET role_name = $1
// //         WHERE role_id = $2
// //         RETURNING *
// //       `;
// //       const roleResult = await pool.query(roleQuery, [role_name, id]);
// //       const updatedRole = roleResult.rows[0];

// //       // 2. Limpiamos los permisos viejos en la tabla intermedia
// //       await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);

// //       // 3. Insertamos los nuevos permisos seleccionados
// //       if (permissionIds && permissionIds.length > 0) {
// //         for (const permission_id of permissionIds) {
// //           const relationQuery = `
// //             INSERT INTO role_permissions (role_id, permission_id)
// //             VALUES ($1, $2)
// //           `;
// //           await pool.query(relationQuery, [id, permission_id]);
// //         }
// //       }

// //       await pool.query("COMMIT");
// //       return updatedRole;
// //     } catch (error) {
// //       await pool.query("ROLLBACK");
// //       throw error;
// //     }
// //   }

// //   async delete(id) {
// //     // Al eliminar el rol, por cascada o de forma manual limpiamos la intermedia primero
// //     await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);
    
// //     const result = await pool.query(
// //       "DELETE FROM roles WHERE role_id = $1 RETURNING *",
// //       [id]
// //     );
// //     return result.rows[0];
// //   }

// //   async findTableData() {
// //     // Trae los roles limpios para la vista principal de la tabla
// //     const query = `
// //       SELECT 
// //         role_id,
// //         role_name
// //       FROM roles
// //     `;
// //     const result = await pool.query(query);
// //     return result.rows;
// //   }

// //   async findAllPermissions() {
// //     const query = "SELECT permission_id as id, permission_name as name FROM permissions";
// //     const result = await pool.query(query);
// //     return result.rows;
// //   }

// //   async findPermissionsByRoleId(roleId) {
// //     const query = `
// //       SELECT p.permission_id as id, p.permission_name as name 
// //       FROM permissions p
// //       JOIN role_permissions rp ON p.permission_id = rp.permission_id
// //       WHERE rp.role_id = $1
// //     `;
// //     const result = await pool.query(query, [roleId]);
// //     return result.rows;
// //   }



// // }













// import pool from "../../config/database.js";

// export default class RoleRepository {

//   async create(roleData) {
//     const { role_name, permissionIds } = roleData;
//     await pool.query("BEGIN");
//     try {
//       const roleQuery = `INSERT INTO roles (role_name) VALUES ($1) RETURNING *`;
//       const roleResult = await pool.query(roleQuery, [role_name]);
//       const newRole = roleResult.rows[0];

//       if (permissionIds && permissionIds.length > 0) {
//         for (const permission_id of permissionIds) {
//           await pool.query("INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)", [newRole.role_id, permission_id]);
//         }
//       }
//       await pool.query("COMMIT");
//       return newRole;
//     } catch (error) {
//       await pool.query("ROLLBACK");
//       throw error;
//     }
//   }

//   async findAll() {
//     const result = await pool.query("SELECT role_id, role_name, role_status FROM roles");
//     return result.rows;
//   }

//   async findById(id) {
//     const result = await pool.query("SELECT * FROM roles WHERE role_id = $1", [id]);
//     return result.rows[0];
//   }

//   // async update(id, roleData) {
//   //   const { role_name, permissionIds } = roleData;
//   //   await pool.query("BEGIN");
//   //   try {
//   //     const roleQuery = `UPDATE roles SET role_name = $1 WHERE role_id = $2 RETURNING *`;
//   //     const roleResult = await pool.query(roleQuery, [role_name, id]);
//   //     const updatedRole = roleResult.rows[0];

//   //     await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);
//   //     if (permissionIds && permissionIds.length > 0) {
//   //       for (const permission_id of permissionIds) {
//   //         await pool.query("INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)", [id, permission_id]);
//   //       }
//   //     }
//   //     await pool.query("COMMIT");
//   //     return updatedRole;
//   //   } catch (error) {
//   //     await pool.query("ROLLBACK");
//   //     throw error;
//   //   }
//   // }

//   async update(id, roleData) {
//     const { role_name, role_status, permissionIds } = roleData;
//     await pool.query("BEGIN");
//     try {
//       // CORREGIDO: Se incluyó role_status en la actualización
//       const roleQuery = `UPDATE roles SET role_name = $1, role_status = $2 WHERE role_id = $3 RETURNING *`;
//       const roleResult = await pool.query(roleQuery, [role_name, role_status, id]);
//       const updatedRole = roleResult.rows[0];

//       await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);
//       if (permissionIds && permissionIds.length > 0) {
//         for (const permission_id of permissionIds) {
//           await pool.query("INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)", [id, permission_id]);
//         }
//       }
//       await pool.query("COMMIT");
//       return updatedRole;
//     } catch (error) {
//       await pool.query("ROLLBACK");
//       throw error;
//     }
//   }

//   async delete(id) {
//     await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);
//     const result = await pool.query("DELETE FROM roles WHERE role_id = $1 RETURNING *", [id]);
//     return result.rows[0];
//   }

//   async findTableData() {
//     const query = `SELECT role_id, role_name, role_status FROM roles`;
//     const result = await pool.query(query);
//     return result.rows;
//   }

//   // CORREGIDO: Ahora devuelve 'id' y 'name' para que el selector funcione
//   async findAllPermissions() {
//     const query = "SELECT permission_id as id, permission_name as name FROM permissions";
//     const result = await pool.query(query);
//     return result.rows;
//   }

//   async findPermissionsByRoleId(roleId) {
//     const query = `
//       SELECT p.permission_id as id, p.permission_name as name 
//       FROM permissions p
//       JOIN role_permissions rp ON p.permission_id = rp.permission_id
//       WHERE rp.role_id = $1
//     `;
//     const result = await pool.query(query, [roleId]);
//     return result.rows;
//   }
// }


import pool from "../../config/database.js";

export default class RoleRepository {

  async create(roleData) {
    const { role_name, role_status, permissionIds } = roleData;
    await pool.query("BEGIN");
    try {
      const roleQuery = `INSERT INTO roles (role_name, role_status) VALUES ($1, $2) RETURNING *`;
      const roleResult = await pool.query(roleQuery, [role_name, role_status ?? true]);
      const newRole = roleResult.rows[0];

      if (permissionIds && permissionIds.length > 0) {
        for (const permission_id of permissionIds) {
          await pool.query("INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)", [newRole.role_id, permission_id]);
        }
      }
      await pool.query("COMMIT");
      return newRole;
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }

  async findAll() {
    const result = await pool.query("SELECT role_id, role_name, role_status FROM roles");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query("SELECT * FROM roles WHERE role_id = $1", [id]);
    return result.rows[0];
  }

  async update(id, roleData) {
    const { role_name, role_status, permissionIds } = roleData;
    await pool.query("BEGIN");
    try {
      const roleQuery = `UPDATE roles SET role_name = $1, role_status = $2 WHERE role_id = $3 RETURNING *`;
      const roleResult = await pool.query(roleQuery, [role_name, role_status, id]);
      const updatedRole = roleResult.rows[0];

      await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);
      if (permissionIds && permissionIds.length > 0) {
        for (const permission_id of permissionIds) {
          await pool.query("INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)", [id, permission_id]);
        }
      }
      await pool.query("COMMIT");
      return updatedRole;
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }

  async delete(id) {
    await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);
    const result = await pool.query("DELETE FROM roles WHERE role_id = $1 RETURNING *", [id]);
    return result.rows[0];
  }

  async findTableData() {
    const query = `SELECT role_id, role_name, role_status FROM roles`;
    const result = await pool.query(query);
    return result.rows;
  }

  async findAllPermissions() {
    const query = "SELECT permission_id as id, permission_name as name FROM permissions";
    const result = await pool.query(query);
    return result.rows;
  }

  async findPermissionsByRoleId(roleId) {
    const query = `
      SELECT p.permission_id as id, p.permission_name as name 
      FROM permissions p
      JOIN role_permissions rp ON p.permission_id = rp.permission_id
      WHERE rp.role_id = $1
    `;
    const result = await pool.query(query, [roleId]);
    return result.rows;
  }
}