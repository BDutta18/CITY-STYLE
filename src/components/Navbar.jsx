import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import CartIcon from './Cart/CartIcon';
import '../styles/index.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Helper to determine if we need to navigate to home for hash links
  const getHashLink = (hash) => {
    return location.pathname === '/' ? hash : `/${hash}`;
  };

  return (
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
        <li><a href={getHashLink("#catalogue")}>CATALOGUE</a></li>
        <li><a href={getHashLink("#fashion")}>FASHION</a></li>
        <li><a href={getHashLink("#favourite")}>FAVOURITE</a></li>
        <li><a href={getHashLink("#lifestyle")}>LIFESTYLE</a></li>
        <li className="nav__auth-item">
          {user ? (
            <Link to="/profile" className="nav__profile-link">
              {user.photoURL ? (
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
  );
};

export default Navbar;
