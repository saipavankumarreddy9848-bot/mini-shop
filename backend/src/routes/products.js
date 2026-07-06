const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// Maps a DB row (snake_case) to the API shape (camelCase) our frontend expects
function toApiShape(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    stock: row.stock,
    imageUrl: row.image_url
  };
}

// GET /api/products?category=electronics&search=headphones
router.get('/', async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const conditions = [];
    const values = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }
    if (search) {
      values.push(`%${search.toLowerCase()}%`);
      conditions.push(`(LOWER(name) LIKE $${values.length} OR LOWER(description) LIKE $${values.length})`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await pool.query(`SELECT * FROM products ${where} ORDER BY name`, values);

    res.json({ count: result.rows.length, products: result.rows.map(toApiShape) });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(toApiShape(result.rows[0]));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
