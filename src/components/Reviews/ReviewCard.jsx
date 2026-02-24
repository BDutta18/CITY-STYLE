import React from 'react';
import StarRating from './StarRating';

const ReviewCard = ({ review }) => {
  const displayName = review.userName || review?.user?.name || 'Anonymous';
  const displayDate = review.date || review.createdAt;
  const displayContent = review.content || review.comment;
  const displaySize = review.size || review.sizePurchased;
  const displayImage = review.image || review.imageUrl;

  return (
    <div className="review-card" style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#555' }}>
                 {(displayName || 'A').charAt(0).toUpperCase()}
             </div>
             <div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>{displayName}</h4>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>{new Date(displayDate).toLocaleDateString()}</span>
             </div>
        </div>
        <StarRating rating={review.rating} size={18} />
      </div>
      
      {review.verified && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', fontSize: '0.8rem', color: '#2ecc71' }}>
             <span>✓ Verified Purchase</span>
          </div>
      )}
      
      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>{review.title}</h3>
      <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>{displayContent}</p>
      
      <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#666', borderTop: '1px solid #f9f9f9', paddingTop: '10px' }}>
          {review.recommended !== undefined && (
            <div>
              <strong>Recommends this product:</strong> {review.recommended ? 'Yes' : 'No'}
            </div>
          )}
          {displaySize && (
            <div>
              <strong>Size Purchased:</strong> {displaySize}
            </div>
          )}
      </div>
      
      {displayImage && (
          <div style={{ marginTop: '15px' }}>
              <img src={displayImage} alt="Review" style={{ maxWidth: '100px', borderRadius: '4px', border: '1px solid #ddd' }} />
          </div>
      )}
    </div>
  );
};

export default ReviewCard;
