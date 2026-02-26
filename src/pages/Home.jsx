import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CartIcon from '../components/Cart/CartIcon'
import NewsletterForm from '../components/NewsletterForm'
import LazyImage from '../components/LazyImage'
import ProductModal from '../components/ProductModal'
import StarRating from '../components/Reviews/StarRating'
import { getProductBySlug, newArrivals, youngsFavourite } from '../data/products'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const [modalProduct, setModalProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const openProductModal = useCallback((productSlug) => {
    setModalProduct(getProductBySlug(productSlug))
    setIsModalOpen(true)
  }, [])

  const closeProductModal = useCallback(() => {
    setIsModalOpen(false)
    setModalProduct(null)
  }, [])

  // Logged-in users land on Shop — the landing page is for visitors only
  if (user) {
    return <Navigate to="/shop" replace />
  }

  useEffect(() => {

    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    }

    if (window.ScrollReveal) {
      const sr = window.ScrollReveal();
      sr.reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
      sr.reveal(".header__content h1", { ...scrollRevealOption, delay: 500 });
      sr.reveal(".header__content p", { ...scrollRevealOption, delay: 1000 });
      sr.reveal(".header__btns", { ...scrollRevealOption, delay: 1500 });
      sr.reveal(".arrival__card", { ...scrollRevealOption, interval: 500 });
      sr.reveal(".sale__image img", { ...scrollRevealOption, origin: "left" });
      sr.reveal(".sale__content h2", { ...scrollRevealOption, delay: 500 });
      sr.reveal(".sale__content p", { ...scrollRevealOption, delay: 1000 });
      sr.reveal(".sale__content h4", { ...scrollRevealOption, delay: 1000 });
      sr.reveal(".sale__btn", { ...scrollRevealOption, delay: 1500 });
      sr.reveal(".favourite__card", { ...scrollRevealOption, interval: 500 });
    }

  }, [])

  const bannerImages = [
    { src: '/assets/banner-1.png', webp: '/assets/optimized/banner-1.webp' },
    { src: '/assets/banner-2.png', webp: '/assets/optimized/banner-2.webp' },
    { src: '/assets/banner-3.png', webp: '/assets/optimized/banner-3.webp' },
    { src: '/assets/banner-4.png', webp: '/assets/optimized/banner-4.webp' },
    { src: '/assets/banner-5.png', webp: '/assets/optimized/banner-5.webp' },
    { src: '/assets/banner-6.png', webp: '/assets/optimized/banner-6.webp' },
    { src: '/assets/banner-7.png', webp: '/assets/optimized/banner-7.webp' },
    { src: '/assets/banner-8.png', webp: '/assets/optimized/banner-8.webp' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <Link to="/">CITY STYLE</Link>
          </div>
          <div className="nav__menu__btn" id="menu-btn" onClick={toggleMenu}>
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </div>
        </div>
        <ul className={`nav__links ${isMenuOpen ? "open" : ""}`} id="nav-links" onClick={closeMenu}>
          <li><Link to="/shop">SHOP</Link></li>
          <li><a href="#catalogue">CATALOGUE</a></li>
          <li><a href="#fashion">FASHION</a></li>
          <li><a href="#favourite">FAVOURITE</a></li>
          <li><a href="#lifestyle">LIFESTYLE</a></li>
          <li className="nav__auth-item">
            {user ? (
              <Link to="/profile" className="nav__profile-link">
                {typeof user.photoURL === 'string' ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="nav__avatar-img"
                  />
                ) : <i className="fa-solid fa-circle-user"></i>}
              </Link>
            ) : (
              <Link to="/auth" className="btn signup-btn">SIGN UP</Link>
            )}
          </li>
          <li>
            <CartIcon />
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
              <Link to="/shop" className="btn">Shop Now</Link>
            </div>
          </div>
          <div className="header__image">
            <LazyImage
              src="/assets/header (1).png"
              webpSrc="/assets/optimized/header (1).webp"
              webpSrcSet="/assets/optimized/header (1)-480.webp 480w"
              srcSet="/assets/optimized/header (1)-480.png 480w"
              sizes="(max-width: 768px) 100vw, 520px"
              alt="header"
              width={520}
              height={650}
              aspectRatio="4 / 5"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </header>

      <section className="banner">
        <div className="banner__container">
          {[...bannerImages, ...bannerImages].map((img, index) => (
            <LazyImage
              key={`${img.src}-${index}`}
              src={img.src}
              webpSrc={img.webp}
              alt="banner"
              width={120}
              height={30}
              objectFit="contain"
              wrapperStyle={{ minHeight: 30 }}
              aria-hidden={index >= bannerImages.length}
            />
          ))}
        </div>
      </section>

      <section className="section__container arrival__container" id="catalogue">
        <h2 className="section__header">NEW ARRIVALS</h2>
        <div className="arrival__grid">
          {newArrivals.map((product) => (
            <div className="arrival__card" key={product.slug}>
              <div className="arrival__image" style={{ position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product.slug}`)}
                  style={{ cursor: 'pointer' }}
                />
                <button
                  className="quick-view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal(product.slug);
                  }}
                >
                  Quick View
                </button>
              </div>
              <div className="arrival__content">
                <div>
                  <div style={{ marginBottom: '5px' }}>
                    <StarRating rating={product.rating} size={14} />
                  </div>
                  <h4>{product.name}</h4>
                </div>
                <span><i className="ri-arrow-right-line"></i></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sale" id="fashion">
        <div className="section__container sale__container">
          <div className="sale__image">
            <LazyImage
              src="/assets/sale.png"
              webpSrc="/assets/optimized/sale.webp"
              webpSrcSet="/assets/optimized/sale-480.webp 480w, /assets/optimized/sale-768.webp 768w"
              srcSet="/assets/optimized/sale-480.png 480w, /assets/optimized/sale-768.png 768w"
              sizes="(max-width: 768px) 100vw, 520px"
              alt="sale"
              width={520}
              height={520}
              aspectRatio="1 / 1"
            />
          </div>
          <div className="sale__content">
            <h2><span>PAYDAY</span><br />SALE NOW</h2>
            <p>
              Spend minimal $100 get 30% off voucher code for your next purchase
            </p>
            <h4>18 NOV - 25 DEC 2024</h4>
            <p>Terms and conditions apply</p>
            <div className="sale__btn">
              <Link to="/shop" className="btn">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section__container favourite__container" id="favourite">
        <h2 className="section__header">YOUNG'S FAVOURITE</h2>
        <div className="favourite__grid">
          {youngsFavourite.map((product) => (
            <div className="favourite__card" key={product.slug}>
              <div className="favourite__image" style={{ position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product.slug}`)}
                  style={{ cursor: 'pointer' }}
                />
                <button
                  className="quick-view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal(product.slug);
                  }}
                >
                  Quick View
                </button>
              </div>
              <div className="favourite__content">
                <div>
                  <div style={{ marginBottom: '5px' }}>
                    <StarRating rating={product.rating} size={14} />
                  </div>
                  <h4>{product.name}</h4>
                </div>
                <span><i className="ri-arrow-right-line"></i></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section__container download__container" id="lifestyle">
        <div className="download__image">
          <LazyImage
            src="/assets/download.png"
            webpSrc="/assets/optimized/download.webp"
            webpSrcSet="/assets/optimized/download-480.webp 480w, /assets/optimized/download-768.webp 768w"
            srcSet="/assets/optimized/download-480.png 480w, /assets/optimized/download-768.png 768w"
            sizes="(max-width: 768px) 100vw, 500px"
            alt="download"
            width={500}
            height={400}
            aspectRatio="5 / 4"
          />
        </div>
        <div className="download__content">
          <h2 className="section__header">DOWNLOAD APP & GET THE VOUCHER!</h2>
          <p>
            Get 30% off for first transaction using our new mobile app for now.
          </p>
          <div className="download__links">
            <a href="#">
              <LazyImage
                src="/assets/google.png"
                webpSrc="/assets/optimized/google.webp"
                alt="google"
                width={150}
                height={45}
                objectFit="contain"
                wrapperStyle={{ maxWidth: 150 }}
              />
            </a>
            <a href="#">
              <LazyImage
                src="/assets/apple.png"
                webpSrc="/assets/optimized/apple.webp"
                alt="apple"
                width={150}
                height={45}
                objectFit="contain"
                wrapperStyle={{ maxWidth: 150 }}
              />
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
          <NewsletterForm />
        </div>
      </section>

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

      <ProductModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />

      {/* moved styles into src/styles/index.css */}
    </>
  )
}

export default Home
