import pool from "../../config/database.js";

export default class SupplierRepository {

 /* async create(supplierData) {

    const { name, phone, email } = supplierData;

    const query = `
      INSERT INTO suppliers (name, phone, email)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [name, phone, email];

    const result = await pool.query(query, values);

    return result.rows[0];
  }*/
  async findAll() {

    const result =
      await pool.query("SELECT * FROM suppliers");

    return result.rows;
  }

  /*async findById(id) {

    const result = await pool.query(
      "SELECT * FROM suppliers WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }

  async update(id, supplierData) {

    const { name, phone, email } = supplierData;

    const query = `
      UPDATE suppliers
      SET name = $1,
          phone = $2,
          email = $3
      WHERE id = $4
      RETURNING *
    `;

    const values = [name, phone, email, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  async delete(id) {

    const result = await pool.query(
      "DELETE FROM suppliers WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }*/
}