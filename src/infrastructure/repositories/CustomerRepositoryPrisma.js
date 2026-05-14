
// import pool from "../../config/database.js";

// export default class CustomerRepositoryPrisma {

//   async create(customerData) {
//     // 1. Validación de seguridad para evitar el error de "undefined"
//     if (!customerData || Object.keys(customerData).length === 0) {
//       throw new Error("No se recibieron datos del cliente en el repositorio.");
//     }

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
//     if (!customerData) throw new Error("Datos insuficientes para actualizar.");

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


//   async findTableData() {

//     const query = `
//       SELECT
//         client_id,
//         client_document_number,
//         client_first_name,
//         client_last_name,
//         client_status
//       FROM clients
//     `;

//     const result = await pool.query(query);

//     return result.rows;
//   }


// }























import pool from "../../config/database.js";

export default class CustomerRepositoryPrisma {

  /**
   * Crea un nuevo cliente en la base de datos PostgreSQL.
   * Soporta tanto nombres en snake_case como camelCase del Frontend.
   */
  async create(customerData) {
    if (!customerData || Object.keys(customerData).length === 0) {
      throw new Error("No se recibieron datos del cliente en el repositorio.");
    }

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
      customerData.client_document_type || customerData.tipoDocumento, 
      customerData.client_document_number || customerData.documento,
      customerData.client_status !== undefined ? customerData.client_status : customerData.estado, 
      customerData.client_first_name || customerData.firstName,
      customerData.client_last_name || customerData.lastName,
      customerData.client_address || customerData.direccion,
      customerData.client_phone || customerData.telefono,
      customerData.client_email || customerData.email,
      customerData.organization_type || customerData.tipoOrganizacion
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Obtiene todos los clientes con todas sus columnas.
   */
  async findAll() {
    const result = await pool.query("SELECT * FROM clients");
    return result.rows;
  }

  /**
   * Busca un cliente por su ID único.
   */
  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM clients WHERE client_id = $1",
      [id]
    );
    return result.rows[0];
  }

  /**
   * Actualiza un cliente existente. 
   * Útil para el formulario de edición y el Switch de estado.
   */
  async update(id, customerData) {
    if (!customerData) throw new Error("Datos insuficientes para actualizar.");

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
      customerData.client_document_type || customerData.tipoDocumento, 
      customerData.client_document_number || customerData.documento,
      customerData.client_status !== undefined ? customerData.client_status : customerData.estado, 
      customerData.client_first_name || customerData.firstName,
      customerData.client_last_name || customerData.lastName,
      customerData.client_address || customerData.direccion,
      customerData.client_phone || customerData.telefono,
      customerData.client_email || customerData.email,
      customerData.organization_type || customerData.tipoOrganizacion,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Elimina un cliente de la base de datos.
   */
  async delete(id) {
    const result = await pool.query(
      "DELETE FROM clients WHERE client_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  /**
   * Versión optimizada para la tabla principal (solo datos necesarios).
   */
  async findTableData() {
    const query = `
      SELECT
        client_id,
        client_document_number,
        client_first_name,
        client_last_name,
        client_status
      FROM clients
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}