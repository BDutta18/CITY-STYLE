import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatCurrency } from '../utils/cartHelpers';
import '../styles/OrderDetail.css';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

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

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }

    setCancelling(true);
    try {
      const updatedOrder = await orderAPI.cancelOrder(user, orderId, cancelReason);
      setOrder(updatedOrder);
      setShowCancelModal(false);
      setCancelReason('');
    } catch (error) {
      alert('Failed to cancel order. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      placed: '#3498db',
      confirmed: '#9b59b6',
      packed: '#f39c12',
      shipped: '#e67e22',
      out_for_delivery: '#16a085',
      delivered: '#27ae60',
      cancelled: '#e74c3c',
      returned: '#95a5a6'
    };
    return colors[status] || '#666';
  };

  const getStatusText = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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
      <div className="order-detail-page">
        <div className="container">
          <button className="btn-back" onClick={() => navigate('/orders')}>
            <i className="ri-arrow-left-line"></i> Back to Orders
          </button>

          <div className="order-detail-header">
            <div>
              <h1>Order #{order.orderId}</h1>
              <p className="order-date">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="order-status-badge" style={{ backgroundColor: getStatusColor(order.orderStatus) }}>
              {getStatusText(order.orderStatus)}
            </div>
          </div>

          <div className="order-detail-content">
            <div className="order-detail-main">
              <div className="detail-section">
                <h2>Order Timeline</h2>
                <div className="timeline">
                  {order.statusHistory.map((history, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot" style={{ backgroundColor: getStatusColor(history.status) }}></div>
                      <div className="timeline-content">
                        <h4>{getStatusText(history.status)}</h4>
                        <p className="timeline-date">
                          {new Date(history.timestamp).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {history.note && <p className="timeline-note">{history.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h2>Order Items</h2>
                <div className="order-items-detail">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Size: {item.size}</p>
                        {item.color && <p>Color: {item.color}</p>}
                        <p>Quantity: {item.quantity}</p>
                        <p className="item-price">{formatCurrency(item.price)} each</p>
                      </div>
                      <div className="item-total">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h2>Shipping Address</h2>
                <div className="address-detail">
                  <p><strong>{order.shippingAddress.fullName}</strong></p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            <div className="order-detail-sidebar">
              <div className="sidebar-section">
                <h3>Payment Summary</h3>
                <div className="payment-details">
                  <div className="payment-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="payment-row">
                    <span>Shipping</span>
                    <span>{order.shippingCharges === 0 ? 'FREE' : formatCurrency(order.shippingCharges)}</span>
                  </div>
                  <div className="payment-row">
                    <span>Tax</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="payment-row discount">
                      <span>Discount</span>
                      <span>-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <div className="payment-row total">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
                <div className="payment-method">
                  <p>Payment Method: <strong>{order.paymentMethod.toUpperCase()}</strong></p>
                  <p>Payment Status: <strong>{order.paymentStatus}</strong></p>
                </div>
              </div>

              {order.estimatedDelivery && order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                <div className="sidebar-section">
                  <h3>Estimated Delivery</h3>
                  <p className="delivery-date">
                    {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {['placed', 'confirmed'].includes(order.orderStatus) && (
                <div className="sidebar-section">
                  <button className="btn-cancel-order" onClick={() => setShowCancelModal(true)}>
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Cancel Order</h2>
            <p>Please provide a reason for cancellation:</p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Enter reason..."
              rows="4"
            />
            <div className="modal-actions">
              <button className="btn-confirm" onClick={handleCancelOrder} disabled={cancelling}>
                {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
              <button className="btn-close" onClick={() => setShowCancelModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default OrderDetail;
