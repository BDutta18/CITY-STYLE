import React, { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import './ProductModal.css'

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const modalRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState('')

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
    setSelectedImage((product && (product.images || [product.image])[0]))
  }, [product])

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, handleKey])

  if (!isOpen || !product) return null

  const images = product.images && product.images.length ? product.images : [product.image]

  const content = (
    <div className="product-modal__overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
        <button className="product-modal__close" onClick={onClose} aria-label="Close">
          <i className="ri-close-line"></i>
        </button>

        <div className="product-modal__body">
          <div className="product-modal__image">
            <img src={selectedImage || images[0]} alt={product.name} />
            {product.badge && (
              <span className="product-modal__badge">{product.badge}</span>
            )}

            {images.length > 1 && (
              <div className="product-modal__thumbnails">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`product-modal__thumbnail ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
            {/* image dots removed per request */}
          </div>

          <div className="product-modal__info">
            <span className="product-modal__category">{product.category}</span>
            <h2 id="product-modal-title" className="product-modal__name">{product.name}</h2>

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
              <span className="product-modal__current-price">${product.price}</span>
              {product.originalPrice && (
                <span className="product-modal__original-price">${product.originalPrice}</span>
              )}
            </div>

            <p className="product-modal__description">{product.description}</p>

            {product.sizes && (
              <div className="product-modal__sizes">
                <h4>Available Sizes</h4>
                <div className="product-modal__size-options">
                  {product.sizes.map((size) => (
                    <button key={size} type="button" className="product-modal__size">{size}</button>
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
              <button
                className="btn add-to-cart-btn"
                onClick={() => (onAddToCart ? onAddToCart(product) : console.log('Add to cart', product))}
              >
                Add to Cart
              </button>

              <Link to={`/product/${product.slug}`} className="btn product-modal__detail-btn">View Full Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export default ProductModal
