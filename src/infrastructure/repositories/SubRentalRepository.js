import pool from "../../config/database.js";

export default class SubRentalRepository {
  async create(subRentalData) {
    const { stock_id, supplier_id, supplier_cost, sub_rental_status } = subRentalData;

    const query = `
      INSERT INTO sub_rentals (stock_id, supplier_id, supplier_cost, sub_rental_status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [stock_id, supplier_id, supplier_cost, sub_rental_status ?? true];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM sub_rentals");
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT 
        sr.sub_rental_id,
        sr.stock_id,
        sr.supplier_id,
        sr.supplier_cost,
        sr.sub_rental_status,
        m.machinery_name AS machinery_name,
        ms.serial_number,
        s.supplier_name AS supplier_name
      FROM sub_rentals sr
      INNER JOIN machinery_stock ms ON sr.stock_id = ms.stock_id
      INNER JOIN machinery m ON ms.machinery_id = m.machinery_id
      INNER JOIN suppliers s ON sr.supplier_id = s.supplier_id
      WHERE sr.sub_rental_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async update(id, subRentalData) {
    const { stock_id, supplier_id, supplier_cost, sub_rental_status } = subRentalData;

    const query = `
      UPDATE sub_rentals
      SET 
        stock_id = $1, 
        supplier_id = $2, 
        supplier_cost = $3, 
        sub_rental_status = $4
      WHERE sub_rental_id = $5
      RETURNING *
    `;
    const values = [stock_id, supplier_id, supplier_cost, sub_rental_status, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM sub_rentals WHERE sub_rental_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData(page=1, limit=10, search="") {
    const offset = (page - 1) * limit;

    const query = `
        SELECT
            sr.sub_rental_id,
            sr.stock_id,
            sr.supplier_id,
            sr.supplier_cost,
            sr.sub_rental_status,
            m.machinery_name AS machinery_name,
            ms.serial_number,
            s.supplier_name AS supplier_name
        FROM sub_rentals sr
        INNER JOIN machinery_stock ms ON sr.stock_id = ms.stock_id
        INNER JOIN machinery m ON ms.machinery_id = m.machinery_id
        INNER JOIN suppliers s ON sr.supplier_id = s.supplier_id
        WHERE
            $1 = ''
            OR LOWER(m.machinery_name) LIKE LOWER($2) 
            OR LOWER(s.supplier_name) LIKE LOWER($2) 
        ORDER BY sr.sub_rental_id DESC
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM sub_rentals sr
        INNER JOIN machinery_stock ms ON sr.stock_id = ms.stock_id
        INNER JOIN machinery m ON ms.machinery_id = m.machinery_id
        INNER JOIN suppliers s ON sr.supplier_id = s.supplier_id
        WHERE
            $1 = ''
            OR LOWER(m.machinery_name) LIKE LOWER($2)
            OR LOWER(s.supplier_name) LIKE LOWER($2) 
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
}