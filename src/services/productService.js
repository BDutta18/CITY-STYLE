import axios from 'axios';
import { catalogueProducts } from '../data/products';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getProducts = async (filters = {}, limit = 20, offset = 0) => {
    try {
        const params = new URLSearchParams();

        if (filters.category && filters.category.length > 0) {
            params.append('category', filters.category.join(','));
        }
        if (filters.search) params.append('q', filters.search);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.size && filters.size.length > 0) {
            params.append('size', filters.size.join(','));
        }
        if (filters.color && filters.color.length > 0) {
            params.append('color', filters.color.join(','));
        }
        if (filters.rating) {
            params.append('rating', filters.rating);
        }

        params.append('limit', limit);
        params.append('offset', offset);

        const response = await axios.get(`${API_URL}/api/products?${params.toString()}`);

        if (response.data && response.data.products && response.data.products.length > 0) {
            return response.data; // { products, total, limit, offset }
        }

        // Fallback to static data with same shape
        console.warn('API returned empty products, falling back to static data');
        const filtered = applyStaticFilters(catalogueProducts, filters);
        return {
            products: filtered.slice(offset, offset + limit),
            total: filtered.length,
            limit,
            offset
        };

    } catch (error) {
        console.error('Error fetching products, falling back to static:', error);
        const filtered = applyStaticFilters(catalogueProducts, filters);
        return {
            products: filtered.slice(offset, offset + limit),
            total: filtered.length,
            limit,
            offset
        };
    }
};

// Helper function to apply basic filters to static data
const applyStaticFilters = (products, filters) => {
    let result = [...products];

    if (filters.category && filters.category.length > 0) {
        result = result.filter(p => filters.category.includes(p.category));
    }
    if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
    }
    if (filters.minPrice) {
        result = result.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
        result = result.filter(p => p.price <= Number(filters.maxPrice));
    }
    if (filters.rating) {
        result = result.filter(p => (p.rating || 0) >= Number(filters.rating));
    }

    if (filters.sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'rating') {
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sort === 'popular') {
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    return result;
};

export const getRecommendedProducts = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/products/recommended`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommended products:', error);
        return [];
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}/api/products?q=${slug}`);
        const data = response.data;
        // Handle new paginated response shape
        const products = data.products || data;
        return Array.isArray(products) ? products[0] : null;
    } catch (error) {
        console.error(`Error fetching product ${slug}:`, error);
        return null;
    }
};

export const getUserPreferences = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/users/preferences`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching preferences:', error);
        return null;
    }
};
