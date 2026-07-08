// import pool from "../../config/database.js";

// export default class OrderRepository {

//   async create(orderData, client = pool) {

//     const {
//       order_creation_date,
//       project_id,
//       order_status_id,
//       user_id,
//       discount_amount,
//       order_description
//     } = orderData;

//     const query = `
//       INSERT INTO orders (
//         order_creation_date,
//         project_id,
//         order_status_id,
//         user_id,
//         discount_amount,
//         order_description
//       )
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING *
//     `;

//     const values = [
//       order_creation_date || new Date(),
//       project_id,
//       order_status_id,
//       user_id,
//       discount_amount,
//       order_description
//     ];

//     const result =
//       await client.query(query, values);

//     return result.rows[0];
//   }


//   async findAll() {

//     const result =
//       await pool.query("SELECT * FROM orders");

//     return result.rows;
//   }



//   async findById(id) {

//     const result = await pool.query(
//       "SELECT * FROM orders WHERE order_id = $1",
//       [id]
//     );

//     return result.rows[0];
//   }





//   async findFullById(id) {

//     const query = `
//       SELECT
//         o.*,

//         os.order_status_name,

//         p.project_name,
//         p.project_address,
//         p.project_phone,
//         p.project_city,

//         c.customer_id,
//         c.customer_first_name,
//         c.customer_last_name,
//         c.customer_phone,

//         u.user_email

//       FROM orders o

//       INNER JOIN order_status os
//         ON o.order_status_id =
//           os.order_status_id

//       INNER JOIN projects p
//         ON o.project_id =
//           p.project_id

//       INNER JOIN customers c
//         ON p.customer_id =
//           c.customer_id

//       INNER JOIN users u
//         ON o.user_id =
//           u.user_id

//       WHERE o.order_id = $1
//     `;

//     const result =
//       await pool.query(query, [id]);

//     return result.rows[0];
//   }




//   async findDetailsByOrderId(id) {

//     const query = `
//       SELECT
//         od.*
//       FROM order_details od
//       WHERE od.order_id = $1
//     `;

//     const result =
//       await pool.query(query, [id]);

//     return result.rows;
//   }




  
//   async update(id, orderData) {

//     const {
//       order_creation_date,
//       project_id,
//       order_status_id,
//       user_id,
//       discount_amount,
//       order_description
//     } = orderData;

//     const query = `
//       UPDATE orders
//       SET
//         order_creation_date = $1,
//         project_id = $2,
//         order_status_id = $3,
//         user_id = $4,
//         discount_amount = $5,
//         order_description = $6
//       WHERE order_id = $7
//       RETURNING *
//     `;

//     const values = [
//       order_creation_date,
//       project_id,
//       order_status_id,
//       user_id,
//       discount_amount,
//       order_description,
//       id
//     ];


//     const result =
//       await pool.query(query, values);

//     return result.rows[0];
//   }

  
//   async delete(id) {

//     const result = await pool.query(
//       "DELETE FROM orders WHERE order_id = $1 RETURNING *",
//       [id]
//     );

//     return result.rows[0];
//   }



//   async findTableData() {

//     const query = `
//       SELECT
//         o.order_id,
//         o.order_creation_date,

//         p.project_name,

//         CONCAT(
//           c.customer_first_name,
//           ' ',
//           c.customer_last_name
//         ) AS customer_name,

//         os.order_status_name

//       FROM orders o

//       INNER JOIN projects p
//         ON o.project_id = p.project_id

//       INNER JOIN customers c
//         ON p.customer_id = c.customer_id

//       INNER JOIN order_status os
//         ON o.order_status_id =
//           os.order_status_id

//       ORDER BY o.order_id DESC
//     `;

//     const result = await pool.query(query);

//     return result.rows;
//   }
// }

import pool from "../../config/database.js";

export default class OrderRepository {

  async create(orderData, client = pool) {

    const {
      order_creation_date,
      project_id,
      order_status_id,
      user_id,
      discount_amount,
      order_description
    } = orderData;

    const query = `
      INSERT INTO orders (
        order_creation_date,
        project_id,
        order_status_id,
        user_id,
        discount_amount,
        order_description
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      order_creation_date || new Date(),
      project_id,
      order_status_id,
      user_id,
      discount_amount,
      order_description
    ];

    const result =
      await client.query(query, values);

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

    const {
      order_creation_date,
      project_id,
      order_status_id,
      user_id,
      discount_amount,
      order_description
    } = orderData;

    const query = `
      UPDATE orders
      SET
        order_creation_date = $1,
        project_id = $2,
        order_status_id = $3,
        user_id = $4,
        discount_amount = $5,
        order_description = $6
      WHERE order_id = $7
      RETURNING *
    `;

    const values = [
      order_creation_date,
      project_id,
      order_status_id,
      user_id,
      discount_amount,
      order_description,
      id
    ];


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
        o.order_id,
        o.order_creation_date,

        p.project_name,

        CONCAT(
          c.customer_first_name,
          ' ',
          c.customer_last_name
        ) AS customer_name,

        os.order_status_name

      FROM orders o

      INNER JOIN projects p
        ON o.project_id = p.project_id

      INNER JOIN customers c
        ON p.customer_id = c.customer_id

      INNER JOIN order_status os
        ON o.order_status_id =
          os.order_status_id

      ORDER BY o.order_id DESC
    `;

    const result = await pool.query(query);

    return result.rows;
  }




  async updateLastCutDate(
    orderId,
    lastCutDate
  ) {

    const query = `
      UPDATE orders
      SET last_cut_date = $1
      WHERE order_id = $2
      RETURNING *
    `;

    const result =
      await pool.query(
        query,
        [
          lastCutDate,
          orderId
        ]
      );

    return result.rows[0];

  }



  async findWorkspaceData(orderId) {

    const query = `
      SELECT

        od.order_detail_id,
        od.order_id,
        od.machinery_id,
        od.machinery_name_snapshot,
        od.quantity_to_dispatch,
        od.rental_unit_price,
        od.machinery_rental_status,
        od.subtotal_weight_kg,

        COALESCE(

          (
            SELECT json_agg(

              json_build_object(

                'return_id', r.return_id,
                'return_date', r.return_date,
                'returned_quantity', r.returned_quantity

              )

              ORDER BY r.return_date DESC

            )

            FROM returns r

            WHERE r.order_detail_id =
              od.order_detail_id

          ),

          '[]'::json

        ) AS returns

      FROM order_details od

      WHERE od.order_id = $1

      ORDER BY od.order_detail_id;
    `;

    const result =
      await pool.query(query, [orderId]);

    return result.rows;

  }
}