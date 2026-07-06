const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const pool = require('../db/pool');
const { getCart, deleteCart } = require('../data/cartStore');
const { saveOrder } = require('../data/orderStore');

// POST /api/checkout  { customer: { name, email, address } }
// Runs stock validation + decrement + order creation inside a single DB
// transaction, so a failure partway through rolls everything back instead
// of leaving stock decremented with no order (or vice versa). This is the
// same "reserve -> confirm" idea the Step Functions saga would model later,
// just done with a SQL transaction instead of an orchestrated workflow.
router.post('/', async (req, res, next) => {
  const { customer } = req.body;
  if (!customer || !customer.name || !customer.email || !customer.address) {
    return res.status(400).json({ error: 'customer.name, customer.email, and customer.address are required' });
  }

  const cart = getCart(req.cartId);
  if (cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Lock and validate stock for every line item (FOR UPDATE prevents
    // a race where two checkouts both read stock before either decrements it)
    for (const item of cart.items) {
      const result = await client.query('SELECT stock FROM products WHERE id = $1 FOR UPDATE', [item.productId]);
      if (result.rows.length === 0 || result.rows[0].stock < item.quantity) {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: `Insufficient stock for ${item.name}` });
      }
    }

    // 2. Simulate payment authorization (this is where Stripe would go)
    const paymentSucceeded = true; // placeholder for real payment integration
    if (!paymentSucceeded) {
      await client.query('ROLLBACK');
      return res.status(402).json({ error: 'Payment failed' });
    }

    // 3. Decrement stock
    for (const item of cart.items) {
      await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.productId]);
    }

    await client.query('COMMIT');

    // 4. Create the order (uses its own connection via orderStore/pool)
    const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await saveOrder({
      id: uuidv4(),
      customer,
      items: cart.items,
      total,
      status: 'confirmed'
    });

    // 5. Clear the cart
    deleteCart(req.cartId);

    res.status(201).json(order);
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
