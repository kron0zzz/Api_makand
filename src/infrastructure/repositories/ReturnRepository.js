// import pool from "../../config/database.js";

// export default class ReturnRepository {

//   async create(returnData) {

//     const { return_date, returned_quantity, return_notes, order_detail_id } = returnData;

//     const query = `
//       INSERT INTO returns (return_date, returned_quantity, return_notes, order_detail_id)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *
//     `;

//     const values = [return_date, returned_quantity, return_notes, order_detail_id];

//     const result = await pool.query(query, values);

//     return result.rows[0];
//   }


//   async findAll() {

//     const result =
//       await pool.query("SELECT * FROM returns");

//     return result.rows;
//   }



//   async findById(id) {

//     const result = await pool.query(
//       "SELECT * FROM returns WHERE return_id = $1",
//       [id]
//     );

//     return result.rows[0];
//   }


  
//   async update(id, returnData) {

//     const { return_date, returned_quantity, return_notes, order_detail_id } = returnData;

//     const query = `
//       UPDATE returns
//       SET return_date = $1, 
//       returned_quantity = $2,
//       return_notes = $3, 
//       order_detail_id = $4
//       WHERE return_id = $5
//       RETURNING *
//     `;

//     const values = [ return_date, returned_quantity, return_notes, order_detail_id, id];

//     const result =
//       await pool.query(query, values);

//     return result.rows[0];
//   }

  
//   async delete(id) {

//     const result = await pool.query(
//       "DELETE FROM returns WHERE return_id = $1 RETURNING *",
//       [id]
//     );

//     return result.rows[0];
//   }



//   async findTableData() {

//     const query = `
//       SELECT
//         return_id,
//         return_date, 
//         returned_quantity, 
//         return_notes, 
//         order_detail_id
//       FROM returns
//     `;

//     const result = await pool.query(query);

//     return result.rows;
//   }
// }


import pool from "../../config/database.js";

export default class ReturnRepository {

  async create(returnData) {

    const { return_date, returned_quantity, order_detail_id } = returnData;

    const query = `
      INSERT INTO returns (return_date, returned_quantity, order_detail_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [return_date, returned_quantity, order_detail_id];

    const result = await pool.query(query, values);

    return result.rows[0];
  }


  async findAll() {

    const result =
      await pool.query("SELECT * FROM returns");

    return result.rows;
  }



  async findById(id) {

    const result = await pool.query(
      "SELECT * FROM returns WHERE return_id = $1",
      [id]
    );

    return result.rows[0];
  }


  
  async update(id, returnData) {

    const { return_date, returned_quantity, order_detail_id } = returnData;

    const query = `
      UPDATE returns
      SET return_date = $1, 
      returned_quantity = $2,
      order_detail_id = $3
      WHERE return_id = $4
      RETURNING *
    `;

    const values = [ return_date, returned_quantity, order_detail_id, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  
  async delete(id) {

    const result = await pool.query(
      "DELETE FROM returns WHERE return_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }



  async findTableData() {

    const query = `
      SELECT
        return_id,
        return_date, 
        returned_quantity, 
        order_detail_id
      FROM returns
    `;

    const result = await pool.query(query);

    return result.rows;
  }


  async getReturnedQuantity(
    orderDetailId,
    client = pool
  ) {

    const query = `
      SELECT
        COALESCE(
          SUM(returned_quantity),
          0
        ) AS total_returned
      FROM returns
      WHERE order_detail_id = $1
    `;

    const result =
      await client.query(
        query,
        [orderDetailId]
      );

    return Number(
      result.rows[0].total_returned
    );

  }




  async findByOrderDetailId(
    orderDetailId
  ) {

    const query = `
      SELECT *
      FROM returns
      WHERE order_detail_id = $1
      ORDER BY return_date ASC
    `;

    const result =
      await pool.query(
        query,
        [orderDetailId]
      );

    return result.rows;

  }
}