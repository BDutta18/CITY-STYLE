import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

const CartIcon = () => {
    const { cartCount, toggleCart } = useCart();
    return (
        <div className="cart-icon" onClick={toggleCart} role="button" aria-label="Cart">
            <i className="ri-shopping-cart-2-line"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
    );
};
export default CartIcon;
