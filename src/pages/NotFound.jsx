import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <>
      <Navbar /> {/* Ensure Navbar is present */}
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-text">
            Oops! The page you're looking for doesn't exist. It looks like you've taken a wrong turn on your shopping journey.
          </p>
          <Link to="/" className="btn not-found-btn">
            Back to Home
          </Link>
        </div>
      </div>
      <Footer /> {/* Ensure Footer is present */}
    </>
  );
};

export default NotFound;
