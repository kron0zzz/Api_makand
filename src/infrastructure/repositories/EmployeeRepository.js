import pool from "../../config/database.js";

export default class EmployeeRepository {

  async create(employeeData) {
    const {
      employee_document_type,
      employee_document_number,
      employee_status,
      employee_first_name,
      employee_last_name,
      employee_email,
      employee_phone,
      employee_eps,
      position_id
    } = employeeData;

    const query = `
      INSERT INTO employees (
        employee_document_type, 
        employee_document_number, 
        employee_status, 
        employee_first_name, 
        employee_last_name, 
        employee_email, 
        employee_phone, 
        employee_eps, 
        position_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      employee_document_type,
      employee_document_number,
      employee_status,
      employee_first_name,
      employee_last_name,
      employee_email,
      employee_phone,
      employee_eps,
      position_id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM employees");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM employees WHERE employee_id = $1",
      [id]
    );
    return result.rows[0];
  }

  async update(id, employeeData) {
    const {
      employee_document_type,
      employee_document_number,
      employee_status,
      employee_first_name,
      employee_last_name,
      employee_email,
      employee_phone,
      employee_eps,
      position_id
    } = employeeData;

    const query = `
      UPDATE employees
      SET 
        employee_document_type = $1, 
        employee_document_number = $2, 
        employee_status = $3, 
        employee_first_name = $4, 
        employee_last_name = $5, 
        employee_email = $6, 
        employee_phone = $7, 
        employee_eps = $8, 
        position_id = $9
      WHERE employee_id = $10
      RETURNING *
    `;

    const values = [
      employee_document_type,
      employee_document_number,
      employee_status,
      employee_first_name,
      employee_last_name,
      employee_email,
      employee_phone,
      employee_eps,
      position_id,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM employees WHERE employee_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  // 🌟 Optimizado para tu tabla del Frontend usando JOIN con positions
  async findTableData() {
    const query = `
      SELECT
        e.employee_id,
        e.employee_document_number,
        CONCAT(e.employee_first_name, ' ', e.employee_last_name) AS employee_full_name,
        e.employee_email,
        e.employee_status,
        p.position_name AS position_name
      FROM employees e
      INNER JOIN positions p ON e.position_id = p.position_id
    `;

    const result = await pool.query(query);
    return result.rows;
  }
}