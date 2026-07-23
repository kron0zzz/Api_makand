import pool from "../../config/database.js";

export default class OrderStatusRepositoryPrisma {
  async create(orderStatusData) {
    if (!orderStatusData || Object.keys(orderStatusData).length === 0) {
      throw new Error("No se recibieron datos del estado de pedido.");
    }

    const query = `
      INSERT INTO order_status (
        order_status_name
      )
      VALUES ($1)
      RETURNING *
    `;

    const values = [
      orderStatusData.order_status_name
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Ya existe un estado de pedido registrado con este nombre.');
      }
      throw error;
    }
  }

  async findAll() {
    const query = `
      SELECT * FROM order_status
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT * FROM order_status WHERE order_status_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async update(id, orderStatusData) {
    if (!orderStatusData) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE order_status
      SET 
        order_status_name = $1
      WHERE order_status_id = $2
      RETURNING *
    `;

    const values = [
      orderStatusData.order_status_name,
      id
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Ya existe un estado de pedido registrado con este nombre.');
      }
      throw error;
    }
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM order_status WHERE order_status_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData() {
    const query = `
      SELECT
        order_status_id,
        order_status_name
      FROM order_status
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}