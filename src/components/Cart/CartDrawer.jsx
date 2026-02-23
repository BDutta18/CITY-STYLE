import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import { formatCurrency } from '../../utils/cartHelpers';
import './Cart.css';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { cartItems, isCartOpen, toggleCart, cartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    toggleCart();
    navigate('/cart');
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="close-btn" onClick={toggleCart}>
            <i className="ri-close-line"></i>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="ri-shopping-basket-line empty-icon"></i>
            <p>Your cart is empty.</p>
            <button className="continue-shopping-btn" onClick={toggleCart}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem key={`${item.slug}-${item.size}`} item={item} />
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-row total">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <p className="shipping-note">Shipping & taxes calculated at checkout</p>
              <button className="checkout-btn" onClick={handleCheckout}>View Cart</button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
