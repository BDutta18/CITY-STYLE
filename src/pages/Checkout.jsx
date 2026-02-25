import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI, userAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatCurrency } from '../utils/cartHelpers';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home',
    isDefault: false
  });

  const shippingCharges = cartTotal > 100 ? 0 : 10;
  const tax = cartTotal * 0.18;
  const total = cartTotal + shippingCharges + tax;

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { from: '/checkout' } });
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    loadAddresses();
  }, [user, cartItems]);

  const loadAddresses = async () => {
    try {
      const data = await userAPI.getAddresses(user);
      setAddresses(data);
      const defaultAddr = data.find(addr => addr.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr);
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const added = await userAPI.addAddress(user, newAddress);
      setAddresses([...addresses, added]);
      setSelectedAddress(added);
      setShowAddressForm(false);
      setNewAddress({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        addressType: 'home',
        isDefault: false
      });
    } catch (error) {
      alert('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems,
        shippingAddress: selectedAddress,
        paymentMethod,
        pricing: {
          subtotal: cartTotal,
          shippingCharges,
          tax,
          discount: 0,
          total
        }
      };

      const order = await orderAPI.createOrder(user, orderData);
      await clearCart();
      navigate(`/order-confirmation/${order.orderId}`);
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Order Summary' },
    { number: 2, title: 'Shipping Address' },
    { number: 3, title: 'Payment Method' },
    { number: 4, title: 'Review & Confirm' }
  ];

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="container">
          <h1>Checkout</h1>

          <div className="checkout-steps">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`checkout-step ${currentStep === step.number ? 'active' : ''} ${
                  currentStep > step.number ? 'completed' : ''
                }`}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-title">{step.title}</div>
              </div>
            ))}
          </div>

          <div className="checkout-content">
            <div className="checkout-main">
              {currentStep === 1 && (
                <div className="checkout-section">
                  <h2>Order Summary</h2>
                  <div className="order-items">
                    {cartItems.map((item) => (
                      <div key={`${item.slug}-${item.size}`} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <div className="order-item-details">
                          <h4>{item.name}</h4>
                          <p>Size: {item.size} | Qty: {item.quantity}</p>
                          <p className="order-item-price">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-next" onClick={() => setCurrentStep(2)}>
                    Continue to Shipping
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="checkout-section">
                  <h2>Shipping Address</h2>
                  
                  {addresses.length > 0 && !showAddressForm && (
                    <div className="address-list">
                      {addresses.map((addr) => (
                        <div
                          key={addr._id}
                          className={`address-card ${selectedAddress?._id === addr._id ? 'selected' : ''}`}
                          onClick={() => setSelectedAddress(addr)}
                        >
                          <div className="address-radio">
                            <input
                              type="radio"
                              checked={selectedAddress?._id === addr._id}
                              onChange={() => setSelectedAddress(addr)}
                            />
                          </div>
                          <div className="address-details">
                            <h4>{addr.fullName}</h4>
                            <p>{addr.addressLine1}</p>
                            {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                            <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                            <p>Phone: {addr.phone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showAddressForm && (
                    <form className="address-form" onSubmit={handleAddAddress}>
                      <div className="form-row">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          required
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Address Line 1"
                        value={newAddress.addressLine1}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Address Line 2 (Optional)"
                        value={newAddress.addressLine2}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                      />
                      <div className="form-row">
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          required
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={newAddress.pincode}
                          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="btn-save" disabled={loading}>
                          {loading ? 'Saving...' : 'Save Address'}
                        </button>
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => setShowAddressForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {!showAddressForm && (
                    <button className="btn-add-address" onClick={() => setShowAddressForm(true)}>
                      <i className="ri-add-line"></i> Add New Address
                    </button>
                  )}

                  <div className="checkout-actions">
                    <button className="btn-back" onClick={() => setCurrentStep(1)}>
                      Back
                    </button>
                    <button
                      className="btn-next"
                      onClick={() => setCurrentStep(3)}
                      disabled={!selectedAddress}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="checkout-section">
                  <h2>Payment Method</h2>
                  <div className="payment-methods">
                    <div
                      className={`payment-method ${paymentMethod === 'cod' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div className="payment-details">
                        <i className="ri-money-dollar-circle-line"></i>
                        <div>
                          <h4>Cash on Delivery</h4>
                          <p>Pay when you receive your order</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <div className="payment-details">
                        <i className="ri-smartphone-line"></i>
                        <div>
                          <h4>UPI</h4>
                          <p>Pay using UPI apps</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <div className="payment-details">
                        <i className="ri-bank-card-line"></i>
                        <div>
                          <h4>Credit/Debit Card</h4>
                          <p>Pay securely with your card</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="checkout-actions">
                    <button className="btn-back" onClick={() => setCurrentStep(2)}>
                      Back
                    </button>
                    <button className="btn-next" onClick={() => setCurrentStep(4)}>
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="checkout-section">
                  <h2>Review & Confirm</h2>
                  
                  <div className="review-section">
                    <h3>Shipping Address</h3>
                    <div className="review-address">
                      <p><strong>{selectedAddress?.fullName}</strong></p>
                      <p>{selectedAddress?.addressLine1}</p>
                      {selectedAddress?.addressLine2 && <p>{selectedAddress.addressLine2}</p>}
                      <p>{selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}</p>
                      <p>Phone: {selectedAddress?.phone}</p>
                    </div>
                    <button className="btn-change" onClick={() => setCurrentStep(2)}>
                      Change
                    </button>
                  </div>

                  <div className="review-section">
                    <h3>Payment Method</h3>
                    <p className="review-payment">
                      {paymentMethod === 'cod' && 'Cash on Delivery'}
                      {paymentMethod === 'upi' && 'UPI'}
                      {paymentMethod === 'card' && 'Credit/Debit Card'}
                    </p>
                    <button className="btn-change" onClick={() => setCurrentStep(3)}>
                      Change
                    </button>
                  </div>

                  <div className="checkout-actions">
                    <button className="btn-back" onClick={() => setCurrentStep(3)}>
                      Back
                    </button>
                    <button
                      className="btn-place-order"
                      onClick={handlePlaceOrder}
                      disabled={loading}
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-sidebar">
              <div className="price-summary">
                <h3>Price Details</h3>
                <div className="price-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="price-row">
                  <span>Shipping Charges</span>
                  <span>{shippingCharges === 0 ? 'FREE' : formatCurrency(shippingCharges)}</span>
                </div>
                <div className="price-row">
                  <span>Tax (18%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="price-row total">
                  <span>Total Amount</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
