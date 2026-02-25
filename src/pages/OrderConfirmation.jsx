import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatCurrency } from '../utils/cartHelpers';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadOrder();
  }, [user, orderId]);

  const loadOrder = async () => {
    try {
      const data = await orderAPI.getOrder(user, orderId);
      setOrder(data);
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <h2>Order not found</h2>
          <button className="btn" onClick={() => navigate('/orders')}>
            View All Orders
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="order-confirmation-page">
        <div className="container">
          <div className="confirmation-header">
            <div className="success-icon">
              <i className="ri-checkbox-circle-fill"></i>
            </div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
            <p className="order-id">Order ID: <strong>{order.orderId}</strong></p>
          </div>

          <div className="confirmation-content">
            <div className="confirmation-section">
              <h2>Order Details</h2>
              <div className="order-items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="item-price">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="confirmation-section">
              <h2>Delivery Address</h2>
              <div className="address-box">
                <p><strong>{order.shippingAddress.fullName}</strong></p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div className="confirmation-section">
              <h2>Payment Summary</h2>
              <div className="payment-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{order.shippingCharges === 0 ? 'FREE' : formatCurrency(order.shippingCharges)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Paid</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
                <div className="payment-method-info">
                  <p>Payment Method: <strong>{order.paymentMethod.toUpperCase()}</strong></p>
                  <p>Payment Status: <strong>{order.paymentStatus}</strong></p>
                </div>
              </div>
            </div>

            <div className="confirmation-section">
              <h2>Estimated Delivery</h2>
              <p className="delivery-date">
                {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="btn-primary" onClick={() => navigate('/orders')}>
              View All Orders
            </button>
            <button className="btn-secondary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
