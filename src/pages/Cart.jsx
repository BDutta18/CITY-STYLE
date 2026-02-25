import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatCurrency } from '../utils/cartHelpers';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const shippingCharges = cartTotal > 100 ? 0 : 10;
  const tax = cartTotal * 0.18;
  const total = cartTotal + shippingCharges + tax;

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-page">
          <div className="container">
            <div className="empty-cart-page">
              <i className="ri-shopping-cart-line"></i>
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <button className="btn" onClick={() => navigate('/shop')}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="container">
          <div className="cart-page__header">
            <h1>Shopping Cart</h1>
            <button className="clear-all-btn" onClick={clearCart}>
              <i className="ri-delete-bin-line"></i> Clear All
            </button>
          </div>

          <div className="cart-page__content">
            <div className="cart-page__items">
              {cartItems.map((item) => (
                <div key={`${item.slug}-${item.size}`} className="cart-page__item">
                  <div className="cart-page__item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-page__item-details">
                    <h3>{item.name}</h3>
                    <p className="item-size">Size: {item.size}</p>
                    {item.color && <p className="item-color">Color: {item.color}</p>}
                    <p className="item-price">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="cart-page__item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="item-total">{formatCurrency(item.price * item.quantity)}</p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.slug, item.size)}
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-page__summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingCharges === 0 ? 'FREE' : formatCurrency(shippingCharges)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (18%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              {cartTotal < 100 && (
                <p className="free-shipping-note">
                  Add {formatCurrency(100 - cartTotal)} more for FREE shipping!
                </p>
              )}
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="continue-shopping-btn" onClick={() => navigate('/shop')}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
