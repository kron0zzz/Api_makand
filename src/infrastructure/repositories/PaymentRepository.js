// import pool from "../../config/database.js";

// export default class PaymentRepository {

//   async create(paymentData) {

//     const { order_id, payment_amount, payment_method, payment_date, is_cancelled } = paymentData;

//     const query = `
//       INSERT INTO payments (order_id, payment_amount, payment_method, payment_date, is_cancelled)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *
//     `;

//     const values = [order_id, payment_amount, payment_method, payment_date, is_cancelled];

//     const result = await pool.query(query, values);

//     return result.rows[0];
//   }


//   async findAll() {

//     const result =
//       await pool.query("SELECT * FROM payments");

//     return result.rows;
//   }



//   async findById(id) {

//     const result = await pool.query(
//       "SELECT * FROM payments WHERE payment_id = $1",
//       [id]
//     );

//     return result.rows[0];
//   }


  
//   async update(id, paymentData) {

//     const { order_id, payment_amount, payment_method, payment_date, is_cancelled } = paymentData;

//     const query = `
//       UPDATE payments
//       SET order_id = $1, 
//       payment_amount = $2,
//       payment_method = $3, 
//       payment_date = $4, 
//       is_cancelled = $5
//       WHERE payment_id = $6
//       RETURNING *
//     `;

//     const values = [ order_id, payment_amount, payment_method, payment_date, is_cancelled, id];

//     const result =
//       await pool.query(query, values);

//     return result.rows[0];
//   }

  
//   async delete(id) {

//     const result = await pool.query(
//       "DELETE FROM payments WHERE payment_id = $1 RETURNING *",
//       [id]
//     );

//     return result.rows[0];
//   }



//   async findTableData() {

//     const query = `
//       SELECT
//         payment_id,
//         order_id, 
//         payment_amount, 
//         payment_method, 
//         payment_date
//       FROM payments
//     `;

//     const result = await pool.query(query);

//     return result.rows;
//   }
// }

import pool from "../../config/database.js";

export default class PaymentRepository {

  async create(paymentData) {

    const { order_id, payment_amount, payment_in_cash, payment_date} = paymentData;

    const query = `
      INSERT INTO payments (order_id, payment_amount, payment_in_cash, payment_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [order_id, payment_amount, payment_in_cash, payment_date];

    const result = await pool.query(query, values);

    return result.rows[0];
  }


  async findAll() {

    const result =
      await pool.query("SELECT * FROM payments");

    return result.rows;
  }



  async findById(id) {

    const result = await pool.query(
      "SELECT * FROM payments WHERE payment_id = $1",
      [id]
    );

    return result.rows[0];
  }


  
  async update(id, paymentData) {

    const { order_id, payment_amount, payment_in_cash, payment_date, is_cancelled } = paymentData;

    const query = `
      UPDATE payments
      SET order_id = $1, 
      payment_amount = $2,
      payment_in_cash = $3, 
      payment_date = $4, 
      is_cancelled = $5
      WHERE payment_id = $6
      RETURNING *
    `;

    const values = [ order_id, payment_amount, payment_in_cash, payment_date, is_cancelled, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  
  async delete(id) {

    const result = await pool.query(
      "DELETE FROM payments WHERE payment_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }



  async findTableData() {

    const query = `
      SELECT
        payment_id,
        order_id, 
        payment_amount, 
        payment_in_cash, 
        payment_date
      FROM payments
    `;

    const result = await pool.query(query);

    return result.rows;
  }



  async getTotalPaid(
    orderId
  ) {

    const query = `
      SELECT
        COALESCE(
          SUM(payment_amount),
          0
        ) AS total_payments
      FROM payments
      WHERE order_id = $1
        AND is_cancelled = FALSE
    `;

    const result =
      await pool.query(
        query,
        [orderId]
      );

    return Number(
      result.rows[0].total_payments
    );

  }



  async findPaymentsByOrderId(orderId) {

    const query = `
      SELECT *
      FROM payments
      WHERE order_id = $1
      ORDER BY payment_date DESC
    `;

    const result =
      await pool.query(
        query,
        [orderId]
      );

    return result.rows;

  }


  async existsByOrder(
    orderId,
    client = pool
  ) {

    const query = `
      SELECT EXISTS(
        SELECT 1
        FROM payments
        WHERE order_id = $1
      ) AS has_order
    `;

    const result = await client.query(
      query,
      [orderId]
    );

    return result.rows[0].has_order;
  }
}
