// In-memory cart store, keyed by cartId.
// This mirrors how we'll later use DynamoDB: cartId as partition key,
// items as a list attribute, with a TTL for cart expiry.
const carts = new Map();

function getCart(cartId) {
  return carts.get(cartId) || { cartId, items: [], createdAt: new Date().toISOString() };
}

function saveCart(cart) {
  carts.set(cart.cartId, cart);
  return cart;
}

function deleteCart(cartId) {
  carts.delete(cartId);
}

module.exports = { getCart, saveCart, deleteCart };
