import React from 'react'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../styles/FAQ.css'
import Breadcrumb from '../components/Breadcrumb'

const FAQ = () => {
    React.useEffect(() => {
        // Mobile navigation toggle
        const menuBtn = document.getElementById("menu-btn");
        const navLinks = document.getElementById("nav-links");
        const menuClickHandler = () => {
            navLinks && navLinks.classList.toggle("open");
        };
        if (menuBtn) {
            menuBtn.addEventListener("click", menuClickHandler);
        }

        // FAQ Accordion functionality
        const faqItems = document.querySelectorAll('.faq__item');
        const faqHandlers = [];
        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            if (question) {
                const handler = () => {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                };
                question.addEventListener('click', handler);
                faqHandlers.push({ question, handler });
            }
        });

        // Cleanup event listeners
        return () => {
            if (menuBtn) {
                menuBtn.removeEventListener("click", menuClickHandler);
            }
            faqHandlers.forEach(({ question, handler }) => {
                question.removeEventListener('click', handler);
            });
        };
    }, []);

  return (
    <div>
         <nav>
        <div className="nav__header">
            <div className="nav__logo">
                <Link to="/">CITY STYLE</Link>
            </div>
            <div className="nav__menu__btn" id="menu-btn">
                <i className="ri-menu-line"></i>
            </div>
        </div>
        <ul className="nav__links" id="nav-links">
            <li><Link to="/#catalogue">CATALOGUE</Link></li>
            <li><Link to="/#fashion">FASHION</Link></li>
            <li><Link to="/#favourite">FAVOURITE</Link></li>
            <li><Link to="/#lifestyle">LIFESTYLE</Link></li>
            <li>
                <Link to="/auth" className="btn" style={{color: 'white'}}>SIGN UP</Link>
            </li>
        </ul>
    </nav>
    <Breadcrumb />

    <section className="faq__header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions about shopping at CITY STYLE</p>
    </section>

    <div className="faq__container">
        {/* <!-- Shipping & Delivery --> */}
        <div className="faq__category">
            <h2 className="faq__category-title"><i className="ri-truck-line"></i> Shipping & Delivery</h2>
            
            <div className="faq__item">
                <div className="faq__question">
                    <h3>How long does shipping take?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Standard shipping typically takes 5-7 business days within the continental US. Express shipping options are available at checkout for 2-3 business day delivery. International shipping times vary by location and typically take 10-14 business days.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Do you offer free shipping?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Yes! We offer free standard shipping on all orders over $75. For orders under $75, standard shipping is $5.99. Express and international shipping rates are calculated at checkout based on your location.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Can I track my order?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Absolutely! Once your order ships, you'll receive an email with a tracking number. You can also track your order by visiting our <Link to="/order-tracking" style={{color: 'var(--extra-light)', fontWeight: 600}}>Order Tracking</Link> page and entering your order number.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Do you ship internationally?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary depending on your location. Please note that customers are responsible for any customs duties or taxes that may apply.</p>
                </div>
            </div>
        </div>

        {/* <!-- Returns & Refunds --> */}
        <div className="faq__category">
            <h2 className="faq__category-title"><i className="ri-exchange-line"></i> Returns & Refunds</h2>
            
            <div className="faq__item">
                <div className="faq__question">
                    <h3>What is your return policy?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>We offer a 30-day return policy for all unworn items with original tags attached. Items must be in their original condition. Sale items and undergarments are final sale and cannot be returned.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>How do I start a return?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>To initiate a return, log into your account and go to your order history. Select the item(s) you wish to return and follow the prompts. You'll receive a prepaid return label via email. Pack your items securely and drop off at any authorized shipping location.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>How long does it take to process a refund?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Once we receive your return, please allow 5-7 business days for inspection and processing. Refunds will be credited to your original payment method within 3-5 business days after processing. You'll receive an email confirmation when your refund has been issued.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Can I exchange an item for a different size?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>We recommend returning the original item for a refund and placing a new order for the correct size to ensure availability. This is the fastest way to get the size you need. Use our <Link to="/size-guide" style={{color: 'var(--extra-light)', fontWeight: 600}}>Size Guide</Link> to find your perfect fit!</p>
                </div>
            </div>
        </div>

        {/* <!-- Orders & Payment --> */}
        <div className="faq__category">
            <h2 className="faq__category-title"><i className="ri-shopping-bag-line"></i> Orders & Payment</h2>
            
            <div className="faq__item">
                <div className="faq__question">
                    <h3>What payment methods do you accept?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with SSL encryption for your protection.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Can I modify or cancel my order?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Orders can be modified or cancelled within 1 hour of placement. After this window, orders enter processing and cannot be changed. Please contact our customer support immediately if you need to make changes to a recent order.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Is it safe to shop on your website?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Absolutely! Your security is our top priority. We use industry-standard SSL encryption to protect your personal and payment information. We never store your full credit card details on our servers.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Do you offer gift cards?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Yes! Digital gift cards are available in amounts of $25, $50, $100, and $200. Gift cards are delivered via email and never expire. They can be used for any purchase on our website.</p>
                </div>
            </div>
        </div>

        {/* <!-- Size & Fit --> */}
        <div className="faq__category">
            <h2 className="faq__category-title"><i className="ri-ruler-line"></i> Size & Fit</h2>
            
            <div className="faq__item">
                <div className="faq__question">
                    <h3>How do I find my size?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">   
                    <p>Visit our comprehensive <Link to="/size-guide" style={{color: 'var(--extra-light)', fontWeight: 600}}>Size Guide</Link> for detailed measurements and tips on finding your perfect fit. Each product page also includes specific sizing information and fit recommendations.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Do your clothes run true to size?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Most of our items run true to size, but fit can vary by style. Oversized items are designed to fit loosely. We include specific fit notes on each product page, and customer reviews often mention sizing feedback to help you choose.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>What size range do you offer?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>We offer sizes XS through 3XL in most styles. We're committed to inclusive sizing and are continuously expanding our range. Check individual product pages for available sizes in each item.</p>
                </div>
            </div>
        </div>

        {/* <!-- Account & General --> */}
        <div className="faq__category">
            <h2 className="faq__category-title"><i className="ri-user-line"></i> Account & General</h2>
            
            <div className="faq__item">
                <div className="faq__question">
                    <h3>Do I need an account to place an order?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, access your order history, and receive exclusive member benefits and early access to sales.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>How do I reset my password?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Click on "Sign In" and then select "Forgot Password." Enter your email address, and we'll send you a link to reset your password. The link expires in 24 hours for security purposes.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>How can I stay updated on new arrivals and sales?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Subscribe to our newsletter at the bottom of any page to receive updates on new arrivals, exclusive promotions, and special sales. You can also follow us on social media for style inspiration and announcements.</p>
                </div>
            </div>

            <div className="faq__item">
                <div className="faq__question">
                    <h3>Do you have physical store locations?</h3>
                    <i className="ri-add-line"></i>
                </div>
                <div className="faq__answer">
                    <p>Yes! We have several retail locations. Visit our <Link to="/store-location" style={{color: 'var(--extra-light)', fontWeight: 600}}>Store Locations</Link> page to find a store near you with hours of operation and directions.</p>
                </div>
            </div>
        </div>
    </div>

    <section className="faq__contact">
        <h2>Still Have Questions?</h2>
        <p>Our customer support team is here to help you!</p>
        <Link to="/contact" className="btn">Contact Us</Link>
    </section>

    <footer>
        <div className="section__container footer__container">
            <div className="footer__col">
                <div className="footer__logo">
                    <Link to="/">CITY STYLE</Link>
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
            Copyright © Bodhisatwa Dutta 2024. All rights reserved.
        </div>
    </footer>
    </div>
  )
}

export default FAQ; 