const pool = require('../db/pool');

function toApiShape(row) {
  return {
    id: row.id,
    customer: {
      name: row.customer_name,
      email: row.customer_email,
      address: row.customer_address
    },
    items: row.items,
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at
  };
}

async function saveOrder(order) {
  const result = await pool.query(
    `INSERT INTO orders (id, customer_name, customer_email, customer_address, items, total, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      order.id,
      order.customer.name,
      order.customer.email,
      order.customer.address,
      JSON.stringify(order.items),
      order.total,
      order.status
    ]
  );
  return toApiShape(result.rows[0]);
}

async function getOrder(orderId) {
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
  return result.rows.length ? toApiShape(result.rows[0]) : null;
}

async function listOrders() {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return result.rows.map(toApiShape);
}

module.exports = { saveOrder, getOrder, listOrders };
