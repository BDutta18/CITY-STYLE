import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import './ProductModal.css'

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0])
    }
    setQuantity(1)
  }, [product, isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
    onClose()
  }

  return (
    <div className="product-modal__overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal__close" onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>

        <div className="product-modal__body">
          <div className="product-modal__image">
            <img src={product.image} alt={product.name} />
            {product.badge && (
              <span className="product-modal__badge">{product.badge}</span>
            )}
          </div>

          <div className="product-modal__info">
            <span className="product-modal__category">{product.category}</span>
            <h2 className="product-modal__name">{product.name}</h2>

            <div className="product-modal__rating">
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
              <span>({product.reviews} reviews)</span>
            </div>

            <div className="product-modal__price">
              <span className="product-modal__current-price">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="product-modal__original-price">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="product-modal__description">{product.description}</p>

            {product.sizes && (
              <div className="product-modal__sizes">
                <h4>Available Sizes</h4>
                <div className="product-modal__size-options">
                  {product.sizes.map((size) => (
                    <span 
                      key={size} 
                      className={`product-modal__size`}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: selectedSize === size ? '#000' : '#fff',
                        color: selectedSize === size ? '#fff' : '#000',
                        border: '1px solid #ddd'
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div className="product-modal__colors">
                <h4>Colors</h4>
                <div className="product-modal__color-options">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="product-modal__color-swatch"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            <div className="product-modal__actions" style={{ display: 'flex', gap: '10px' }}>
              <div className="quantity-selector" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >-</button>
                <span style={{ padding: '0 0.5rem', fontWeight: 'bold' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >+</button>
              </div>

              <button 
                className="btn product-modal__add-btn" 
                onClick={handleAddToCart}
                disabled={!selectedSize}
                style={{ flex: 1, backgroundColor: '#000', color: '#fff' }}
              >
                Add to Cart
              </button>

              <Link
                to={`/product/${product.slug}`}
                className="btn product-modal__detail-btn"
                style={{ flex: 1, textAlign: 'center' }}
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
