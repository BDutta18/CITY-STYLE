import React, { useEffect, useRef, useState } from 'react'

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
  ...imgProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const wrapperRef = useRef(null)

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
          observer.disconnect()
        }
      },
      { rootMargin: '50px 0px' }
    )

    const node = wrapperRef.current
    if (node) {
      observer.observe(node)
    }

    return () => {
      observer.disconnect()
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
  }

  const handleLoad = () => setIsLoaded(true)
  const handleError = () => setIsLoaded(true)

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
          src={shouldLoad ? src : placeholderSrc}
          alt={alt}
          width={width}
          height={height}
          loading={effectiveLoading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          className={`lazy-image__img ${isLoaded ? 'is-loaded' : ''} ${className || ''}`.trim()}
          style={resolvedImgStyle}
          onLoad={handleLoad}
          onError={handleError}
          {...imgProps}
        />
      </picture>
    </div>
  )
}

export default LazyImage
