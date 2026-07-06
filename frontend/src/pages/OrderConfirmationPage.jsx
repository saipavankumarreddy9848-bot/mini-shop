import { useParams, Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const { id } = useParams();

  return (
    <div className="empty-state">
      <h2>Order Confirmed 🎉</h2>
      <p>Your order ID is:</p>
      <code className="order-id">{id}</code>
      <p>You'll receive a confirmation email shortly (simulated for this demo).</p>
      <Link to="/" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
}
