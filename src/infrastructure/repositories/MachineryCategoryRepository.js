import pool from "../../config/database.js";

export default class MachineryCategoryRepository {

  async create(categoryData) {
    if (!categoryData || Object.keys(categoryData).length === 0) {
      throw new Error("No se recibieron datos de la categoría de maquinaria en el repositorio.");
    }

    const query = `
      INSERT INTO machinery_categories (category_name)
      VALUES ($1)
      RETURNING *
    `;

    const values = [
      categoryData.category_name || categoryData.categoryName || 'Sin Nombre'
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Ya existe una categoría de maquinaria registrada con este nombre.');
      }
      throw error;
    }
  }




  async findAll() {
    const result = await pool.query("SELECT * FROM machinery_categories");
    return result.rows;
  }




  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM machinery_categories WHERE category_id = $1",
      [id]
    );
    return result.rows[0];
  }




  async update(id, categoryData) {
    if (!categoryData) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE machinery_categories
      SET category_name = $1
      WHERE category_id = $2
      RETURNING *
    `;

    const values = [
      categoryData.category_name || categoryData.categoryName,
      id
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Ya existe una categoría de maquinaria registrada con este nombre.');
      }
      throw error;
    }
  }




  async delete(id) {
    const result = await pool.query(
      "DELETE FROM machinery_categories WHERE category_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }




  async findTableData(page = 1, limit = 10, search="") {

    const offset = (page - 1) * limit;

    const query = `
        SELECT
            category_id,
            category_name
        FROM machinery_categories
        WHERE
            $1 = ''
            OR LOWER(category_name) LIKE LOWER($2)
        ORDER BY category_id
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM machinery_categories
        WHERE
            $1 = ''
            OR LOWER(category_name) LIKE LOWER($2)
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