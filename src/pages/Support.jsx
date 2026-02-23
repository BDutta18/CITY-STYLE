import React from 'react';
import '../styles/index.css';
import '../styles/Support.css';
import Breadcrumb from '../components/Breadcrumb';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Support = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <div className="section__container support__container">
        <div className="section__header">Support Center</div>
        <p className="support__subtitle">
          Welcome to City Style Support. How can we verify your style today?
        </p>
        
        <div className="support__grid">
          <div className="support__card">
            <i className="ri-truck-line"></i>
            <h4>Shipping & Delivery</h4>
            <p>Track your order, view shipping rates and delivery times.</p>
          </div>
          <div className="support__card">
            <i className="ri-exchange-dollar-line"></i>
            <h4>Returns & Refunds</h4>
            <p>Simple returns process and refund status tracking.</p>
          </div>
          <div className="support__card">
            <i className="ri-account-circle-line"></i>
            <h4>Account Settings</h4>
            <p>Update your profile, change password, and manage preferences.</p>
          </div>
          <div className="support__card">
            <i className="ri-question-answer-line"></i>
            <h4>Product Info</h4>
            <p>Size guides, fabric details, and care instructions.</p>
          </div>
          <div className="support__card">
            <i className="ri-secure-payment-line"></i>
            <h4>Payment Methods</h4>
            <p>Secure payment options, gift cards, and promo codes.</p>
          </div>
          <div className="support__card">
            <i className="ri-global-line"></i>
            <h4>International Orders</h4>
            <p>Information on shipping to over 100 countries worldwide.</p>
          </div>
        </div>

        <div className="contact__section">
          <h3>Still need help?</h3>
          <p>Our dedicated support team is available 24/7 to assist you.</p>
          <div className="contact__details">
            <div className="contact__item">
              <i className="ri-mail-line"></i>
              <span>support@citystyle.com</span>
            </div>
            <div className="contact__item">
              <i className="ri-phone-line"></i>
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="contact__item">
              <i className="ri-map-pin-line"></i>
              <span>123 Fashion Ave, New York, NY</span>
            </div>
          </div>
          <button className="btn contact__btn">Contact Support Team</button>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Support;
