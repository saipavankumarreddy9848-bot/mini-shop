// In-memory product catalog used only by the seed script (seeds into real
// Postgres). Prices are in INR (whole rupees, no decimals - standard for
// Indian e-commerce). Images are neutral placeholder photos, not real brand
// product photography, to avoid any IP/trademark issues.
const products = [
  // Electronics
  { id: 'p001', name: 'Wireless Bluetooth Headphones', description: 'Over-ear, noise-cancelling, 30hr battery life.', price: 2499, category: 'electronics', stock: 42, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Headphones' },
  { id: 'p002', name: 'Mechanical Keyboard', description: 'Hot-swappable switches, RGB backlight.', price: 4999, category: 'electronics', stock: 17, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Keyboard' },
  { id: 'p003', name: 'Wireless Mouse', description: 'Ergonomic design, 2.4GHz wireless, silent clicks.', price: 899, category: 'electronics', stock: 55, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Mouse' },
  { id: 'p004', name: 'Portable Bluetooth Speaker', description: 'Waterproof, 12-hour battery, deep bass.', price: 1799, category: 'electronics', stock: 30, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Speaker' },
  { id: 'p005', name: 'Smart Watch', description: 'Heart rate monitor, sleep tracking, 7-day battery.', price: 3499, category: 'electronics', stock: 25, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Smart+Watch' },
  { id: 'p006', name: 'Power Bank 20000mAh', description: 'Fast charging, dual USB output.', price: 1299, category: 'electronics', stock: 60, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Power+Bank' },
  { id: 'p007', name: 'USB-C Fast Charger', description: '65W GaN charger, compact design.', price: 999, category: 'electronics', stock: 45, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Charger' },

  // Apparel
  { id: 'p008', name: "Men's Cotton Casual Shirt", description: 'Slim fit, breathable cotton, machine washable.', price: 899, category: 'apparel', stock: 40, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Shirt' },
  { id: 'p009', name: "Women's Kurta Set", description: 'Printed cotton kurta with palazzo, festive wear.', price: 1499, category: 'apparel', stock: 28, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Kurta+Set' },
  { id: 'p010', name: 'Denim Jacket', description: 'Classic fit, washed denim, unisex.', price: 1999, category: 'apparel', stock: 22, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Denim+Jacket' },
  { id: 'p011', name: "Men's Formal Trousers", description: 'Slim fit, wrinkle-resistant fabric.', price: 1299, category: 'apparel', stock: 35, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Trousers' },
  { id: 'p012', name: "Women's Floral Dress", description: 'A-line, knee-length, summer collection.', price: 1699, category: 'apparel', stock: 20, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Dress' },
  { id: 'p013', name: 'Graphic Print T-Shirt', description: '100% cotton, oversized fit.', price: 599, category: 'apparel', stock: 65, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=T-Shirt' },
  { id: 'p014', name: 'Hooded Sweatshirt', description: 'Fleece-lined, kangaroo pocket, unisex.', price: 1399, category: 'apparel', stock: 33, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Hoodie' },

  // Footwear
  { id: 'p015', name: 'Running Shoes', description: 'Lightweight, breathable mesh, cushioned sole.', price: 2299, category: 'footwear', stock: 35, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Running+Shoes' },
  { id: 'p016', name: 'Casual Sneakers', description: 'Everyday wear, cushioned insole, canvas upper.', price: 1599, category: 'footwear', stock: 40, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Sneakers' },
  { id: 'p017', name: "Men's Formal Leather Shoes", description: 'Genuine leather, lace-up, office wear.', price: 2799, category: 'footwear', stock: 18, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Formal+Shoes' },
  { id: 'p018', name: "Women's Block Heels", description: 'Comfortable block heel, party wear.', price: 1899, category: 'footwear', stock: 24, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Heels' },
  { id: 'p019', name: 'Flip Flops', description: 'Soft footbed, quick-dry straps.', price: 399, category: 'footwear', stock: 70, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Flip+Flops' },

  // Fitness
  { id: 'p020', name: 'Yoga Mat', description: '6mm thick, non-slip, includes carry strap.', price: 799, category: 'fitness', stock: 60, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Yoga+Mat' },
  { id: 'p021', name: 'Adjustable Dumbbells Set', description: '2-20kg adjustable, space-saving design.', price: 3999, category: 'fitness', stock: 12, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Dumbbells' },
  { id: 'p022', name: 'Resistance Bands Set', description: '5 resistance levels, includes carry pouch.', price: 599, category: 'fitness', stock: 50, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Resistance+Bands' },
  { id: 'p023', name: 'Stainless Steel Water Bottle', description: 'Insulated, keeps drinks cold for 24hrs.', price: 699, category: 'fitness', stock: 8, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Water+Bottle' },
  { id: 'p024', name: 'Gym Duffel Bag', description: 'Water-resistant, shoe compartment.', price: 1199, category: 'fitness', stock: 26, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Duffel+Bag' },

  // Home
  { id: 'p025', name: 'Ceramic Coffee Mug Set', description: 'Set of 4, 300ml each, dishwasher safe.', price: 599, category: 'home', stock: 45, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Mug+Set' },
  { id: 'p026', name: 'Cotton Bedsheet Set', description: 'King size, 2 pillow covers included.', price: 1299, category: 'home', stock: 30, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Bedsheet' },
  { id: 'p027', name: 'Scented Candle Set', description: 'Set of 3, soy wax, long-lasting fragrance.', price: 499, category: 'home', stock: 55, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Candles' },
  { id: 'p028', name: 'Table Lamp', description: 'Minimalist design, warm white LED.', price: 999, category: 'home', stock: 20, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Table+Lamp' },
  { id: 'p029', name: 'Non-Stick Cookware Set', description: '5-piece set, induction compatible.', price: 2499, category: 'home', stock: 15, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Cookware' },

  // Accessories
  { id: 'p030', name: 'Leather Wallet', description: 'Genuine leather, RFID protected, slim design.', price: 799, category: 'accessories', stock: 40, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Wallet' },
  { id: 'p031', name: 'Aviator Sunglasses', description: 'UV protection, polarized lenses.', price: 899, category: 'accessories', stock: 35, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Sunglasses' },
  { id: 'p032', name: 'Canvas Backpack', description: '20L capacity, laptop compartment.', price: 1599, category: 'accessories', stock: 28, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Backpack' },
  { id: 'p033', name: 'Analog Wrist Watch', description: 'Stainless steel strap, water-resistant.', price: 1899, category: 'accessories', stock: 22, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Watch' },
  { id: 'p034', name: 'fastrack analog watch', description: 'stainless steel strap, water-resistant.;, ip-68 resistant', price: 4500, category: 'accessories', stock: 1, imageUrl: 'https://placehold.co/400x400/eee/31343C?text=Watch' },
  { id: 'p035', name: 'Thor', description: '4 whiller car, 4 cylender, 4 seater', price:2100000, category: 'vehicles', stock:11, imageUrl: 'https://placehold.co/600x600/eee/31343C?text=Mahendra+Thor' }
];

module.exports = products;
