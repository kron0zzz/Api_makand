// src/infrastructure/repositories/PurchaseInvoiceDetailRepository.js
import pool from "../../config/database.js";

export default class PurchaseInvoiceDetailRepository {
  async create(detailData) {
    const { invoice_id, machinery_id, quantity, unit_cost, subtotal } = detailData;

    const query = `
      INSERT INTO purchase_invoice_details (invoice_id, machinery_id, quantity, unit_cost, subtotal)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [invoice_id, machinery_id, quantity, unit_cost, subtotal];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query(`
      SELECT 
        pid.invoice_detail_id,
        pid.invoice_id,
        pid.machinery_id,
        pid.quantity,
        pid.unit_cost,
        pid.subtotal,
        m.machinery_name
      FROM purchase_invoice_details pid
      INNER JOIN machinery m ON pid.machinery_id = m.machinery_id
      ORDER BY pid.invoice_detail_id DESC
    `);
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT 
        pid.invoice_detail_id,
        pid.invoice_id,
        pid.machinery_id,
        pid.quantity,
        pid.unit_cost,
        pid.subtotal,
        m.machinery_name
      FROM purchase_invoice_details pid
      INNER JOIN machinery m ON pid.machinery_id = m.machinery_id
      WHERE pid.invoice_detail_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async findByInvoiceId(invoiceId) {
    const result = await pool.query(`
      SELECT 
        pid.invoice_detail_id,
        pid.invoice_id,
        pid.machinery_id,
        pid.quantity,
        pid.unit_cost,
        pid.subtotal,
        m.machinery_name
      FROM purchase_invoice_details pid
      INNER JOIN machinery m ON pid.machinery_id = m.machinery_id
      WHERE pid.invoice_id = $1
      ORDER BY pid.invoice_detail_id ASC
    `, [invoiceId]);
    return result.rows;
  }

  async update(id, detailData) {
    const { invoice_id, machinery_id, quantity, unit_cost, subtotal } = detailData;

    const query = `
      UPDATE purchase_invoice_details
      SET 
        invoice_id = $1,
        machinery_id = $2,
        quantity = $3,
        unit_cost = $4,
        subtotal = $5
      WHERE invoice_detail_id = $6
      RETURNING *
    `;
    const values = [invoice_id, machinery_id, quantity, unit_cost, subtotal, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM purchase_invoice_details WHERE invoice_detail_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  async findTableData(page = 1, limit = 10, search = "") {
    const offset = (page - 1) * limit;

    const query = `
      SELECT
        pid.invoice_detail_id,
        pid.invoice_id,
        pid.quantity,
        pid.unit_cost,
        pid.subtotal,
        m.machinery_name
      FROM purchase_invoice_details pid
      INNER JOIN machinery m ON pid.machinery_id = m.machinery_id
      WHERE
        $1 = ''
        OR LOWER(m.machinery_name) LIKE LOWER($2)
      ORDER BY pid.invoice_detail_id DESC
      LIMIT $3
      OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
      `
      SELECT COUNT(*)
      FROM purchase_invoice_details pid
      INNER JOIN machinery m ON pid.machinery_id = m.machinery_id
      WHERE
        $1 = ''
        OR LOWER(m.machinery_name) LIKE LOWER($2)
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
