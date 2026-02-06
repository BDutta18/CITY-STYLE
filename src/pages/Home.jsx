import React, { useEffect, useState } from 'react'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    // ScrollReveal animation
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    }

    if (window.ScrollReveal) {
      window.ScrollReveal().reveal(".header__image img", {
        ...scrollRevealOption,
        origin: "right",
      })
      window.ScrollReveal().reveal(".header__content h1", {
        ...scrollRevealOption,
        delay: 500,
      })
      window.ScrollReveal().reveal(".header__content p", {
        ...scrollRevealOption,
        delay: 1000,
      })
      window.ScrollReveal().reveal(".header__btns", {
        ...scrollRevealOption,
        delay: 1500,
      })
      window.ScrollReveal().reveal(".arrival__card", {
        ...scrollRevealOption,
        interval: 500,
      })
      window.ScrollReveal().reveal(".sale__image img", {
        ...scrollRevealOption,
        origin: "left",
      })
      window.ScrollReveal().reveal(".sale__content h2", {
        ...scrollRevealOption,
        delay: 500,
      })
      window.ScrollReveal().reveal(".sale__content p", {
        ...scrollRevealOption,
        delay: 1000,
      })
      window.ScrollReveal().reveal(".sale__content h4", {
        ...scrollRevealOption,
        delay: 1000,
      })
      window.ScrollReveal().reveal(".sale__btn", {
        ...scrollRevealOption,
        delay: 1500,
      })
      window.ScrollReveal().reveal(".favourite__card", {
        ...scrollRevealOption,
        interval: 500,
      })
    }

    // Banner duplication logic
    const banner = document.querySelector(".banner__container")
    if (banner) {
        // Clear previous duplicates if any to prevent infinite duplication on re-renders
        // Actually, simple way is to check if we already have enough children
        // Or just let it be, but React might re-render.
        // Since React hydration, this manual DOM manipulation is risky.
        // Better to list items in data and render them.
        // But for migration:
        const bannerContent = Array.from(banner.children);
        // Check if we haven't duplicated yet (hacky check: count)
        if(bannerContent.length <= 8) { // original has 8 images
             bannerContent.forEach((item) => {
                const duplicateNode = item.cloneNode(true);
                duplicateNode.setAttribute("aria-hidden", true);
                banner.appendChild(duplicateNode);
            });
        }
    }

  }, [])

  return (
    <>
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">CITY STYLE</a>
          </div>
          <div className="nav__menu__btn" id="menu-btn" onClick={toggleMenu}>
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </div>
        </div>
        <ul className={`nav__links ${isMenuOpen ? "open" : ""}`} id="nav-links" onClick={closeMenu}>
          <li><a href="#catalogue">CATALOGUE</a></li>
          <li><a href="#fashion">FASHION</a></li>
          <li><a href="#favourite">FAVOURITE</a></li>
          <li><a href="#lifestyle">LIFESTYLE</a></li>
          <li>
            <a href="/auth" className="btn" style={{color: 'white'}}>SIGN UP</a>
          </li>
        </ul>
      </nav>
      <header>
        <div className="section__container header__container">
          <div className="header__content">
            <h1>
              <span>EXPERIENCE</span>
              <br />
              THE
              <br />
              <span>ART OF</span>
              <br />
              FASHION.
            </h1>
            <p>Live for influential and innovative fashion!</p>
            <div className="header__btns">
              <button className="btn">Shop Now</button>
            </div>
          </div>
          <div className="header__image">
            <img src="/assets/header (1).png" alt="header" />
          </div>
        </div>
      </header>

      <section className="banner">
        <div className="banner__container">
          <img src="/assets/banner-1.png" alt="banner" />
          <img src="/assets/banner-2.png" alt="banner" />
          <img src="/assets/banner-3.png" alt="banner" />
          <img src="/assets/banner-4.png" alt="banner" />
          <img src="/assets/banner-5.png" alt="banner" />
          <img src="/assets/banner-6.png" alt="banner" />
          <img src="/assets/banner-7.png" alt="banner" />
          <img src="/assets/banner-8.png" alt="banner" />
        </div>
      </section>

      <section className="section__container arrival__container" id="catalogue">
        <h2 className="section__header">NEW ARRIVALS</h2>
        <div className="arrival__grid">
          <div className="arrival__card">
            <div className="arrival__image">
              <img src="/assets/hoodie.jpg" alt="arrival" />
            </div>
            <div className="arrival__content">
              <div>
                <h4>Hoodies & Sweatshirts</h4>
                <a href="#">Explore Now</a>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
          <div className="arrival__card">
            <div className="arrival__image">
              <img src="/assets/arrival-2.jpg" alt="arrival" />
            </div>
            <div className="arrival__content">
              <div>
                <h4>Coats & Parkas</h4>
                <a href="#">Explore Now</a>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
          <div className="arrival__card">
            <div className="arrival__image">
              <img src="/assets/OVRSIZED.webp" alt="arrival" />
            </div>
            <div className="arrival__content">
              <div>
                <h4>Oversized T-Shirt</h4>
                <a href="#">Explore Now</a>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
        </div>
      </section>

      <section className="sale" id="fashion">
        <div className="section__container sale__container">
          <div className="sale__image">
            <img src="/assets/sale.png" alt="sale" />
          </div>
          <div className="sale__content">
            <h2><span>PAYDAY</span><br />SALE NOW</h2>
            <p>
              Spend minimal $100 get 30% off voucher code for your next purchase
            </p>
            <h4>18 NOV - 25 DEC 2024</h4>
            <p>Terms and conditions apply</p>
            <div className="sale__btn">
              <a href="/shop" className="btn">Shop Now</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section__container favourite__container" id="favourite">
        <h2 className="section__header">YOUNG'S FAVOURITE</h2>
        <div className="favourite__grid">
          <div className="favourite__card">
            <div className="favourite__image">
              <img src="/assets/Selena Gomez.webp" alt="favourite" />
            </div>
            <div className="favourite__content">
              <div>
                <h4>Trending on Instagram</h4>
                <a href="/instagram_trending">Explore Now</a>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
          <div className="favourite__card">
            <div className="favourite__image">
              <img src="/assets/favourite-2.jpg" alt="favourite" />
            </div>
            <div className="favourite__content">
              <div>
                <h4>All under $40</h4>
                <a href="/under_40_dollar">Explore Now</a>
              </div>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section__container download__container" id="lifestyle">
        <div className="download__image">
          <img src="/assets/download.png" alt="download" />
        </div>
        <div className="download__content">
          <h2 className="section__header">DOWNLOAD APP & GET THE VOUCHER!</h2>
          <p>
            Get 30% off for first transaction using our new mobile app for now.
          </p>
          <div className="download__links">
            <a href="#">
              <img src="/assets/google.png" alt="google" />
            </a>
            <a href="#">
              <img src="/assets/apple.png" alt="apple" />
            </a>
          </div>
        </div>
      </section>

      <section className="promo">
        <div className="section__container promo__container">
          <h2 className="section__header">
            JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO
          </h2>
          <p>Type your email down below and be young wild generation</p>
          <form action="/">
            <input type="text" placeholder="Add your email here" />
            <button className="btn">SEND</button>
          </form>
        </div>
      </section>

      <footer>
        <div className="section__container footer__container">
          <div className="footer__col">
            <div className="footer__logo">
              <a href="#">FASHION</a>
            </div>
            <p>Complete your style with awesome clothes from us.</p>
            <ul className="footer__socials">
              <li>
                <a href="#"><i className="ri-facebook-fill"></i></a>
              </li>
              <li>
                <a href="#"><i className="ri-instagram-line"></i></a>
              </li>
              <li>
                <a href="#"><i className="ri-twitter-fill"></i></a>
              </li>
              <li>
                <a href="#"><i className="ri-linkedin-fill"></i></a>
              </li>
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
              <li><a href="/store_location">Store Location</a></li>
              <li><a href="/order_tracking">Order Tracking</a></li>
              <li><a href="/size_guide">Size Guide</a></li>
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
          Copyright © Bodhisatwa Dutta 2026. All rights reserved.
        </div>
      </footer>
    </>
  )
}

export default Home
