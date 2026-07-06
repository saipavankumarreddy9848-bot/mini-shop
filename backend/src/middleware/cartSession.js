const { v4: uuidv4 } = require('uuid');

// Simple cart-session resolver. Real deployments would use a signed cookie
// or the authenticated user's ID; for MiniShop we accept a client-supplied
// header so the frontend can persist it in localStorage.
function cartSession(req, res, next) {
  let cartId = req.header('x-cart-id');
  if (!cartId) {
    cartId = uuidv4();
  }
  req.cartId = cartId;
  res.setHeader('x-cart-id', cartId);
  next();
}

module.exports = cartSession;
