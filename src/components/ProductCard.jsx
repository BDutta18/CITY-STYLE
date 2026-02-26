import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to product detail
        // Use default size/color if not specified (or prompt user - for prototype we add default)
        const selectedSize = product.sizes?.[0] || 'M';
        addToCart(product, 1, selectedSize);
    };

    const toggleWishlist = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<i key={i} className="ri-star-fill"></i>);
            } else if (i === fullStars && hasHalf) {
                stars.push(<i key={i} className="ri-star-half-fill"></i>);
            } else {
                stars.push(<i key={i} className="ri-star-line"></i>);
            }
        }
        return stars;
    };

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-wrapper">
                <Link to={`/product/${product.slug}`}>
                    <img
                        src={product.image || '/assets/placeholder.jpg'}
                        alt={product.name}
                        className={`product-img ${isHovered ? 'zoomed' : ''}`}
                        loading="lazy"
                    />
                </Link>

                {/* Badges */}
                {product.badge && (
                    <div className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
                        {product.badge}
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={toggleWishlist}
                    aria-label="Add to wishlist"
                >
                    <i className={isWishlisted ? "ri-heart-3-fill" : "ri-heart-3-line"}></i>
                </button>

                {/* Quick Add Overlay */}
                <div className={`quick-add-overlay ${isHovered ? 'visible' : ''}`}>
                    <button className="quick-add-btn" onClick={handleAddToCart}>
                        <i className="ri-shopping-cart-line"></i> Quick Add
                    </button>
                </div>
            </div>

            <div className="product-info">
                <div className="product-category">{product.category}</div>
                <Link to={`/product/${product.slug}`} className="product-name">
                    <h3>{product.name}</h3>
                </Link>

                <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="reviews-count">({product.reviews})</span>
                </div>

                <div className="product-price-wrapper">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
