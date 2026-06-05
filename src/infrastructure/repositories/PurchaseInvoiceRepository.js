// src/infrastructure/repositories/PurchaseInvoiceRepository.js
import pool from "../../config/database.js";

export default class PurchaseInvoiceRepository {
  async create(invoiceData) {
    const { supplier_id, purchase_date, machinery_name, invoice_photo } = invoiceData;

    // Convertimos la foto de Base64 a un Buffer para la columna BYTEA de PostgreSQL
    const photoBuffer = invoice_photo 
      ? Buffer.from(invoice_photo.split(',')[1] || invoice_photo, 'base64') 
      : null;

    const query = `
      INSERT INTO purchase_invoices (supplier_id, purchase_date, machinery_name, invoice_photo)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [supplier_id, purchase_date || new Date(), machinery_name, photoBuffer];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM purchase_invoices");
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT 
        pi.invoice_id, 
        pi.supplier_id, 
        pi.purchase_date, 
        pi.machinery_name, 
        pi.invoice_photo,
        s.supplier_name AS supplier_name
      FROM purchase_invoices pi
      INNER JOIN suppliers s ON pi.supplier_id = s.supplier_id
      WHERE pi.invoice_id = $1
    `;
    const result = await pool.query(query, [id]);
    const row = result.rows[0];
    
    if (row && row.invoice_photo) {
      // Convertimos el Buffer BYTEA a Base64 string para que se renderice directamente en el <img> del frontend
      row.invoice_photo = `data:image/jpeg;base64,${row.invoice_photo.toString('base64')}`;
    }
    return row;
  }

  async update(id, invoiceData) {
    const { supplier_id, purchase_date, machinery_name, invoice_photo } = invoiceData;

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
        machinery_name = $3, 
        invoice_photo = COALESCE($4, invoice_photo)
      WHERE invoice_id = $5
      RETURNING *
    `;
    const values = [supplier_id, purchase_date, machinery_name, photoBuffer, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM purchase_invoices WHERE invoice_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData() {
    const query = `
      SELECT 
        pi.invoice_id,
        pi.purchase_date,
        pi.machinery_name,
        s.supplier_name AS supplier_name
      FROM purchase_invoices pi
      INNER JOIN suppliers s ON pi.supplier_id = s.supplier_id
      ORDER BY pi.invoice_id DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}