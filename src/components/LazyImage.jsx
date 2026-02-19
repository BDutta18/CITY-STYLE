import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

/**
 * LazyImage Component - Optimized image loading with IntersectionObserver
 * @param {string} src - Image source (required)
 * @param {string} webpSrc - WebP version of the image
 * @param {string} alt - Alt text for accessibility (required)
 * @param {number} width - Image width for layout stability
 * @param {number} height - Image height for layout stability
 * @param {string} className - Additional CSS classes for img element
 * @param {string} wrapperClassName - CSS classes for wrapper div
 * @param {string} sizes - Sizes attribute for responsive images
 * @param {string} srcSet - srcSet for responsive images (fallback format)
 * @param {string} webpSrcSet - srcSet for WebP responsive images
 * @param {string} loading - Loading strategy ('lazy' or 'eager')
 * @param {string} decoding - Image decoding hint ('async', 'sync', 'auto')
 * @param {string} fetchPriority - Fetch priority hint ('high', 'low', 'auto')
 * @param {boolean} priority - Load image immediately (bypass lazy loading)
 * @param {string} aspectRatio - CSS aspect-ratio value
 * @param {string} objectFit - CSS object-fit value
 * @param {object} style - Inline styles for img element
 * @param {object} wrapperStyle - Inline styles for wrapper div
 * @param {string} placeholderClassName - CSS classes for placeholder
 * @param {number} blurAmount - Initial blur amount in pixels (default: 8)
 * @param {string} fallbackSrc - Fallback image when loading fails
 */
const LazyImage = ({
  src,
  webpSrc,
  alt,
  width,
  height,
  className,
  wrapperClassName,
  sizes,
  srcSet,
  webpSrcSet,
  loading,
  decoding = 'async',
  fetchPriority,
  priority = false,
  aspectRatio,
  objectFit = 'cover',
  style,
  wrapperStyle,
  placeholderClassName,
  blurAmount = 8,
  fallbackSrc = '/assets/placeholder-error.png',
  ...imgProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const wrapperRef = useRef(null)
  const observerRef = useRef(null)

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    if (typeof window === 'undefined') {
      setIsInView(true)
      return
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry && entry.isIntersecting) {
          setIsInView(true)
          if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
          }
        }
      },
      { rootMargin: '50px 0px' }
    )

    observerRef.current = observer

    const node = wrapperRef.current
    if (node) {
      observer.observe(node)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [priority])

  const shouldLoad = priority || isInView
  const effectiveLoading = priority ? 'eager' : loading || 'lazy'
  
  // Transparent 1x1 pixel as placeholder
  const placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'

  const resolvedWrapperStyle = {
    ...wrapperStyle,
    ...(aspectRatio ? { aspectRatio } : null),
  }

  const resolvedImgStyle = {
    objectFit,
    ...style,
    ...(blurAmount && !isLoaded ? { filter: `blur(${blurAmount}px)` } : {}),
  }

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
  }
  
  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Failed to load image: ${src}`)
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`lazy-image__wrapper ${isLoaded ? 'is-loaded' : ''} ${wrapperClassName || ''}`.trim()}
      style={resolvedWrapperStyle}
    >
      <div
        className={`lazy-image__placeholder ${placeholderClassName || ''}`.trim()}
        aria-hidden="true"
      />
      <picture>
        {shouldLoad && webpSrc ? (
          <source
            type="image/webp"
            srcSet={webpSrcSet || webpSrc}
            sizes={sizes}
          />
        ) : null}
        {shouldLoad && srcSet ? <source srcSet={srcSet} sizes={sizes} /> : null}
        <img
          src={hasError ? fallbackSrc : (shouldLoad ? src : placeholderSrc)}
          alt={alt}
          width={width}
          height={height}
          loading={effectiveLoading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          className={`lazy-image__img ${isLoaded ? 'is-loaded' : ''} ${hasError ? 'has-error' : ''} ${className || ''}`.trim()}
          style={resolvedImgStyle}
          onLoad={handleLoad}
          onError={handleError}
          {...imgProps}
        />
      </picture>
    </div>
  )
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  webpSrc: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
  webpSrcSet: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  decoding: PropTypes.oneOf(['async', 'sync', 'auto']),
  fetchPriority: PropTypes.oneOf(['high', 'low', 'auto']),
  priority: PropTypes.bool,
  aspectRatio: PropTypes.string,
  objectFit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down']),
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  placeholderClassName: PropTypes.string,
  blurAmount: PropTypes.number,
  fallbackSrc: PropTypes.string,
}

export default LazyImage
