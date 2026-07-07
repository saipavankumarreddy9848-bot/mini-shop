// Indian numbering format (₹1,99,999 style) via Intl - no manual comma logic needed
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

export function formatPrice(amount) {
  return formatter.format(amount);
}
