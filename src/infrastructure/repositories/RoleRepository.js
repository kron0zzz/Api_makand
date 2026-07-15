import pool from "../../config/database.js";

export default class RoleRepository {

  async create(roleData) {
    const { role_name, permissionIds } = roleData;

    await pool.query("BEGIN");
    try {
      const roleQuery = `
        INSERT INTO roles (role_name)
        VALUES ($1)
        RETURNING *
      `;
      const roleResult = await pool.query(roleQuery, [role_name]);
      const newRole = roleResult.rows[0];

      if (permissionIds && permissionIds.length > 0) {
        for (const permission_id of permissionIds) {
          const relationQuery = `
            INSERT INTO role_permissions (role_id, permission_id)
            VALUES ($1, $2)
          `;
          await pool.query(relationQuery, [newRole.role_id, permission_id]);
        }
      }

      await pool.query("COMMIT");
      return newRole;
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }

  async findAll(page = 1, limit = 10, search="") {
    const result = await pool.query("SELECT * FROM roles");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM roles WHERE role_id = $1",
      [id]
    );
    return result.rows[0];
  }

  async update(id, roleData) {
    const { role_name, permissionIds } = roleData;

    await pool.query("BEGIN");
    try {
      // 1. Actualizamos el nombre del rol
      const roleQuery = `
        UPDATE roles
        SET role_name = $1
        WHERE role_id = $2
        RETURNING *
      `;
      const roleResult = await pool.query(roleQuery, [role_name, id]);
      const updatedRole = roleResult.rows[0];

      // 2. Limpiamos los permisos viejos en la tabla intermedia
      await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);

      // 3. Insertamos los nuevos permisos seleccionados
      if (permissionIds && permissionIds.length > 0) {
        for (const permission_id of permissionIds) {
          const relationQuery = `
            INSERT INTO role_permissions (role_id, permission_id)
            VALUES ($1, $2)
          `;
          await pool.query(relationQuery, [id, permission_id]);
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
    // Al eliminar el rol, por cascada o de forma manual limpiamos la intermedia primero
    await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [id]);
    
    const result = await pool.query(
      "DELETE FROM roles WHERE role_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData(page = 1, limit = 10, search="") {
    const offset = (page - 1) * limit;

    const query = `
        SELECT
            role_id,
            role_name
        FROM roles
        WHERE
            $1 = ''
            OR LOWER(role_name) LIKE LOWER($2)
        ORDER BY role_id
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM roles
        WHERE
            $1 = ''
            OR LOWER(role_name) LIKE LOWER($2)
        `,
        [search, `%${search}%`]
    );

    const total = Number(totalQuery.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}