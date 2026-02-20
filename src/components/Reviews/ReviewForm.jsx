import React, { useState } from 'react';
import StarRating from './StarRating';

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    recommend: true,
    size: '',
    image: null
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) setErrors(prev => ({ ...prev, rating: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.rating) newErrors.rating = 'Please select a rating';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.content.length < 50) newErrors.content = 'Review must be at least 50 characters';
    if (!formData.size) newErrors.size = 'Please select a size';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const reviewData = {
        ...formData,
        date: new Date().toISOString(),
        id: Date.now(),
        userName: 'You',
        verified: false // New reviews are not verified automatically
      };

      // Create object URL for local image preview if a file was selected
      if (formData.image instanceof File) {
          reviewData.image = URL.createObjectURL(formData.image);
      }

      onSubmit(reviewData);

      // Reset form
      setFormData({
        rating: 0,
        title: '',
        content: '',
        recommend: true,
        size: '',
        image: null
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
      <h3 style={{ marginTop: 0 }}>Write a Review</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rating *</label>
        <StarRating rating={formData.rating} interactive={true} onRatingChange={handleRatingChange} size={30} />
        {errors.rating && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.rating}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Review Title *</label>
        <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Summarize your thoughts"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.title && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.title}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Review *</label>
        <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            placeholder="Share your experience (min 50 chars)"
            rows={4}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
        />
        {errors.content && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.content}</span>}
        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: formData.content.length < 50 ? 'red' : 'green' }}>
            {formData.content.length} characters
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Size Purchased *</label>
            <select 
                name="size" 
                value={formData.size} 
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>
            {errors.size && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.size}</span>}
        </div>
        
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Would you recommend?</label>
             <div style={{ display: 'flex', gap: '10px' }}>
                <label>
                    <input 
                        type="radio" 
                        name="recommend" 
                        checked={formData.recommend === true} 
                        onChange={() => setFormData(prev => ({ ...prev, recommend: true }))}
                    /> Yes
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="recommend" 
                        checked={formData.recommend === false} 
                        onChange={() => setFormData(prev => ({ ...prev, recommend: false }))}
                    /> No
                </label>
             </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Add Photo (Optional)</label>
          <input 
            type="file" 
            name="image" 
            accept="image/*"
            onChange={handleChange}
            style={{ fontSize: '0.9rem' }}
          />
      </div>

      <button 
        type="submit" 
        style={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontSize: '1rem',
            fontWeight: 'bold',
            width: '100%'
        }}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
