import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProducts, getRecommendedProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ShopFilters from '../components/ShopFilters';
import { Link } from 'react-router-dom';
import '../styles/Shop.css';

const PRODUCTS_PER_PAGE = 12;

const COLORS_MAP = {
  '#000000': 'Black',
  '#ffffff': 'White',
  '#2c3e50': 'Navy',
  '#c0392b': 'Red',
  '#e5d241': 'Yellow',
};

const Shop = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    minPrice: '',
    maxPrice: '',
    rating: '',
    sort: 'newest',
    search: ''
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const fetchRecommended = async () => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const recs = await getRecommendedProducts(token);
          setRecommendedProducts(recs);
        } catch (error) {
          console.error("Error fetching recommended:", error);
        }
      }
    };
    fetchRecommended();
  }, [user]);

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0);
    setProducts([]);
  }, [filters]);

  // Fetch products when filters or offset change
  useEffect(() => {
    const fetchAllProducts = async () => {
      if (offset === 0) setLoading(true);
      else setLoadingMore(true);

      try {
        const result = await getProducts(filters, PRODUCTS_PER_PAGE, offset);
        if (offset === 0) {
          setProducts(result.products);
        } else {
          setProducts(prev => [...prev, ...result.products]);
        }
        setTotalProducts(result.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchAllProducts();
  }, [filters, offset]);

  const handleSortChange = (e) => setFilters(prev => ({ ...prev, sort: e.target.value }));
  const handleSearchChange = (e) => setFilters(prev => ({ ...prev, search: e.target.value }));

  const handleLoadMore = () => {
    setOffset(prev => prev + PRODUCTS_PER_PAGE);
  };

  const quickLinks = [
    { name: 'Hoodies', icon: 'ri-t-shirt-line' },
    { name: 'Coats', icon: 'ri-cloud-windy-line' },
    { name: 'New Arrivals', icon: 'ri-vip-crown-line' },
    { name: "Youngs Favourite", icon: 'ri-fire-line' },
  ];

  const handleQuickLinkClick = (name) => {
    setFilters(prev => {
      const isSelected = prev.category.includes(name);
      const newCat = isSelected ? prev.category.filter(c => c !== name) : [...prev.category, name];
      return { ...prev, category: newCat };
    });
  };

  // Active filter helpers
  const getActiveFilters = useCallback(() => {
    const tags = [];
    filters.category.forEach(c => tags.push({ type: 'category', value: c, label: c }));
    filters.size.forEach(s => tags.push({ type: 'size', value: s, label: `Size: ${s}` }));
    filters.color.forEach(c => tags.push({ type: 'color', value: c, label: `Color: ${COLORS_MAP[c] || c}` }));
    if (filters.minPrice) tags.push({ type: 'minPrice', value: filters.minPrice, label: `Min: $${filters.minPrice}` });
    if (filters.maxPrice) tags.push({ type: 'maxPrice', value: filters.maxPrice, label: `Max: $${filters.maxPrice}` });
    if (filters.rating) tags.push({ type: 'rating', value: filters.rating, label: `${filters.rating}★ & above` });
    return tags;
  }, [filters]);

  const removeFilter = (tag) => {
    setFilters(prev => {
      const next = { ...prev };
      if (tag.type === 'category') next.category = prev.category.filter(c => c !== tag.value);
      else if (tag.type === 'size') next.size = prev.size.filter(s => s !== tag.value);
      else if (tag.type === 'color') next.color = prev.color.filter(c => c !== tag.value);
      else if (tag.type === 'minPrice') next.minPrice = '';
      else if (tag.type === 'maxPrice') next.maxPrice = '';
      else if (tag.type === 'rating') next.rating = '';
      return next;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: [], size: [], color: [],
      minPrice: '', maxPrice: '', rating: '',
      sort: 'newest', search: ''
    });
  };

  const activeTags = getActiveFilters();
  const hasMore = products.length < totalProducts;

  return (
    <div className="shop-page">
      {/* NAVBAR */}
      <nav className="shop-nav">
        <div className="shop-nav__logo">
          <Link to="/">CITY STYLE</Link>
        </div>

        <ul className="shop-nav__links">
          <li><Link to="/shop">SHOP</Link></li>
          <li><Link to="/#hoodies">HOODIES</Link></li>
          <li><Link to="/#coats">COATS</Link></li>
        </ul>

        <div className="shop-nav__actions">
          {user ? (
            <>
              <Link to="/profile" className="shop-nav__profile" aria-label="Go to profile">
                <img
                  src={user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                  alt="Profile"
                  className="shop-nav__profile-img"
                  referrerPolicy="no-referrer"
                />
                <span className="shop-nav__username">
                  {user?.displayName?.split(' ')[0] || 'Profile'}
                </span>
              </Link>
              <button className="shop-nav__logout" onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <Link to="/auth" className="shop-nav__login">START SHOPPING</Link>
          )}
        </div>

        <button className="shop-nav__mobile-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
        </button>
      </nav>

      <div className={`shop-mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMenu} />
      <ul className={`shop-mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><Link to="/shop" onClick={closeMenu}>SHOP</Link></li>
        {user && <li><Link to="/profile" onClick={closeMenu}>MY PROFILE</Link></li>}
        {user ? (
          <li><button className="shop-mobile-logout" onClick={handleLogout}>LOGOUT</button></li>
        ) : (
          <li><Link to="/auth" onClick={closeMenu}>START SHOPPING</Link></li>
        )}
      </ul>

      {/* Hero Banner Area */}
      <section className="shop-hero">
        <div className="hero-content">
          <h1>Discover Your Next Look</h1>
          <p>Explore the latest trends, essential basics, and premium collections.</p>
        </div>
      </section>

      {/* Quick Links Horizontal Scroll */}
      <section className="quick-links-section">
        <div className="quick-links-container">
          {quickLinks.map((link, idx) => (
            <button
              key={idx}
              className={`quick-link-item ${filters.category.includes(link.name) ? 'active' : ''}`}
              onClick={() => handleQuickLinkClick(link.name)}
            >
              <i className={link.icon}></i>
              <span>{link.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recommended Section */}
      {user && recommendedProducts.length > 0 && (
        <section className="recommended-section">
          <div className="section-header">
            <h2>Recommended for You</h2>
            <p>Based on your style preferences</p>
          </div>
          <div className="recommended-grid">
            {recommendedProducts.map(product => (
              <ProductCard key={`rec-${product._id || product.slug}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Main Shop Layout */}
      <section className="shop-main-layout">
        <aside className={`desktop-sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
          <ShopFilters filters={filters} setFilters={setFilters} />
        </aside>

        <div className="catalog-area">
          <div className="catalog-top-bar">
            <div className="search-box">
              <i className="ri-search-line"></i>
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>

            <div className="top-bar-actions">
              <div className="results-count">
                Showing {products.length} of {totalProducts} products
              </div>
              <div className="sort-box">
                <label>Sort by:</label>
                <select value={filters.sort} onChange={handleSortChange}>
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              <div className="view-toggle">
                <button className={`sidebar-toggle ${!isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Toggle Filters">
                  <i className="ri-layout-left-line"></i>
                </button>
                <div style={{ width: '1px', background: '#ddd', margin: '4px' }}></div>
                <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
                  <i className="ri-grid-fill"></i>
                </button>
                <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
                  <i className="ri-list-check"></i>
                </button>
              </div>
              <button className="mobile-filter-toggle" onClick={() => setIsMobileFiltersOpen(true)}>
                <i className="ri-filter-3-line"></i> Filters
              </button>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeTags.length > 0 && (
            <div className="active-filters">
              {activeTags.map((tag, idx) => (
                <span key={idx} className="filter-tag">
                  {tag.label}
                  <i className="ri-close-line" onClick={() => removeFilter(tag)}></i>
                </span>
              ))}
              <button className="clear-all-link" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>
          )}

          <div className={`products-container ${viewMode}`}>
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))
            ) : (
              <div className="empty-state">
                <i className="ri-shopping-basket-2-line"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query.</p>
                <button onClick={clearAllFilters}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Load More */}
          {!loading && hasMore && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? (
                  <>
                    <div className="spinner-small"></div>
                    Loading...
                  </>
                ) : (
                  `Load More (${products.length} of ${totalProducts})`
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Filters Bottom Sheet */}
      <div className={`mobile-filters-overlay ${isMobileFiltersOpen ? 'open' : ''}`} onClick={() => setIsMobileFiltersOpen(false)}></div>
      <div className={`mobile-filters-sheet ${isMobileFiltersOpen ? 'open' : ''}`}>
        <ShopFilters filters={filters} setFilters={setFilters} onClose={() => setIsMobileFiltersOpen(false)} />
      </div>

    </div>
  );
};

export default Shop;
