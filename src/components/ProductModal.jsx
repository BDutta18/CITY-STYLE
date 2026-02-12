import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProductModal.css'

const ProductModal = ({ product, isOpen, onClose }) => {
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
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

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
                    <span key={size} className="product-modal__size">
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

            <div className="product-modal__actions">
              <Link
                to={`/product/${product.slug}`}
                className="btn product-modal__detail-btn"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
