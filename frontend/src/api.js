const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const CART_ID_KEY = 'minishop_cart_id';

function getCartId() {
  return localStorage.getItem(CART_ID_KEY);
}

function setCartId(id) {
  if (id) localStorage.setItem(CART_ID_KEY, id);
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const cartId = getCartId();
  if (cartId) headers['x-cart-id'] = cartId;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  const returnedCartId = res.headers.get('x-cart-id');
  if (returnedCartId) setCartId(returnedCartId);

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return data;
}

export const api = {
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/api/products${qs ? `?${qs}` : ''}`);
  },
  getProduct: (id) => request(`/api/products/${id}`),
  getCart: () => request('/api/cart'),
  addToCart: (productId, quantity = 1) =>
    request('/api/cart/items', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (productId, quantity) =>
    request(`/api/cart/items/${productId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  removeCartItem: (productId) => request(`/api/cart/items/${productId}`, { method: 'DELETE' }),
  checkout: (customer) => request('/api/checkout', { method: 'POST', body: JSON.stringify({ customer }) })
};
