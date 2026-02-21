import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/cartHelpers';
import './Cart.css';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item__details">
        <h4>{item.name}</h4>
        <p className="cart-item__price">{formatCurrency(item.price)}</p>
        <div className="cart-item__options">
            <span>Size: {item.size}</span>
        </div>
        <div className="cart-item__actions">
            <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >-</button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                >+</button>
            </div>
            <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.slug, item.size)}
                aria-label="Remove item"
            >
                <i className="ri-delete-bin-line"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
