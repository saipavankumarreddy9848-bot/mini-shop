const express = require('express');
const router = express.Router();
const { getOrder, listOrders } = require('../data/orderStore');

// GET /api/orders  (for an admin view / debugging)
router.get('/', async (req, res, next) => {
  try {
    res.json(await listOrders());
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await getOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
