import React, { useEffect, useState } from "react";
import "../styles/index.css";
import "../styles/support.css";

const Support = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  /* Scroll Reveal */
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">CITY STYLE</a>
          </div>
          <div
            className="nav__menu__btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="ri-menu-line"></i>
          </div>
        </div>

        <ul className={`nav__links ${menuOpen ? "open" : ""}`}>
          <li><a href="/#catalogue">CATALOGUE</a></li>
          <li><a href="/#fashion">FASHION</a></li>
          <li><a href="/#favourite">FAVOURITE</a></li>
          <li><a href="/#lifestyle">LIFESTYLE</a></li>
          <li>
            <a href="/auth" className="btn" style={{ color: "white" }}>
              SIGN UP
            </a>
          </li>
        </ul>
      </nav>

      {/* ================= HERO ================= */}
      <header className="support__hero reveal">
        <h1>
          NEED <span>HELP?</span>
        </h1>
        <p>
          CITY STYLE Support is here 24/7 to assist you with orders,
          payments, returns, and more.
        </p>
      </header>

      {/* ================= QUICK HELP ================= */}
      <section className="section__container support__quick">
        <div className="quick__grid">
          {[
            ["ri-truck-line", "Order Tracking", "Track your orders in real-time."],
            ["ri-refresh-line", "Easy Returns", "7-day hassle-free returns."],
            ["ri-secure-payment-line", "Secure Payments", "100% secure checkout experience."],
            ["ri-customer-service-2-line", "24/7 Support", "Always available for you."],
          ].map(([icon, title, text], i) => (
            <div className="quick__card reveal" key={i}>
              <i className={icon}></i>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="faq">
        <div className="section__container">
          <h2 className="section__header">FREQUENTLY ASKED QUESTIONS</h2>

          {[
            ["How can I track my order?", "You can track your order using the Order Tracking page with your Order ID."],
            ["What is your return policy?", "Returns are accepted within 7 days of delivery in original condition."],
            ["How long does refund take?", "Refunds are processed within 5–7 working days."],
          ].map(([q, a], i) => (
            <div className="faq__item reveal" key={i}>
              <button
                className={`faq__question ${activeFAQ === i ? "active" : ""}`}
                onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
              >
                {q}
                <i className={activeFAQ === i ? "ri-subtract-line" : "ri-add-line"}></i>
              </button>

              <div
                className="faq__answer"
                style={{ maxHeight: activeFAQ === i ? "200px" : "0" }}
              >
                {a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="section__container contact">
        <h2 className="section__header">CONTACT SUPPORT</h2>

        <form className="contact__form reveal">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Order ID (optional)" />
          <textarea placeholder="Describe your issue..." required></textarea>
          <button className="btn" type="submit">
            Submit Request
          </button>
        </form>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="section__container footer__container">
          <div className="footer__col">
            <div className="footer__logo">
              <a href="#">FASHION</a>
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
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/career">Careers</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li><a href="/store-location">Store Location</a></li>
              <li><a href="/order-tracking">Order Tracking</a></li>
              <li><a href="/size-guide">Size Guide</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Legal</h4>
            <ul className="footer__links">
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          Copyright © Bodhisatwa Dutta 2024. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Support;
