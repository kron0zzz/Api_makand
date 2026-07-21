import pool from "../../config/database.js";

export default class PositionRepository {

  async create(positionData) {

    const { position_name } = positionData;

    const query = `
      INSERT INTO positions (
      position_name)
      VALUES ($1)
      RETURNING *
    `;

    const values = [position_name];

    const result = await pool.query(query, values);

    return result.rows[0];
  }


  async findAll() {
    const result = await pool.query("SELECT * FROM positions");
    return result.rows;
  }


  async findById(id) {

    const result = await pool.query(
      "SELECT * FROM positions WHERE position_id = $1",
      [id]
    );

    return result.rows[0];
  }


  
  async update(id, positionData) {

    const {position_name } = positionData;

    const query = `
      UPDATE positions
      SET position_name = $1
      WHERE position_id = $2
      RETURNING *
    `;

    const values = [ position_name, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  
  async delete(id) {

    const result = await pool.query(
      "DELETE FROM positions WHERE position_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }


  async findTableData(page = 1, limit = 10, search="") {

    const offset = (page - 1) * limit;

    const query = `
        SELECT
            position_id,
            position_name
        FROM positions
        WHERE
            $1 = ''
            OR LOWER(position_name) LIKE LOWER($2)
        ORDER BY position_id
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM positions
        WHERE
            $1 = ''
            OR LOWER(position_name) LIKE LOWER($2)
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