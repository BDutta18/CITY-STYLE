import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// GET /api/products
// Fetch products with optional filtering and sorting
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, q, sort, size, color, rating, limit, offset } = req.query;

        let query = {};

        // Support comma-separated multi-select values
        if (category) {
            const categories = category.split(',').map(c => c.trim());
            query.category = categories.length === 1 ? categories[0] : { $in: categories };
        }
        if (q) {
            query.$or = [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ];
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (size) {
            const sizes = size.split(',').map(s => s.trim());
            query.sizes = sizes.length === 1 ? sizes[0] : { $in: sizes };
        }
        if (color) {
            const colors = color.split(',').map(c => c.trim());
            query.colors = colors.length === 1 ? colors[0] : { $in: colors };
        }
        if (rating) {
            query.rating = { $gte: Number(rating) };
        }

        let sortObj = {};
        if (sort === 'price_asc') sortObj.price = 1;
        else if (sort === 'price_desc') sortObj.price = -1;
        else if (sort === 'newest') sortObj.createdAt = -1;
        else if (sort === 'rating') sortObj.rating = -1;
        else if (sort === 'popular') sortObj.reviews = -1;
        else sortObj.createdAt = -1; // default to newest

        const pageLimit = Math.min(Number(limit) || 20, 100);
        const pageOffset = Number(offset) || 0;

        const [products, total] = await Promise.all([
            Product.find(query).sort(sortObj).skip(pageOffset).limit(pageLimit),
            Product.countDocuments(query)
        ]);
        res.json({ products, total, limit: pageLimit, offset: pageOffset });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/products/recommended
// Fetch recommended products based on user preferences
router.get('/recommended', authenticateUser, async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.firebaseUid });
        if (!user || !user.preferences || !user.preferences.onboardingCompleted) {
            // Fallback: Return trending / highest rated
            const fallbackProducts = await Product.find({}).sort({ rating: -1 }).limit(8);
            return res.json(fallbackProducts);
        }

        const { style, budget, categories } = user.preferences;

        let query = {};

        // Build a somewhat dynamic recommendation query
        if (categories && categories.length > 0) {
            // if user specified categories prefer those
            // Note: the mock data categories are 'New Arrivals', 'Youngs Favourite'
            // But in reality they'd be 'Hoodies', 'Coats', etc.
            // We'll just do a broad name/category regex here for simplicity since mock data differs slightly.
            const categoryRegex = categories.map(c => new RegExp(c, 'i'));
            query.$or = [
                { category: { $in: categoryRegex } },
                { name: { $in: categoryRegex } },
                { description: { $in: categoryRegex } }
            ];
        }

        if (budget) {
            if (budget === 'Under $30') query.price = { $lt: 30 };
            else if (budget === '$30-$60') query.price = { $gte: 30, $lte: 60 };
            else if (budget === '$60-$100') query.price = { $gte: 60, $lte: 100 };
            else if (budget === '$100+') query.price = { $gte: 100 };
        }

        let recommendedProducts = await Product.find(query).limit(8);

        // If our strict preference query yielded nothing, provide a fallback
        if (recommendedProducts.length === 0) {
            recommendedProducts = await Product.find({}).sort({ rating: -1 }).limit(8);
        }

        res.json(recommendedProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
