import pool from "../../config/database.js";

export default class UserRepository {

  async create(userData) {

    const {user_email, user_password, user_status, role_id, employee_id, created_at } = userData;

    const query = `
      INSERT INTO users (user_email, user_password, user_status, role_id, employee_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [user_email, user_password, user_status, role_id, employee_id];

    const result = await pool.query(query, values);

    return result.rows[0];
  }


  async findAll() {

    const result =
      await pool.query("SELECT * FROM users");

    return result.rows;
  }



  async findById(id) {

    const result = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );

    return result.rows[0];
  }


  
  async update(id, userData) {

    const {user_email, user_password, user_status, role_id, employee_id } = userData;

    const query = `
      UPDATE users
      SET user_email = $1, 
      user_password = $2,
      user_status = $3, 
      role_id = $4, 
      employee_id = $5
      WHERE user_id = $6
      RETURNING *
    `;

    const values = [user_email, user_password, user_status, role_id, employee_id, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  
  async delete(id) {

    const result = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }



  async findTableData() {

    const query = `
      SELECT
        user_id,
        user_email,
        employee_id,
        role_id,
        user_status
      FROM users
    `;

    const result = await pool.query(query);

    return result.rows;
  }


  async findByEmail(email) {

    const query = `
      SELECT *
      FROM users
      WHERE user_email = $1
    `;

    const result =
      await pool.query(query, [email]);

    return result.rows[0];

  }

  async findPermissionsByRoleId(role_id) {
    const query = `
      SELECT p.permission_name 
      FROM permissions p
      INNER JOIN role_permissions rp ON p.permission_id = rp.permission_id
      WHERE rp.role_id = $1
    `;
    const result = await pool.query(query, [role_id]);
    
    // Mapeamos para devolver un array limpio de strings: ['Crear Usuarios', 'Ver Maquinaria']
    return result.rows.map(row => row.permission_name);
  }


  
  async findEmployeeEmail(employee_id) {
    // Apunta exactamente a tu tabla 'employees' y columna 'employee_email'
    const query = `
      SELECT employee_email 
      FROM employees 
      WHERE employee_id = $1
    `;
    const result = await pool.query(query, [employee_id]);
    
    // Si no encuentra al empleado, devuelve null
    if (result.rows.length === 0) {
      return null;
    }
    
    // ⚠️ CRÍTICO: Debe leer .employee_email en minúsculas y tal cual viene de la BD
    return result.rows[0].employee_email; 

  }
}