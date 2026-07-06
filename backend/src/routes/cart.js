const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { getCart, saveCart } = require('../data/cartStore');

function cartTotal(cart) {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// GET /api/cart
router.get('/', (req, res) => {
  const cart = getCart(req.cartId);
  res.json({ ...cart, total: cartTotal(cart) });
});

// POST /api/cart/items  { productId, quantity }
router.post('/items', async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const product = result.rows[0];
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    const cart = getCart(req.cartId);
    const existing = cart.items.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        quantity
      });
    }
    saveCart(cart);
    res.status(201).json({ ...cart, total: cartTotal(cart) });
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/items/:productId  { quantity }
router.put('/items/:productId', (req, res) => {
  const { quantity } = req.body;
  const cart = getCart(req.cartId);
  const item = cart.items.find((i) => i.productId === req.params.productId);
  if (!item) {
    return res.status(404).json({ error: 'Item not in cart' });
  }
  if (quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }
  item.quantity = quantity;
  saveCart(cart);
  res.json({ ...cart, total: cartTotal(cart) });
});

// DELETE /api/cart/items/:productId
router.delete('/items/:productId', (req, res) => {
  const cart = getCart(req.cartId);
  cart.items = cart.items.filter((i) => i.productId !== req.params.productId);
  saveCart(cart);
  res.json({ ...cart, total: cartTotal(cart) });
});

module.exports = router;
