// In-memory product catalog (stand-in for RDS table until we wire up the DB)
const products = [
  {
    id: 'p001',
    name: 'Wireless Headphones',
    description: 'Over-ear, noise-cancelling, 30hr battery life.',
    price: 79.99,
    category: 'electronics',
    stock: 42,
    imageUrl: 'https://placehold.co/300x300?text=Headphones'
  },
  {
    id: 'p002',
    name: 'Mechanical Keyboard',
    description: 'Hot-swappable switches, RGB backlight.',
    price: 129.99,
    category: 'electronics',
    stock: 17,
    imageUrl: 'https://placehold.co/300x300?text=Keyboard'
  },
  {
    id: 'p003',
    name: 'Ceramic Coffee Mug',
    description: '12oz, dishwasher safe, minimalist design.',
    price: 14.5,
    category: 'home',
    stock: 120,
    imageUrl: 'https://placehold.co/300x300?text=Mug'
  },
  {
    id: 'p004',
    name: 'Running Shoes',
    description: 'Lightweight, breathable mesh, cushioned sole.',
    price: 89.0,
    category: 'apparel',
    stock: 35,
    imageUrl: 'https://placehold.co/300x300?text=Shoes'
  },
  {
    id: 'p005',
    name: 'Yoga Mat',
    description: '6mm thick, non-slip, includes carry strap.',
    price: 24.99,
    category: 'fitness',
    stock: 60,
    imageUrl: 'https://placehold.co/300x300?text=Yoga+Mat'
  },
  {
    id: 'p006',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated, keeps drinks cold for 24hrs.',
    price: 19.99,
    category: 'fitness',
    stock: 8,
    imageUrl: 'https://placehold.co/300x300?text=Bottle'
  }
];

module.exports = products;
