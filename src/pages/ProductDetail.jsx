import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Breadcrumb from '../components/Breadcrumb'
import ReviewForm from '../components/Reviews/ReviewForm'
import ReviewList from '../components/Reviews/ReviewList'
import StarRating from '../components/Reviews/StarRating'
import { useCart } from '../contexts/CartContext'
import CartIcon from '../components/Cart/CartIcon'
import '../styles/ProductDetail.css'

const productData = {
  'hoodies-sweatshirts': {
    name: 'Hoodies & Sweatshirts',
    category: 'New Arrivals',
    image: '/assets/hoodie.jpg',
    price: 59.99,
    originalPrice: 89.99,
    badge: 'Trending',
    rating: 4.5,
    reviews: 128,
    description:
      'Premium quality hoodies and sweatshirts crafted for ultimate comfort and style. Made from soft, breathable cotton blend fabric with a modern oversized fit. Perfect for layering in cooler weather or wearing as a standalone statement piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#2c3e50', '#8e44ad', '#e5d241', '#ecf0f1'],
    features: [
      'Premium 100% organic cotton blend',
      'Oversized relaxed fit',
      'Ribbed cuffs and hem',
      'Kangaroo front pocket',
      'Machine washable',
      'Available in 5 colors',
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Tumble dry low',
      'Do not bleach',
      'Iron on low heat if needed',
    ],
  },
  'coats-parkas': {
    name: 'Coats & Parkas',
    category: 'New Arrivals',
    image: '/assets/arrival-2.jpg',
    price: 129.99,
    originalPrice: 179.99,
    badge: 'Winter Essential',
    rating: 4.7,
    reviews: 96,
    description:
      'Stay warm in style with our premium coats and parkas collection. Featuring water-resistant outer shells, insulated lining, and contemporary silhouettes that transition seamlessly from street to occasion.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#2c3e50', '#7f8c8d', '#c0392b'],
    features: [
      'Water-resistant outer shell',
      'Warm quilted insulation',
      'Detachable faux-fur hood',
      'Multiple zippered pockets',
      'Adjustable drawstring waist',
      'Wind-proof construction',
    ],
    careInstructions: [
      'Dry clean recommended',
      'Spot clean minor stains',
      'Store on a wide hanger',
      'Do not iron directly on fabric',
    ],
  },
  'oversized-tshirt': {
    name: 'Oversized T-Shirt',
    category: 'New Arrivals',
    image: '/assets/OVRSIZED.webp',
    price: 34.99,
    originalPrice: 49.99,
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 256,
    description:
      'The ultimate streetwear essential. Our oversized tees feature a dropped shoulder design, premium heavyweight cotton, and a relaxed silhouette that delivers effortless cool. Perfect for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#ecf0f1', '#e5d241', '#2ecc71', '#3498db'],
    features: [
      '240 GSM heavyweight cotton',
      'Dropped shoulder design',
      'Reinforced neck ribbing',
      'Pre-shrunk fabric',
      'Unisex fit',
      'Screen-printed graphics',
    ],
    careInstructions: [
      'Machine wash cold inside out',
      'Hang dry for best results',
      'Do not bleach',
      'Iron inside out on low heat',
    ],
  },
  'instagram-trending': {
    name: 'Trending on Instagram',
    category: "Young's Favourite",
    image: '/assets/Selena Gomez.webp',
    price: 79.99,
    originalPrice: null,
    badge: 'Viral',
    rating: 4.6,
    reviews: 189,
    description:
      'Curated collection of the most-loved pieces trending on Instagram. These are the styles influencers and fashion-forward individuals are wearing right now. Stay ahead of the curve with our hand-picked viral fits.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#000000', '#e5d241', '#e74c3c', '#9b59b6'],
    features: [
      'Instagram-approved styles',
      'Limited edition drops',
      'Celebrity-inspired designs',
      'Premium quality materials',
      'Exclusive to CITY STYLE',
      'New arrivals weekly',
    ],
    careInstructions: [
      'Follow individual garment care labels',
      'Machine wash cold recommended',
      'Lay flat to dry',
    ],
  },
  'under-40': {
    name: 'All Under $40',
    category: "Young's Favourite",
    image: '/assets/favourite-2.jpg',
    price: 29.99,
    originalPrice: 39.99,
    badge: 'Value Pick',
    rating: 4.3,
    reviews: 312,
    description:
      'Style does not have to break the bank. Discover our collection of trend-right pieces all priced under $40. From basics to statement pieces, build your wardrobe without the guilt.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#000000', '#ecf0f1', '#2c3e50', '#e5d241'],
    features: [
      'All items under $40',
      'Quality materials guaranteed',
      'Mix and match essentials',
      'Seasonal updates',
      'Free returns within 30 days',
      'Bundle discounts available',
    ],
    careInstructions: [
      'Follow individual garment care labels',
      'Machine wash cold recommended',
    ],
  },
}

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const product = productData[slug]

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
    setQuantity(1)
    if (product?.sizes?.length > 0) setSelectedSize(product.sizes[0])
    if (product?.colors?.length > 0) setSelectedColor(product.colors[0])
    
    return () => unsubscribe()
  }, [slug, product])

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
