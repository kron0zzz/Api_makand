import pool from "../../config/database.js";

export default class OrderRepository {

  async create(orderData, client = pool) {

    const { order_closing_date, project_id, order_status_id, user_id, discount_amount, order_description} = orderData;

    const query = `
      INSERT INTO orders ( project_id, order_status_id, user_id, discount_amount, order_description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [ project_id, order_status_id, user_id, discount_amount, order_description];

    const result = await client.query(query, values);

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





  async findFullById(id) {

    const query = `
      SELECT
        o.*,

        os.order_status_name,

        p.project_name,
        p.project_address,
        p.project_phone,
        p.project_city,

        c.customer_id,
        c.customer_first_name,
        c.customer_last_name,
        c.customer_phone,

        u.user_email

      FROM orders o

      INNER JOIN order_status os
        ON o.order_status_id =
          os.order_status_id

      INNER JOIN projects p
        ON o.project_id =
          p.project_id

      INNER JOIN customers c
        ON p.customer_id =
          c.customer_id

      INNER JOIN users u
        ON o.user_id =
          u.user_id

      WHERE o.order_id = $1
    `;

    const result =
      await pool.query(query, [id]);

    return result.rows[0];
  }




  async findDetailsByOrderId(id) {

    const query = `
      SELECT
        od.*
      FROM order_details od
      WHERE od.order_id = $1
    `;

    const result =
      await pool.query(query, [id]);

    return result.rows;
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