import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Breadcrumb from '../components/Breadcrumb'
import ReviewForm from '../components/Reviews/ReviewForm'
import ReviewList from '../components/Reviews/ReviewList'
import StarRating from '../components/Reviews/StarRating'
import { getProductBySlug } from '../data/products'
import '../styles/ProductDetail.css'

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const product = getProductBySlug(slug)

  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: 'Alex M.',
      rating: 5,
      date: '2025-01-15T10:00:00Z',
      title: 'Absolutely love it!',
      content: 'I was skeptical at first, but this product exceeded my expectations. The quality is top-notch and it arrived faster than expected.',
      verified: true,
      recommended: true,
      size: 'L'
    },
    {
      id: 2,
      userName: 'Sarah K.',
      rating: 4,
      date: '2025-02-02T14:30:00Z',
      title: 'Great, but size runs small',
      content: 'Really nice material. I usually wear M but ordered L for an oversized fit and it was perfect. Just keep in mind check the size guide.',
      verified: true,
      recommended: true,
      size: 'L'
    }
  ]);

  const handleReviewSubmit = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    window.scrollTo(0, 0)
    return () => unsubscribe()
  }, [slug])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  if (!product) {
    return (
      <>
        <nav>
          <div className="nav__header">
            <div className="nav__logo">
              <Link to="/">CITY STYLE</Link>
            </div>
          </div>
        </nav>
        <div className="section__container product-not-found">
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <Link to="/">CITY STYLE</Link>
          </div>
          <div className="nav__menu__btn" id="menu-btn" onClick={toggleMenu}>
            <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
          </div>
        </div>
        <ul
          className={`nav__links ${isMenuOpen ? 'open' : ''}`}
          onClick={closeMenu}
        >
          <li>
            <Link to="/#catalogue">CATALOGUE</Link>
          </li>
          <li>
            <Link to="/shop">SHOP</Link>
          </li>
          <li className="nav__auth-item">
            {user ? (
              <Link to="/profile" className="nav__profile-link">
                <i className="fa-solid fa-circle-user"></i>
              </Link>
            ) : (
              <Link to="/auth" className="btn signup-btn">
                SIGN UP
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <Breadcrumb />

      <section className="section__container product-detail">
        <div className="product-detail__grid">
          <div className="product-detail__image-section">
            <div className="product-detail__main-image">
              <img src={product.image} alt={product.name} />
              {product.badge && (
                <span className="product-detail__badge">{product.badge}</span>
              )}
            </div>
          </div>

          <div className="product-detail__info-section">
            <span className="product-detail__category">
              {product.category}
            </span>
            <h1 className="product-detail__name">{product.name}</h1>

            <div className="product-detail__rating">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? 'ri-star-fill'
                      : i < product.rating
                      ? 'ri-star-half-fill'
                      : 'ri-star-line'
                  }
                ></i>
              ))}
              <span>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="product-detail__price">
              <span className="product-detail__current-price">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="product-detail__original-price">
                    ${product.originalPrice}
                  </span>
                  <span className="product-detail__discount">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            <p className="product-detail__description">
              {product.description}
            </p>

            {product.sizes && (
              <div className="product-detail__sizes">
                <h4>Select Size</h4>
                <div className="product-detail__size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`product-detail__size ${
                        selectedSize === size ? 'active' : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <Link to="/size-guide" className="product-detail__size-guide">
                  <i className="ri-ruler-line"></i> Size Guide
                </Link>
              </div>
            )}

            {product.colors && (
              <div className="product-detail__colors">
                <h4>Select Color</h4>
                <div className="product-detail__color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`product-detail__color-swatch ${
                        selectedColor === color ? 'active' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-detail__actions">
              <button className="btn product-detail__add-to-cart">
                <i className="ri-shopping-bag-line"></i> Add to Cart
              </button>
              <button className="product-detail__wishlist-btn">
                <i className="ri-heart-line"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="product-detail__extras">
          <div className="product-detail__features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, i) => (
                <li key={i}>
                  <i className="ri-check-line"></i> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-detail__care">
            <h3>Care Instructions</h3>
            <ul>
              {product.careInstructions.map((instruction, i) => (
                <li key={i}>
                  <i className="ri-information-line"></i> {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section__container" id="reviews">
            <h2 className="section__header">Customer Reviews</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
                  <ReviewList reviews={reviews} />
                </div>
                <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <ReviewForm onSubmit={handleReviewSubmit} />
                </div>
            </div>
        </div>

        <div className="product-detail__back">
          <button className="btn" onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-line"></i> Continue Shopping
          </button>
        </div>
      </section>

      <footer>
        <div className="section__container footer__container">
          <div className="footer__col">
            <div className="footer__logo">
              <Link to="/">FASHION</Link>
            </div>
            <p>Complete your style with awesome clothes from us.</p>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/size-guide">Size Guide</Link>
              </li>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
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

export default ProductDetail
