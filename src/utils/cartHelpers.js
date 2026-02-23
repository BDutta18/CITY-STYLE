export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const calculatePricing = (subtotal) => {
  const shippingCharges = subtotal >= 1000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const discount = 0;
  const total = subtotal + shippingCharges + tax - discount;

  return {
    subtotal,
    shippingCharges,
    tax,
    discount,
    total
  };
};
