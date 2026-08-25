import pool from "../../config/database.js";

export default class DashboardRepository {

  async getSummaryCounts() {
    const query = `
      SELECT
        (SELECT COUNT(*) FROM orders) AS "totalOrders",
        (
          SELECT COUNT(*) FROM orders o
          INNER JOIN order_status os ON o.order_status_id = os.order_status_id
          WHERE os.order_status_name NOT IN ('Cerrado', 'Anulado')
        ) AS "activeOrders",
        (SELECT COUNT(*) FROM customers) AS "totalCustomers",
        (SELECT COUNT(*) FROM employees) AS "totalEmployees",
        (SELECT COUNT(*) FROM machinery) AS "totalMachinery",
        (SELECT COUNT(*) FROM suppliers) AS "totalSuppliers",
        (SELECT COUNT(*) FROM projects) AS "totalProjects",
        (SELECT COUNT(*) FROM users) AS "totalUsers"
    `;

    const result = await pool.query(query);

    const row = result.rows[0];

    return {
      totalOrders: Number(row.totalOrders),
      activeOrders: Number(row.activeOrders),
      totalCustomers: Number(row.totalCustomers),
      totalEmployees: Number(row.totalEmployees),
      totalMachinery: Number(row.totalMachinery),
      totalSuppliers: Number(row.totalSuppliers),
      totalProjects: Number(row.totalProjects),
      totalUsers: Number(row.totalUsers)
    };
  }

  async getFinancialSummary() {
    const query = `
      SELECT
        COALESCE((SELECT SUM(cut_amount) FROM rental_cuts), 0) AS "totalBilled",
        COALESCE((SELECT SUM(payment_amount) FROM payments WHERE is_cancelled = FALSE), 0) AS "totalPaid",
        COALESCE((SELECT SUM(discount_amount) FROM orders), 0) AS "totalDiscount",
        COALESCE(
          (
            SELECT SUM(payment_amount)
            FROM payments
            WHERE is_cancelled = FALSE
              AND DATE_TRUNC('month', payment_date) = DATE_TRUNC('month', CURRENT_DATE)
          ),
          0
        ) AS "revenueThisMonth"
    `;

    const result = await pool.query(query);

    const row = result.rows[0];

    const totalBilled = Number(row.totalBilled);
    const totalPaid = Number(row.totalPaid);
    const totalDiscount = Number(row.totalDiscount);
    const revenueThisMonth = Number(row.revenueThisMonth);

    return {
      totalBilled,
      totalPaid,
      totalDiscount,
      revenueThisMonth,
      totalPendingBalance: totalBilled - totalDiscount - totalPaid
    };
  }

  async getOrdersByStatus() {
    const query = `
      SELECT
        os.order_status_name AS "statusName",
        COUNT(o.order_id) AS "count"
      FROM order_status os
      LEFT JOIN orders o ON o.order_status_id = os.order_status_id
      GROUP BY os.order_status_id, os.order_status_name
      ORDER BY os.order_status_id
    `;

    const result = await pool.query(query);

    return result.rows.map((row) => ({
      statusName: row.statusName,
      count: Number(row.count)
    }));
  }

  async getMachineryByStatus() {
    const query = `
      SELECT
        ms.status_name AS "statusName",
        COUNT(mstk.stock_id) AS "count"
      FROM machinery_status ms
      LEFT JOIN machinery_stock mstk ON mstk.status_id = ms.status_id
      GROUP BY ms.status_id, ms.status_name
      ORDER BY ms.status_id
    `;

    const result = await pool.query(query);

    return result.rows.map((row) => ({
      statusName: row.statusName,
      count: Number(row.count)
    }));
  }

  async getRecentOrders(limit = 5) {
    const query = `
      SELECT
        o.order_id,
        o.order_creation_date,
        os.order_status_name AS "statusName",
        p.project_name,
        c.customer_name,
        o.discount_amount
      FROM orders o
      INNER JOIN projects p ON o.project_id = p.project_id
      INNER JOIN customers c ON p.customer_id = c.customer_id
      INNER JOIN order_status os ON o.order_status_id = os.order_status_id
      ORDER BY o.order_id DESC
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);

    return result.rows.map((row) => ({
      order_id: row.order_id,
      order_creation_date: row.order_creation_date,
      statusName: row.statusName,
      project_name: row.project_name,
      customer_name: row.customer_name,
      discount_amount: row.discount_amount
    }));
  }

  async getRecentPayments(limit = 5) {
    const query = `
      SELECT
        p.payment_id,
        p.order_id,
        p.payment_amount,
        p.payment_date,
        p.payment_in_cash,
        p.is_cancelled
      FROM payments p
      INNER JOIN orders o ON p.order_id = o.order_id
      ORDER BY p.payment_id DESC
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);

    return result.rows.map((row) => ({
      payment_id: row.payment_id,
      order_id: row.order_id,
      payment_amount: row.payment_amount,
      payment_date: row.payment_date,
      payment_in_cash: row.payment_in_cash,
      is_cancelled: row.is_cancelled
    }));
  }

  async getStats(limit = 5) {
    const [
      summary,
      financial,
      ordersByStatus,
      machineryByStatus,
      recentOrders,
      recentPayments
    ] = await Promise.all([
      this.getSummaryCounts(),
      this.getFinancialSummary(),
      this.getOrdersByStatus(),
      this.getMachineryByStatus(),
      this.getRecentOrders(limit),
      this.getRecentPayments(limit)
    ]);

    return {
      summary,
      financial,
      ordersByStatus,
      machineryByStatus,
      recentOrders,
      recentPayments
    };
  }
}
