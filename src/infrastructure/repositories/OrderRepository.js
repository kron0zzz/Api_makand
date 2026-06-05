import pool from "../../config/database.js";

export default class OrderRepository {

  async create(orderData) {

    const { order_closing_date, project_id, order_status_id, user_id, discount_amount, order_description} = orderData;

    const query = `
      INSERT INTO orders ( project_id, order_status_id, user_id, discount_amount, order_description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [ project_id, order_status_id, user_id, discount_amount, order_description];

    const result = await pool.query(query, values);

    return result.rows[0];
  }


  async findAll() {

    const result =
      await pool.query("SELECT * FROM orders");

    return result.rows;
  }



  async findById(id) {

    const result = await pool.query(
      "SELECT * FROM orders WHERE order_id = $1",
      [id]
    );

    return result.rows[0];
  }


  
  async update(id, orderData) {

    const { project_id, order_status_id, user_id, discount_amount, order_description } = orderData;

    const query = `
      UPDATE orders
      SET  
      project_id = $1,
      order_status_id = $2,
      user_id = $3, 
      discount_amount = $4, 
      order_description = $5 
      WHERE order_id = $6
      RETURNING *
    `;

    const values = [ project_id, order_status_id, user_id, discount_amount, order_description, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  
  async delete(id) {

    const result = await pool.query(
      "DELETE FROM orders WHERE order_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }



  async findTableData() {

    const query = `
      SELECT
        order_id,
        order_creation_date,
        project_id,
        order_status_id
      FROM orders
    `;

    const result = await pool.query(query);

    return result.rows;
  }
}