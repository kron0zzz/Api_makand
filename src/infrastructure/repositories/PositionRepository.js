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

    const result =
      await pool.query("SELECT * FROM positions");

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
}