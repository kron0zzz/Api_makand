import pool from "../../config/database.js";

export default class CustomerRepositoryPrisma {

  async create(customerData) {
    if (!customerData || Object.keys(customerData).length === 0) {
      throw new Error("No se recibieron datos del cliente en el repositorio.");
    }

    const query = `
      INSERT INTO customers (
        organization_type,
        customer_document_type,
        customer_document_number,
        customer_name,
        legal_representative,
        customer_address,
        customer_phone,
        customer_email
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      customerData.organization_type || customerData.tipoOrganizacion || 'Natural',
      customerData.customer_document_type || customerData.tipoDocumento || 'CC', // Default si viene nulo
      customerData.customer_document_number || customerData.documento || '0',
      customerData.customer_name || customerData.firstName || 'Sin Nombre',
      customerData.legal_representative || customerData.legal_representative || null,
      customerData.customer_address || customerData.direccion || '',
      customerData.customer_phone || customerData.telefono || '0',
      customerData.customer_email || customerData.email || '',
      
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
        organization_type = $1,
        customer_document_type = $2,
        customer_document_number = $3,
        customer_status = $4,
        customer_name = $5,
        legal_representative = $6,
        customer_address = $7,
        customer_phone = $8,
        customer_email = $9
      WHERE customer_id = $10
      RETURNING *
    `;

    const values = [
      customerData.organization_type || customerData.tipoOrganizacion || 'Natural',
      customerData.customer_document_type || customerData.tipoDocumento || 'CC', 
      customerData.customer_document_number || customerData.documento,
      customerData.customer_status !== undefined ? customerData.customer_status : true, 
      customerData.customer_name || customerData.firstName,
      customerData.legal_representative || customerData.legal_representative,
      customerData.customer_address || customerData.direccion,
      customerData.customer_phone || customerData.telefono,
      customerData.customer_email || customerData.email,
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

  async findTableData(page=1, limit=10, search="") {
    const offset = (page - 1) * limit;

    const query = `
        SELECT
            customer_id,
            customer_name,
            customer_document_number,
            customer_status
        FROM customers
        WHERE
            $1 = ''
            OR LOWER(customer_name) LIKE LOWER($2) 
        ORDER BY customer_id
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM customers
        WHERE
            $1 = ''
            OR LOWER(customer_name) LIKE LOWER($2) 
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


