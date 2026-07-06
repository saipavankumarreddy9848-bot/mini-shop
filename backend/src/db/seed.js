require('dotenv').config();
const pool = require('./pool');
const products = require('../data/products'); // reuse the same dummy data we already had

async function seed() {
  console.log('Seeding products...');
  for (const p of products) {
    await pool.query(
      `INSERT INTO products (id, name, description, price, category, stock, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         description = EXCLUDED.description,
         price = EXCLUDED.price,
         category = EXCLUDED.category,
         stock = EXCLUDED.stock,
         image_url = EXCLUDED.image_url`,
      [p.id, p.name, p.description, p.price, p.category, p.stock, p.imageUrl]
    );
  }
  console.log(`Seeded ${products.length} products.`);
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
