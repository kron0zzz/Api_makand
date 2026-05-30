import pool from "../../config/database.js";

export default class MachineryRepository {

  // 1. Crear una nueva maquinaria
  async create(data) {
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No se recibieron datos de la maquinaria en el repositorio.");
    }

    const query = `
      INSERT INTO machinery (
        status_id, category_id, next_revision_date, machinery_name, 
        is_motorized, sale_price, daily_rental_price, weight_kg, 
        stock_quantity, is_owned, machinery_description
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const values = [
      data.status_id,
      data.category_id,
      data.next_revision_date || null,
      data.machinery_name,
      data.is_motorized ?? false,
      data.sale_price,
      data.daily_rental_price,
      data.weight_kg || null,
      data.stock_quantity,
      data.is_owned ?? true,
      data.machinery_description
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // 2. Traer la data básica de la tabla pura (FindAll)
  async findAll() {
    const result = await pool.query("SELECT * FROM machinery");
    return result.rows;
  }

  // 3. Buscar una maquinaria específica por su ID
  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM machinery WHERE machinery_id = $1",
      [id]
    );
    return result.rows[0];
  }

  // 4. Traer los datos combinados (con INNER JOIN) especiales para tu tabla del Frontend
  async findTableData() {
    const query = `
      SELECT 
        m.machinery_id,
        m.machinery_name,
        m.next_revision_date,
        m.is_motorized,
        m.sale_price,
        m.daily_rental_price,
        m.weight_kg,
        m.stock_quantity,
        m.is_owned,
        m.machinery_description,
        c.category_name,
        s.status_name
      FROM machinery m
      INNER JOIN machinery_categories c ON m.category_id = c.category_id
      INNER JOIN machinery_status s ON m.status_id = s.status_id
      ORDER BY m.machinery_id DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // 5. Actualizar los datos de una maquinaria
  async update(id, data) {
    if (!data) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE machinery
      SET 
        status_id = $1,
        category_id = $2,
        next_revision_date = $3,
        machinery_name = $4,
        is_motorized = $5,
        sale_price = $6,
        daily_rental_price = $7,
        weight_kg = $8,
        stock_quantity = $9,
        is_owned = $10,
        machinery_description = $11
      WHERE machinery_id = $12
      RETURNING *
    `;

    const values = [
      data.status_id,
      data.category_id,
      data.next_revision_date || null,
      data.machinery_name,
      data.is_motorized,
      data.sale_price,
      data.daily_rental_price,
      data.weight_kg || null,
      data.stock_quantity,
      data.is_owned,
      data.machinery_description,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // 6. Eliminar un registro de maquinaria
  async delete(id) {
    const result = await pool.query(
      "DELETE FROM machinery WHERE machinery_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}