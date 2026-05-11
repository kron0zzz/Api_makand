import pool from "../../config/database.js";

export default class SupplierRepository {

  async create(supplierData) {

    const { document_type, document_number,supplier_status, supplier_name, supplier_address, supplier_phone, supplier_email, supplier_state, supplier_city } = supplierData;

    const query = `
      INSERT INTO suppliers (document_type, document_number,supplier_status, supplier_name, supplier_address, supplier_phone, supplier_email, supplier_state, supplier_city)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [document_type, document_number,supplier_status, supplier_name, supplier_address, supplier_phone, supplier_email, supplier_state, supplier_city];

    const result = await pool.query(query, values);

    return result.rows[0];
  }


  async findAll() {

    const result =
      await pool.query("SELECT * FROM suppliers");

    return result.rows;
  }



  async findById(id) {

    const result = await pool.query(
      "SELECT * FROM suppliers WHERE supplier_id = $1",
      [id]
    );

    return result.rows[0];
  }


  
  async update(id, supplierData) {

    const { document_type, document_number,supplier_status, supplier_name, supplier_address, supplier_phone, supplier_email, supplier_state, supplier_city } = supplierData;

    const query = `
      UPDATE suppliers
      SET document_type = $1, 
      document_number = $2,
      supplier_status = $3, 
      supplier_name = $4, 
      supplier_address = $5, 
      supplier_phone = $6, 
      supplier_email = $7, 
      supplier_state = $8, 
      supplier_city = $9
      WHERE supplier_id = $10
      RETURNING *
    `;

    const values = [ document_type, document_number,supplier_status, supplier_name, supplier_address, supplier_phone, supplier_email, supplier_state, supplier_city, id];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }

  
  async delete(id) {

    const result = await pool.query(
      "DELETE FROM suppliers WHERE supplier_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }
}