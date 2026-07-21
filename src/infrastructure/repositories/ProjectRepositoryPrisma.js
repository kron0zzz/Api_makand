import pool from "../../config/database.js";

export default class ProjectRepositoryPrisma {
  async create(projectData) {
    if (!projectData || Object.keys(projectData).length === 0) {
      throw new Error("No se recibieron datos del proyecto.");
    }

    const query = `
      INSERT INTO projects (
        project_status,
        customer_id,
        project_name,
        project_address,
        project_phone,
        project_city
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      projectData.project_status !== undefined ? projectData.project_status : true,
      projectData.customer_id,
      projectData.project_name,
      projectData.project_address || null,
      projectData.project_phone,
      projectData.project_city
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const query = `
      SELECT * FROM projects `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT p.*, c.customer_first_name, c.customer_last_name
      FROM projects p
      LEFT JOIN customers c ON p.customer_id = c.customer_id
      WHERE p.project_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async update(id, projectData) {
    if (!projectData) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE projects
      SET 
        project_status = $1,
        customer_id = $2,
        project_name = $3,
        project_address = $4,
        project_phone = $5,
        project_city = $6
      WHERE project_id = $7
      RETURNING *
    `;

    const values = [
      projectData.project_status !== undefined ? projectData.project_status : true,
      projectData.customer_id,
      projectData.project_name,
      projectData.project_address || null,
      projectData.project_phone,
      projectData.project_city,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM projects WHERE project_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData(page=1, limit=10, search="") {

    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        p.*, 
        c.customer_first_name, 
        c.customer_last_name
      FROM projects p
      LEFT JOIN customers c ON p.customer_id = c.customer_id
        WHERE
            $1 = ''
            OR LOWER(project_name) LIKE LOWER($2)
            OR LOWER(CONCAT(c.customer_first_name, ' ', c.customer_last_name)) LIKE ($2)
        ORDER BY p.project_id DESC
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM projects p
        LEFT JOIN customers c ON p.customer_id = c.customer_id
        WHERE
            $1 = ''
            OR LOWER(project_name) LIKE LOWER($2)
            OR LOWER(CONCAT(c.customer_first_name, ' ', c.customer_last_name)) LIKE ($2)
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