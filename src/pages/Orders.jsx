import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatCurrency } from '../utils/cartHelpers';
import '../styles/Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { from: '/orders' } });
      return;
    }
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const data = await orderAPI.getOrders(user);
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
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

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <div className="orders-page">
          <div className="container">
            <div className="empty-orders">
              <i className="ri-shopping-bag-line"></i>
              <h2>No Orders Yet</h2>
              <p>You haven't placed any orders yet.</p>
              <button className="btn" onClick={() => navigate('/shop')}>
                Start Shopping
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
      <div className="orders-page">
        <div className="container">
          <h1>My Orders</h1>
          
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.orderId}</h3>
                    <p className="order-date">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="order-status" style={{ color: getStatusColor(order.orderStatus) }}>
                    <i className="ri-checkbox-circle-line"></i>
                    {getStatusText(order.orderStatus)}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="order-item-preview">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity} | Size: {item.size}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="more-items">+{order.items.length - 3} more items</p>
                  )}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total Amount:</span>
                    <strong>{formatCurrency(order.total)}</strong>
                  </div>
                  <div className="order-actions">
                    <button
                      className="btn-view-details"
                      onClick={() => navigate(`/orders/${order.orderId}`)}
                    >
                      View Details
                    </button>
                    {['placed', 'confirmed'].includes(order.orderStatus) && (
                      <button
                        className="btn-cancel"
                        onClick={() => navigate(`/orders/${order.orderId}`)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
