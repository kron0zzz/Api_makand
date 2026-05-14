import pool from "../../config/database.js";

export default class CustomerRepositoryPrisma {

  async create(customerData) {
    if (!customerData || Object.keys(customerData).length === 0) {
      throw new Error("No se recibieron datos del cliente en el repositorio.");
    }

    const query = `
      INSERT INTO customers (
        customer_document_type, 
        customer_document_number, 
        customer_status, 
        customer_first_name, 
        customer_last_name, 
        customer_address, 
        customer_phone, 
        customer_email, 
        organization_type
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      customerData.customer_document_type || customerData.tipoDocumento || 'CC', // Default si viene nulo
      customerData.customer_document_number || customerData.documento || '0',
      customerData.customer_status !== undefined ? customerData.customer_status : true,
      customerData.customer_first_name || customerData.firstName || 'Sin Nombre',
      customerData.customer_last_name || customerData.lastName || 'Sin Apellido',
      customerData.customer_address || customerData.direccion || '',
      customerData.customer_phone || customerData.telefono || '0',
      customerData.customer_email || customerData.email || '',
      customerData.organization_type || customerData.tipoOrganizacion || 'Natural'
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM customers");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [id]
    );
    return result.rows[0];
  }

  async update(id, customerData) {
    if (!customerData) throw new Error("Datos insuficientes para actualizar.");

    const query = `
      UPDATE customers
      SET 
        customer_document_type = $1, 
        customer_document_number = $2,
        customer_status = $3, 
        customer_first_name = $4, 
        customer_last_name = $5, 
        customer_address = $6, 
        customer_phone = $7, 
        customer_email = $8, 
        organization_type = $9
      WHERE customer_id = $10
      RETURNING *
    `;

    const values = [
      customerData.customer_document_type || customerData.tipoDocumento || 'CC', 
      customerData.customer_document_number || customerData.documento,
      customerData.customer_status !== undefined ? customerData.customer_status : true, 
      customerData.customer_first_name || customerData.firstName,
      customerData.customer_last_name || customerData.lastName,
      customerData.customer_address || customerData.direccion,
      customerData.customer_phone || customerData.telefono,
      customerData.customer_email || customerData.email,
      customerData.organization_type || customerData.tipoOrganizacion || 'Natural',
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM customers WHERE customer_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData() {
    const query = `
      SELECT
      customer_id,
      customer_document_type,
      customer_document_number,
      customer_first_name,
      customer_last_name,
      customer_address,
      customer_phone,
      customer_email,
      customer_status,
      organization_type
      FROM customers
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}


