import React, { useState, useEffect } from 'react';
import '../styles/BackToTop.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="back-to-top">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="back-to-top__button"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default BackToTop;
