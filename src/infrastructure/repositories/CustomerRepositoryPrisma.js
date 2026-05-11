// import pool from "../../config/database.js";

// export default class CustomerRepository {

//   async create(customerData) {
//     const { 
//       client_document_type, 
//       client_document_number, 
//       client_status, 
//       client_first_name, 
//       client_last_name, 
//       client_address, 
//       client_phone, 
//       client_email, 
//       organization_type 
//     } = customerData;

//     const query = `
//       INSERT INTO clients (
//         client_document_type, 
//         client_document_number, 
//         client_status, 
//         client_first_name, 
//         client_last_name, 
//         client_address, 
//         client_phone, 
//         client_email, 
//         organization_type
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//       RETURNING *
//     `;

//     const values = [
//       client_document_type, 
//       client_document_number, 
//       client_status, 
//       client_first_name, 
//       client_last_name, 
//       client_address, 
//       client_phone, 
//       client_email, 
//       organization_type
//     ];

//     const result = await pool.query(query, values);
//     return result.rows[0];
//   }

//   async findAll() {
//     const result = await pool.query("SELECT * FROM clients");
//     return result.rows;
//   }

//   async findById(id) {
//     const result = await pool.query(
//       "SELECT * FROM clients WHERE client_id = $1",
//       [id]
//     );
//     return result.rows[0];
//   }

//   async update(id, customerData) {
//     const { 
//       client_document_type, 
//       client_document_number, 
//       client_status, 
//       client_first_name, 
//       client_last_name, 
//       client_address, 
//       client_phone, 
//       client_email, 
//       organization_type 
//     } = customerData;

//     const query = `
//       UPDATE clients
//       SET 
//         client_document_type = $1, 
//         client_document_number = $2,
//         client_status = $3, 
//         client_first_name = $4, 
//         client_last_name = $5, 
//         client_address = $6, 
//         client_phone = $7, 
//         client_email = $8, 
//         organization_type = $9
//       WHERE client_id = $10
//       RETURNING *
//     `;

//     const values = [
//       client_document_type, 
//       client_document_number, 
//       client_status, 
//       client_first_name, 
//       client_last_name, 
//       client_address, 
//       client_phone, 
//       client_email, 
//       organization_type, 
//       id
//     ];

//     const result = await pool.query(query, values);
//     return result.rows[0];
//   }

//   async delete(id) {
//     const result = await pool.query(
//       "DELETE FROM clients WHERE client_id = $1 RETURNING *",
//       [id]
//     );
//     return result.rows[0];
//   }
// }


import pool from "../../config/database.js";

export default class CustomerRepositoryPrisma {

  async create(customerData) {
    // 1. Validación de seguridad para evitar el error de "undefined"
    if (!customerData || Object.keys(customerData).length === 0) {
      throw new Error("No se recibieron datos del cliente en el repositorio.");
    }

    const { 
      client_document_type, 
      client_document_number, 
      client_status, 
      client_first_name, 
      client_last_name, 
      client_address, 
      client_phone, 
      client_email, 
      organization_type 
    } = customerData;

    const query = `
      INSERT INTO clients (
        client_document_type, 
        client_document_number, 
        client_status, 
        client_first_name, 
        client_last_name, 
        client_address, 
        client_phone, 
        client_email, 
        organization_type
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      client_document_type, 
      client_document_number, 
      client_status, 
      client_first_name, 
      client_last_name, 
      client_address, 
      client_phone, 
      client_email, 
      organization_type
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM clients");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM clients WHERE client_id = $1",
      [id]
    );
    return result.rows[0];
  }

  async update(id, customerData) {
    if (!customerData) throw new Error("Datos insuficientes para actualizar.");

    const { 
      client_document_type, 
      client_document_number, 
      client_status, 
      client_first_name, 
      client_last_name, 
      client_address, 
      client_phone, 
      client_email, 
      organization_type 
    } = customerData;

    const query = `
      UPDATE clients
      SET 
        client_document_type = $1, 
        client_document_number = $2,
        client_status = $3, 
        client_first_name = $4, 
        client_last_name = $5, 
        client_address = $6, 
        client_phone = $7, 
        client_email = $8, 
        organization_type = $9
      WHERE client_id = $10
      RETURNING *
    `;

    const values = [
      client_document_type, 
      client_document_number, 
      client_status, 
      client_first_name, 
      client_last_name, 
      client_address, 
      client_phone, 
      client_email, 
      organization_type, 
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM clients WHERE client_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}