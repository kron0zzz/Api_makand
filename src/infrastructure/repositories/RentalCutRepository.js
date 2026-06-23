import pool from "../../config/database.js";

export default class RentalCutRepository {

  async create(rentalCutData) {

    const { order_id, period_start_date, period_end_date, cut_amount, cut_notes } = rentalCutData;

    const query = `
      INSERT INTO rental_cuts (order_id, period_start_date, period_end_date, cut_amount, cut_notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [order_id, period_start_date, period_end_date, cut_amount, cut_notes];

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

    const { order_id, period_start_date, period_end_date, cut_amount, cut_notes } = rentalCutData;

    const query = `
      UPDATE rental_cuts
      SET order_id = $1, 
      period_start_date = $2,
      period_end_date = $3, 
      cut_amount = $4, 
      cut_notes = $5
      WHERE cut_id = $6
      RETURNING *
    `;

    const values = [ order_id, period_start_date, period_end_date, cut_amount, cut_notes, id];

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
}