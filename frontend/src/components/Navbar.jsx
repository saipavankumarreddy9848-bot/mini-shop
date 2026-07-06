import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        MINI<span>SHOP</span>
      </Link>
      <nav className="navbar-links">
        <Link to="/">Shop</Link>
        <Link to="/cart" className="cart-link">
          Bag
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
      </nav>
    </header>
  );
}
