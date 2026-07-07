import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { formatPrice } from '../formatPrice';

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your bag is empty</h2>
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Bag</h1>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.productId} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{formatPrice(item.price)}</p>
            </div>
            <div className="quantity-selector">
              <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
            </div>
            <p className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</p>
            <button className="remove-btn" onClick={() => removeItem(item.productId)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>
          Total: <strong>{formatPrice(cart.total)}</strong>
        </p>
        <button className="btn-primary" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
