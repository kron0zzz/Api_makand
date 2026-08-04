import pool from "../../config/database.js";

export default class Order_detailRepository {

  async create(order_detailData,client = pool) {

    const { order_id, stock_id, machinery_name_snapshot, quantity_to_dispatch, rental_unit_price, subtotal_weight_kg} = order_detailData;

    const query = `
      INSERT INTO order_details ( order_id, stock_id, machinery_name_snapshot, quantity_to_dispatch, rental_unit_price, subtotal_weight_kg)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [ order_id, stock_id, machinery_name_snapshot, quantity_to_dispatch, rental_unit_price, subtotal_weight_kg];

    const result = await client.query(query, values);

    return result.rows[0];
  }


  async findAll() {

    const result =
      await pool.query("SELECT * FROM order_details");

    return result.rows;
  }



  async findById(
    id,
    client = pool
  ) {

    const result =
      await client.query(
        `
        SELECT *
        FROM order_details
        WHERE order_detail_id = $1
        `,
        [id]
      );

    return result.rows[0];

  }


  
  async update(id, order_detailData) {

    const { order_id, stock_id, machinery_name_snapshot, quantity_to_dispatch, rental_unit_price, subtotal_weight_kg } = order_detailData;

    const query = `
      UPDATE order_details
      SET  
      order_id = $1,
      stock_id = $2,
      machinery_name_snapshot = $3, 
      quantity_to_dispatch = $4, 
      rental_unit_price = $5,
      subtotal_weight_kg = $6
      WHERE order_detail_id = $7
      RETURNING *
    `;

    const values = [order_id, stock_id, machinery_name_snapshot, quantity_to_dispatch, rental_unit_price, subtotal_weight_kg, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  
  async delete(id) {

    const result = await pool.query(
      "DELETE FROM order_details WHERE order_detail_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }


  async findTableData() {

    const query = `
      SELECT
        stock_id,
        quantity_to_dispatch,
        rental_unit_price,
        machinery_rental_status
      FROM order_details
    `;

    const result = await pool.query(query);

    return result.rows;
  }


  async findByOrderId(
    orderId,
    client = pool
  ) {

    return await this.findByOrder(orderId, client);
  }


  async findByOrder(
    orderId,
    client = pool
  ) {

    const query = `
      SELECT *
      FROM order_details
      WHERE order_id = $1
      ORDER BY order_detail_id
    `;

    const result =
      await client.query(
        query,
        [orderId]
      );

    return result.rows;

  }



  async setReturned(
    order_detail_id,
    client = pool
  ) {

    const query = `
      UPDATE order_details
      SET machinery_rental_status = false
      WHERE order_detail_id = $1
      RETURNING *
    `;

    const result =
      await client.query(
        query,
        [order_detail_id]
      );

    return result.rows[0];
  }


  async hasPendingReturns(
    orderId,
    client = pool
  ) {

    const query = `
      SELECT EXISTS(
        SELECT 1
        FROM order_details od
        LEFT JOIN returns r
          ON r.order_detail_id = od.order_detail_id
        WHERE od.order_id = $1
        GROUP BY od.order_detail_id, od.quantity_to_dispatch
        HAVING od.quantity_to_dispatch <> COALESCE(SUM(r.returned_quantity), 0)
      ) AS has_pending
    `;

    const result = await client.query(
      query,
      [orderId]
    );

    return result.rows[0].has_pending;

  }



  async setRented(
    order_detail_id,
    client = pool
  ) {

    const query = `
      UPDATE order_details
      SET machinery_rental_status = true
      WHERE order_detail_id = $1
      RETURNING *
    `;

    const result =
      await client.query(
        query,
        [order_detail_id]
      );

    return result.rows[0];

  }



  async recalculateRentalStatus(
    orderDetailId,
    client = pool
  ) {

    const totalReturnedResult =
      await client.query(
        `
        SELECT COALESCE(SUM(returned_quantity), 0) AS total_returned
        FROM returns
        WHERE order_detail_id = $1
        `,
        [orderDetailId]
      );

    const totalReturned =
      Number(
        totalReturnedResult.rows[0].total_returned
      );

    const detail =
      await this.findById(
        orderDetailId,
        client
      );

    if (totalReturned >= detail.quantity_to_dispatch) {

      await this.setReturned(
        orderDetailId,
        client
      );

    } else {

      await this.setRented(
        orderDetailId,
        client
      );

    }

  }

}
