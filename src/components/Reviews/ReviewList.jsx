import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';

const ReviewList = ({ reviews }) => {
  const [filterRating, setFilterRating] = useState('all');
  const [sortOption, setSortOption] = useState('recent');

  const filteredReviews = reviews.filter((review) => {
    if (filterRating === 'all') return true;
    return Math.floor(review.rating) === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortOption) {
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'recent':
      default:
        // Use getTime() for safer date comparison
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  if (!reviews || reviews.length === 0) {
      return <div>No reviews yet. Be the first to review!</div>;
  }

  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="review-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{averageRating}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StarRating rating={parseFloat(averageRating)} size={24} />
                <span style={{ color: '#666', fontSize: '0.9rem' }}>Based on {reviews.length} reviews</span>
            </div>
         </div>
         
         <div style={{ display: 'flex', gap: '15px' }}>
             <select 
               value={sortOption} 
               onChange={(e) => setSortOption(e.target.value)}
               style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.9rem' }}
             >
                 <option value="recent">Most Recent</option>
                 <option value="highest">Highest Rated</option>
                 <option value="lowest">Lowest Rated</option>
             </select>
             
             <select 
               value={filterRating} 
               onChange={(e) => setFilterRating(e.target.value)}
               style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.9rem' }}
             >
                 <option value="all">All Ratings</option>
                 <option value="5">5 Stars</option>
                 <option value="4">4 Stars</option>
                 <option value="3">3 Stars</option>
                 <option value="2">2 Stars</option>
                 <option value="1">1 Star</option>
             </select>
         </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {sortedReviews.length > 0 ? (
            sortedReviews.map((review, index) => (
            <ReviewCard key={review.id || index} review={review} />
            ))
        ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                No reviews found with the selected filter.
            </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
