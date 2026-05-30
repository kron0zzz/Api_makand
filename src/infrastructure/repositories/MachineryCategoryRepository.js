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

    const result = await pool.query(query, values);
    return result.rows[0];
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

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM machinery_categories WHERE category_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData() {
    const query = `
      SELECT
        category_id,
        category_name
      FROM machinery_categories
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}