import React, { useState, useMemo } from 'react';

const StarRating = ({ rating, interactive = false, onRatingChange, size = 24 }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  // Stable component ID to use in gradient IDs
  const componentId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  const handleMouseMove = (e, index) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    // Calculate rating based on index (1-based)
    // If index is 1, left half is 0.5, right half is 1
    const newRating = isHalf ? index - 0.5 : index;
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const handleClick = (index) => {
    if (interactive && onRatingChange) {
      onRatingChange(hoverRating || index); // Use hoverRating if set, otherwise index (fallback)
    }
  };

  return (
    <div className="star-rating" style={{ display: 'flex', alignItems: 'center' }} onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((index) => {
        // Calculate fill percentage for this star
        let fillPercentage = 0;
        
        // Use hoverRating if interacting, otherwise use prop rating
        const currentRating = (interactive && hoverRating > 0) ? hoverRating : rating;

        if (currentRating >= index) {
            fillPercentage = 100;
        } else if (currentRating === index - 0.5) {
            fillPercentage = 50;
        } else if (currentRating > index - 1 && currentRating < index) {
             // For non-interactive exact values like 4.3
             fillPercentage = Math.round((currentRating - (index - 1)) * 100);
        }
        
        // Unique ID for gradient using stable componentId
        const gradientId = `star-gradient-${componentId}-${index}`;
        const maskId = `star-mask-${componentId}-${index}`;

        return (
          <div
            key={index}
            className="star-item"
            style={{ 
                cursor: interactive ? 'pointer' : 'default', 
                width: size, 
                height: size, 
                marginRight: 2,
                position: 'relative'
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onClick={() => handleClick(index)}
          >
             <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible' }}>
                <defs>
                    <linearGradient id={gradientId}>
                        <stop offset={`${fillPercentage}%`} stopColor="#e5d241" />
                        <stop offset={`${fillPercentage}%`} stopColor="#e5e7eb" />
                    </linearGradient>
                     <filter id={`glow-${componentId}-${index}`}>
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <path 
                    d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.45 13.97L5.82 21L12 17.27Z" 
                    fill={`url(#${gradientId})`} 
                    stroke={interactive ? "#ecc94b" : "none"} 
                    strokeWidth={interactive ? "0.5" : "0"} 
                    strokeLinejoin="round" 
                />
             </svg>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
