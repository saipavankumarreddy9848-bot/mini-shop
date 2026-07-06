import { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from '../components/ProductCard.jsx';

const CATEGORIES = ['all', 'electronics', 'apparel', 'fitness', 'home'];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = {};
    if (category !== 'all') params.category = category;
    if (search) params.search = search;

    api
      .getProducts(params)
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="home-page">
      <div className="hero-banner">
        <h1>New Season Arrivals</h1>
        <p>Shop the latest picks, curated for you.</p>
      </div>

      <div className="filter-bar">
        <div className="category-tabs">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`category-tab ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="status-text">Loading products...</p>}
      {error && <p className="status-text error">Couldn't load products: {error}</p>}
      {!loading && !error && products.length === 0 && <p className="status-text">No products found.</p>}

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
