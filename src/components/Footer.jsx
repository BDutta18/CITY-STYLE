import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Footer = () => {
  return (
    <footer>
      <div className="section__container footer__container">
        <div className="footer__col">
          <div className="footer__logo">
            <Link to="/">FASHION</Link>
          </div>
          <p>Complete your style with awesome clothes from us.</p>
          <ul className="footer__socials">
            <li><a href="#"><i className="ri-facebook-fill"></i></a></li>
            <li><a href="#"><i className="ri-instagram-line"></i></a></li>
            <li><a href="#"><i className="ri-twitter-fill"></i></a></li>
            <li><a href="#"><i className="ri-linkedin-fill"></i></a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <ul className="footer__links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/career">Careers</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/store-location">Store Location</Link></li>
            <li><Link to="/order-tracking">Order Tracking</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Legal</h4>
          <ul className="footer__links">
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__bar">
        Copyright © Bodhisatwa Dutta 2026. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
