import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LazyImage from '../components/LazyImage';
import '../styles/Shop.css';

const Shop = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="shop-root">
      {/* NAVBAR */}
      <nav className="shop-nav">
        <div className="shop-nav__logo">
          <Link to="/shop">CITY STYLE</Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="shop-nav__links">
          <li><Link to="/shop">SHOP</Link></li>
          <li><Link to="/hoodies-sweatshirts">HOODIES</Link></li>
          <li><Link to="/coats-parkas">COATS</Link></li>
          <li><Link to="/oversized-tshirt">T-SHIRTS</Link></li>
          <li><Link to="/under-40">UNDER $40</Link></li>
        </ul>

        {/* Right Side — Profile + Logout */}
        <div className="shop-nav__actions">
          <Link to="/profile" className="shop-nav__profile" aria-label="Go to profile">
            <LazyImage
              src={user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
              alt="Profile"
              width={36}
              height={36}
              aspectRatio="1 / 1"
              objectFit="cover"
              wrapperStyle={{ borderRadius: '50%' }}
              referrerPolicy="no-referrer"
            />
            <span className="shop-nav__username">
              {user?.displayName?.split(' ')[0] || 'Profile'}
            </span>
          </Link>
          <button className="shop-nav__logout" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="shop-nav__mobile-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`shop-mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />
      <ul className={`shop-mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><Link to="/shop" onClick={closeMenu}>SHOP</Link></li>
        <li><Link to="/hoodies-sweatshirts" onClick={closeMenu}>HOODIES</Link></li>
        <li><Link to="/coats-parkas" onClick={closeMenu}>COATS</Link></li>
        <li><Link to="/oversized-tshirt" onClick={closeMenu}>T-SHIRTS</Link></li>
        <li><Link to="/under-40" onClick={closeMenu}>UNDER $40</Link></li>
        <li><Link to="/profile" onClick={closeMenu}>MY PROFILE</Link></li>
        <li>
          <button className="shop-mobile-logout" onClick={handleLogout}>
            LOGOUT
          </button>
        </li>
      </ul>

      {/* SHOP CONTENT */}
      <main className="shop-main">
        <div className="shop-coming-soon">
          <div className="shop-coming-soon__icon">
            <i className="ri-store-2-line"></i>
          </div>
          <h1>Shop is Coming Soon</h1>
          <p>
            We're building something great. Browse our existing collections
            while the full shop experience is being crafted.
          </p>
          <div className="shop-coming-soon__links">
            <Link to="/hoodies-sweatshirts" className="shop-cat-btn">
              <i className="ri-t-shirt-line"></i> Hoodies
            </Link>
            <Link to="/coats-parkas" className="shop-cat-btn">
              <i className="ri-t-shirt-2-line"></i> Coats
            </Link>
            <Link to="/oversized-tshirt" className="shop-cat-btn">
              <i className="ri-t-shirt-line"></i> T-Shirts
            </Link>
            <Link to="/under-40" className="shop-cat-btn">
              <i className="ri-price-tag-3-line"></i> Under $40
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
