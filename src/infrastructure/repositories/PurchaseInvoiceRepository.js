// src/infrastructure/repositories/PurchaseInvoiceRepository.js
import pool from "../../config/database.js";

export default class PurchaseInvoiceRepository {
  async create(invoiceData, client = pool) {
    const { supplier_id, purchase_date, total_amount, invoice_photo } = invoiceData;

    const photoBuffer = invoice_photo 
      ? Buffer.from(invoice_photo.split(',')[1] || invoice_photo, 'base64') 
      : null;

    const query = `
      INSERT INTO purchase_invoices (supplier_id, purchase_date, total_amount, invoice_photo)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [supplier_id, purchase_date || new Date(), total_amount, photoBuffer];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  async findAll(client = pool) {
    const result = await client.query("SELECT * FROM purchase_invoices");
    return result.rows;
  }

  async findById(id, client = pool) {
    const query = `
      SELECT 
        pi.invoice_id, 
        pi.supplier_id, 
        pi.purchase_date, 
        pi.total_amount,
        pi.invoice_photo,
        s.supplier_name AS supplier_name
      FROM purchase_invoices pi
      INNER JOIN suppliers s ON pi.supplier_id = s.supplier_id
      WHERE pi.invoice_id = $1
    `;
    const result = await client.query(query, [id]);
    const row = result.rows[0];
    
    if (row && row.invoice_photo) {
      row.invoice_photo = `data:image/jpeg;base64,${row.invoice_photo.toString('base64')}`;
    }
    return row;
  }

  async update(id, invoiceData, client = pool) {
    const { supplier_id, purchase_date, total_amount, invoice_photo} = invoiceData;

    let photoBuffer = null;
    if (invoice_photo) {
      const base64Data = invoice_photo.includes(',') ? invoice_photo.split(',')[1] : invoice_photo;
      photoBuffer = Buffer.from(base64Data, 'base64');
    }

    const query = `
      UPDATE purchase_invoices
      SET 
        supplier_id = $1, 
        purchase_date = $2,
        total_amount =$3, 
        invoice_photo = COALESCE($4, invoice_photo)
      WHERE invoice_id = $5
      RETURNING *
    `;
    const values = [ supplier_id, purchase_date, total_amount, photoBuffer, id];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  async delete(id, client = pool) {
    const result = await client.query(
      "DELETE FROM purchase_invoices WHERE invoice_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData(page=1, limit=10, search="", client = pool) {
    const offset = (page - 1) * limit;

    const query = `
        SELECT
            pi.invoice_id,
            pi.purchase_date,
            s.supplier_name AS supplier_name,
            pi.total_amount
        FROM purchase_invoices pi
        INNER JOIN suppliers s ON pi.supplier_id = s.supplier_id

        WHERE
            $1 = ''
            OR LOWER(s.supplier_name) LIKE LOWER($2)  
        ORDER BY pi.invoice_id DESC
        LIMIT $3
        OFFSET $4
    `;

    const result = await client.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await client.query(
        `
        SELECT COUNT(*)
        FROM purchase_invoices pi
        INNER JOIN suppliers s ON pi.supplier_id = s.supplier_id
        WHERE
            $1 = ''
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