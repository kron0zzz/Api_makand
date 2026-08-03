import pool from "../../config/database.js";

export default class MachineryStockRepository {

  async create(stockData) {
    if (!stockData || Object.keys(stockData).length === 0) {
      throw new Error("No se recibieron datos de la maquinaria en el repositorio.");
    }
    const {machinery_id, status_id, serial_number, is_owned, stock_quantity} = stockData;

    const query = `
      INSERT INTO machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [machinery_id, status_id, serial_number, is_owned, stock_quantity];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Ya existe una maquina motorizada registrada con este serial.');
      }
      throw error;
    }
  }




  async findAll() {
    const result = await pool.query("SELECT * FROM machinery_stock");
    return result.rows;
  }




  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM machinery_stock WHERE stock_id = $1",
      [id]
    );
    return result.rows[0];
  }




  async update(id, stockData) {
    if (!stockData) throw new Error("Datos insuficientes para actualizar.");

    const {machinery_id, status_id, serial_number,next_revision_date, is_owned, stock_quantity} = stockData;

    const query = `
      UPDATE machinery_stock
      SET machinery_id = $1,
      status_id = $2,
      serial_number = $3,
      next_revision_date = $4,
      is_owned = $5,
      stock_quantity = $6
      WHERE stock_id = $7
      RETURNING *
    `;

    const values = [
      machinery_id, status_id, serial_number, next_revision_date, is_owned, stock_quantity,
      id
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Ya existe una maquina motorizada registrada con este serial.');
      }
      throw error;
    }
  }




  async delete(id) {
    const result = await pool.query(
      "DELETE FROM machinery_stock WHERE stock_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }




  async findTableData(page = 1, limit = 10, search="") {

    const offset = (page - 1) * limit;

    const query = `
        SELECT
            s.stock_id,
            e.status_name,
            s.serial_number
        FROM machinery_stock s
        INNER JOIN machinery_status e ON s.status_id = e.status_id
        WHERE
            $1 = ''
            OR LOWER(serial_number) LIKE LOWER($2)
        ORDER BY stock_id
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM machinery_stock
        WHERE
            $1 = ''
            OR LOWER(serial_number) LIKE LOWER($2)
        `,
        [search, `%${search}%`]
    );

    const total = Number(totalQuery.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

  }



  //---------------------
  // métodos que antes estaban en machineryRepository
  //----------------------
  async discountStock(
    stockId,
    quantity,
    client = pool
  ) {

    const query = `
      UPDATE machinery_stock
      SET stock_quantity =
          stock_quantity - $1
      WHERE stock_id = $2
      RETURNING *
    `;

    const result =
      await client.query(
        query,
        [quantity, stockId]
      );

    return result.rows[0];
  }



  async increaseStock(
    stockId,
    quantity,
    client = pool
  ) {

    const query = `
      UPDATE machinery_stock
      SET stock_quantity =
          stock_quantity + $1
      WHERE stock_id = $2
      RETURNING *
    `;

    const result =
      await client.query(
        query,
        [quantity, stockId]
      );

    return result.rows[0];

  }



  // oe que mierda tan inútil, luego se debe buscar en donde se consume esto pa hacer que consuma incraseStock
  async incrementStock(
    stockId,
    quantity,
    client = pool
  ) {

    return await this.increaseStock(
      stockId,
      quantity,
      client
    );
  }





  async setOccupied(
    stockId,
    client = pool
  ) {

    const query = `
      UPDATE machinery_stock
      SET status_id = 3
      WHERE stock_id = $1
      RETURNING *
    `;

    const result =
      await client.query(
        query,
        [stockId]
      );

    return result.rows[0];
  }




  async setAvailable(
    stockId,
    client = pool
  ) {

    const query = `
      UPDATE machinery_stock
      SET status_id = 1
      WHERE stock_id = $1
      RETURNING *
    `;

    const result =
      await client.query(
        query,
        [stockId]
      );

    return result.rows[0];

  }





  async setMaintenance(
    stockId,
    client = pool
  ) {

    const query = `
      UPDATE machinery_stock
      SET status_id = 2
      WHERE stock_id = $1
      RETURNING *
    `;

    const result =
      await client.query(
        query,
        [stockId]
      );

    return result.rows[0];

  }
}