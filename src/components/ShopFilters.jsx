import React, { useState } from 'react';

const CATEGORIES = ['New Arrivals', 'Youngs Favourite', 'Hoodies', 'Coats', 'T-Shirts', 'Accessories'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Navy', hex: '#2c3e50' },
    { name: 'Red', hex: '#c0392b' },
    { name: 'Yellow', hex: '#e5d241' },
];
const RATINGS = [
    { label: '4★ & above', value: 4 },
    { label: '3★ & above', value: 3 },
    { label: '2★ & above', value: 2 },
];

const ShopFilters = ({ filters, setFilters, onClose }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleCategoryChange = (cat) => {
        setLocalFilters(prev => {
            const current = prev.category || [];
            const updated = current.includes(cat)
                ? current.filter(c => c !== cat)
                : [...current, cat];
            return { ...prev, category: updated };
        });
    };

    const handleSizeChange = (size) => {
        setLocalFilters(prev => {
            const current = prev.size || [];
            const updated = current.includes(size)
                ? current.filter(s => s !== size)
                : [...current, size];
            return { ...prev, size: updated };
        });
    };

    const handleColorChange = (hex) => {
        setLocalFilters(prev => {
            const current = prev.color || [];
            const updated = current.includes(hex)
                ? current.filter(c => c !== hex)
                : [...current, hex];
            return { ...prev, color: updated };
        });
    };

    const handlePriceChange = (e, type) => {
        setLocalFilters(prev => ({
            ...prev,
            [type]: e.target.value
        }));
    };

    const handleRatingChange = (value) => {
        setLocalFilters(prev => ({
            ...prev,
            rating: prev.rating === value ? '' : value
        }));
    };

    const applyFilters = () => {
        setFilters(localFilters);
        if (onClose) onClose();
    };

    const clearFilters = () => {
        const cleared = { category: [], size: [], color: [], minPrice: '', maxPrice: '', rating: '' };
        setLocalFilters(cleared);
        setFilters(cleared);
        if (onClose) onClose();
    };

    return (
        <div className="shop-filters-container">
            <div className="filters-header">
                <h3>Filters</h3>
                {onClose && (
                    <button className="close-filters-btn" onClick={onClose}>
                        <i className="ri-close-line"></i>
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div className="filter-section">
                <h4>Category</h4>
                <div className="filter-options">
                    {CATEGORIES.map(cat => (
                        <label key={cat} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={(localFilters.category || []).includes(cat)}
                                onChange={() => handleCategoryChange(cat)}
                            />
                            <span className="checkmark"></span>
                            {cat}
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={localFilters.minPrice || ''}
                        onChange={(e) => handlePriceChange(e, 'minPrice')}
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={localFilters.maxPrice || ''}
                        onChange={(e) => handlePriceChange(e, 'maxPrice')}
                    />
                </div>
            </div>

            {/* Size Filter */}
            <div className="filter-section">
                <h4>Size</h4>
                <div className="size-grid">
                    {SIZES.map(size => (
                        <button
                            key={size}
                            className={`size-btn ${(localFilters.size || []).includes(size) ? 'active' : ''}`}
                            onClick={() => handleSizeChange(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Filter */}
            <div className="filter-section">
                <h4>Color</h4>
                <div className="color-grid">
                    {COLORS.map(color => (
                        <button
                            key={color.hex}
                            className={`color-btn ${(localFilters.color || []).includes(color.hex) ? 'active' : ''}`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                            onClick={() => handleColorChange(color.hex)}
                        >
                            {(localFilters.color || []).includes(color.hex) && (
                                <i className="ri-check-line" style={{ color: color.hex === '#ffffff' ? '#000' : '#fff' }}></i>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-section">
                <h4>Rating</h4>
                <div className="rating-filter-grid">
                    {RATINGS.map(r => (
                        <button
                            key={r.value}
                            className={`rating-filter-btn ${localFilters.rating === r.value ? 'active' : ''}`}
                            onClick={() => handleRatingChange(r.value)}
                        >
                            <span className="rating-stars">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={i < r.value ? 'ri-star-fill' : 'ri-star-line'}></i>
                                ))}
                            </span>
                            <span className="rating-label">{r.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-actions">
                <button className="clear-btn" onClick={clearFilters}>Clear All</button>
                <button className="apply-btn" onClick={applyFilters}>Apply Filters</button>
            </div>
        </div>
    );
};

export default ShopFilters;
