import pool from "../../config/database.js";

export default class RentalCutRepository {

  async create(rentalCutData) {

    const { order_id, period_start_date, period_end_date, cut_amount} = rentalCutData;

    const query = `
      INSERT INTO rental_cuts (order_id, period_start_date, period_end_date, cut_amount)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [order_id, period_start_date, period_end_date, cut_amount];

    const result = await pool.query(query, values);

    return result.rows[0];
  }


  async findAll() {

    const result =
      await pool.query("SELECT * FROM rental_cuts");

    return result.rows;
  }



  async findById(id) {

    const result = await pool.query(
      "SELECT * FROM rental_cuts WHERE cut_id = $1",
      [id]
    );

    return result.rows[0];
  }


  
  async update(id, rentalCutData) {

    const { order_id, period_start_date, period_end_date, cut_amount} = rentalCutData;

    const query = `
      UPDATE rental_cuts
      SET order_id = $1, 
      period_start_date = $2,
      period_end_date = $3, 
      cut_amount = $4
      WHERE cut_id = $5
      RETURNING *
    `;

    const values = [ order_id, period_start_date, period_end_date, cut_amount, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  
  async delete(id) {

    const result = await pool.query(
      "DELETE FROM rental_cuts WHERE cut_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }



  async findTableData() {

    const query = `
      SELECT
        cut_id,
        order_id, 
        period_start_date, 
        period_end_date, 
        cut_amount
      FROM rental_cuts
    `;

    const result = await pool.query(query);

    return result.rows;
  }




  async getTotalCutAmount(
    orderId
  ) {

    const query = `
      SELECT
        COALESCE(
          SUM(cut_amount),
          0
        ) AS total_cuts
      FROM rental_cuts
      WHERE order_id = $1
    `;

    const result =
      await pool.query(
        query,
        [orderId]
      );

    return Number(
      result.rows[0].total_cuts
    );

  }


  async findByOrderId(
    orderId
  ) {

    const query = `
      SELECT *
      FROM rental_cuts
      WHERE order_id = $1
      ORDER BY period_start_date DESC
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
        FROM rental_cuts
        WHERE order_id = $1
      ) AS has_order
    `;

    const result = await client.query(
      query,
      [orderId]
    );

    return result.rows[0].has_order;
  }


  async getTotalBilled(orderId) {

    const query = `

        SELECT

            COALESCE(

                SUM(cut_amount),

                0

            ) AS total_billed

        FROM rental_cuts

        WHERE order_id = $1;

    `;

    const result = await pool.query(

        query,

        [orderId]

    );

    return Number(

        result.rows[0].total_billed

    );

  }
}
