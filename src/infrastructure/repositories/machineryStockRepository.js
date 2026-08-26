import pool from "../../config/database.js";

export default class MachineryStockRepository {

  async create(stockData, client = pool) {
    if (!stockData || Object.keys(stockData).length === 0) {
      throw new Error("No se recibieron datos del stock en el repositorio.");
    }
    const {machinery_id, status_id, serial_number, is_owned, stock_quantity} = stockData;

    const query = `
      INSERT INTO machinery_stock (machinery_id, status_id, serial_number, is_owned, stock_quantity)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [machinery_id, status_id, serial_number, is_owned, stock_quantity];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        if (error.constraint_name && error.constraint_name.includes('serial_number')) {
          throw new Error('Ya existe un registro con este número de serie.');
        }
        throw new Error('Ya existe un registro con un valor único duplicado.');
      }
      throw error;
    }
  }



  async findAll(client = pool) {
    const result = await client.query("SELECT * FROM machinery_stock");
    return result.rows;
  }



  async findById(id, client = pool) {
    const result = await client.query(
      `SELECT ms.*, m.machinery_name, m.is_motorized, m.weight_kg
       FROM machinery_stock ms
       INNER JOIN machinery m ON ms.machinery_id = m.machinery_id
       WHERE ms.stock_id = $1`,
      [id]
    );
    return result.rows[0];
  }

  async findByMachineryId(machineryId, client = pool) {
    const result = await client.query(
      `SELECT ms.*, m.machinery_name, m.is_motorized
       FROM machinery_stock ms
       INNER JOIN machinery m ON ms.machinery_id = m.machinery_id
       WHERE ms.machinery_id = $1`,
      [machineryId]
    );
    return result.rows[0];
  }



  async update(id, stockData, client = pool) {
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
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        if (error.constraint_name && error.constraint_name.includes('serial_number')) {
          throw new Error('Ya existe un registro con este número de serie.');
        }
        throw new Error('Ya existe un registro con un valor único duplicado.');
      }
      throw error;
    }
  }



  async delete(id, client = pool) {
    const result = await client.query(
      "DELETE FROM machinery_stock WHERE stock_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }



  async findTableData(page = 1, limit = 10, search="", client = pool) {

    const offset = (page - 1) * limit;

    const query = `
        SELECT
            s.stock_id,
            m.machinery_name,
            s.machinery_id,
            s.status_id,
            e.status_name,
            s.serial_number,
            s.stock_quantity,
            s.is_owned,
            s.next_revision_date
        FROM machinery_stock s
        INNER JOIN machinery m ON s.machinery_id = m.machinery_id
        INNER JOIN machinery_status e ON s.status_id = e.status_id
        WHERE
            $1 = ''
            OR LOWER(serial_number) LIKE LOWER($2)
            OR LOWER(m.machinery_name) LIKE LOWER($2)
        ORDER BY stock_id
        LIMIT $3
        OFFSET $4
    `;

    const result = await client.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await client.query(
        `
        SELECT COUNT(*)
        FROM machinery_stock s
        INNER JOIN machinery m ON s.machinery_id = m.machinery_id
        WHERE
            $1 = ''
            OR LOWER(s.serial_number) LIKE LOWER($2)
            OR LOWER(m.machinery_name) LIKE LOWER($2)
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