import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Breadcrumb from '../components/Breadcrumb'
import ReviewForm from '../components/Reviews/ReviewForm'
import ReviewList from '../components/Reviews/ReviewList'
import { getProductBySlug } from '../data/products'
import { useCart } from '../contexts/CartContext'
import CartIcon from '../components/Cart/CartIcon'
import { reviewAPI } from '../services/api'
import '../styles/ProductDetail.css'

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewSummary, setReviewSummary] = useState({ averageRating: 0, totalReviews: 0 })
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const product = getProductBySlug(slug)

  const normalizeReview = (review) => ({
    id: review._id || review.id,
    userName: review.userName || review?.user?.name || 'Anonymous',
    rating: review.rating,
    date: review.date || review.createdAt,
    title: review.title,
    content: review.content || review.comment,
    verified: Boolean(review.verified),
    recommended: review.recommended,
    size: review.size || review.sizePurchased,
    image: review.image || review.imageUrl
  })

  const fetchReviews = async () => {
    if (!slug) return

    try {
      setReviewsLoading(true)
      setReviewError('')
      const data = await reviewAPI.getByProduct(slug)
      setReviews((data.reviews || []).map(normalizeReview))
      setReviewSummary({
        averageRating: data.averageRating || 0,
        totalReviews: data.totalReviews || 0
      })
    } catch (error) {
      setReviewError(error.message || 'Failed to load reviews')
      setReviews([])
      setReviewSummary({ averageRating: 0, totalReviews: 0 })
    } finally {
      setReviewsLoading(false)
    }
  }

  const handleReviewSubmit = async (newReview) => {
    if (!user) {
      navigate('/auth')
      return false
    }

    setSubmitError('')
    setIsSubmittingReview(true)

    try {
      await reviewAPI.submitReview(user, {
        productSlug: slug,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.content,
        sizePurchased: newReview.size,
        recommended: newReview.recommend
      })

      await fetchReviews()
      return true
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit review')
      return false
    } finally {
      setIsSubmittingReview(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setQuantity(1)
    if (product?.sizes?.length > 0) setSelectedSize(product.sizes[0])
    if (product?.colors?.length > 0) setSelectedColor(product.colors[0])
  }, [slug, product])

  useEffect(() => {
    fetchReviews()
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

  const displayedRating = reviewSummary.totalReviews > 0 ? reviewSummary.averageRating : product.rating
  const displayedReviewCount = reviewSummary.totalReviews > 0 ? reviewSummary.totalReviews : product.reviews

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
          <li><CartIcon /></li>
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
                    i < Math.floor(displayedRating)
                      ? 'ri-star-fill'
                      : i < displayedRating
                        ? 'ri-star-half-fill'
                        : 'ri-star-line'
                  }
                ></i>
              ))}
              <span>
                {displayedRating} ({displayedReviewCount} reviews)
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
                      className={`product-detail__size ${selectedSize === size ? 'active' : ''
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
                      className={`product-detail__color-swatch ${selectedColor === color ? 'active' : ''
                        }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-detail__quantity" style={{ marginBottom: '1.5rem' }}>
              <h4>Quantity</h4>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', width: 'fit-content', borderRadius: '4px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >-</button>
                <span style={{ padding: '0 0.8rem', fontWeight: 'bold' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >+</button>
              </div>
            </div>

            <div className="product-detail__actions">
              <button
                className="btn product-detail__add-to-cart"
                onClick={() => addToCart({ ...product, slug }, quantity, selectedSize)}
                disabled={!selectedSize}
                style={{ opacity: !selectedSize ? 0.7 : 1, cursor: !selectedSize ? 'not-allowed' : 'pointer' }}
              >
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
          {reviewError && (
            <p style={{ color: '#c0392b', marginBottom: '1rem' }}>{reviewError}</p>
          )}
          {submitError && (
            <p style={{ color: '#c0392b', marginBottom: '1rem' }}>{submitError}</p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
            <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
              {reviewsLoading ? (
                <p>Loading reviews...</p>
              ) : (
                <ReviewList reviews={reviews} summary={reviewSummary} />
              )}
            </div>
            <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
              <ReviewForm
                onSubmit={handleReviewSubmit}
                isSubmitting={isSubmittingReview}
                isLoggedIn={Boolean(user)}
              />
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
