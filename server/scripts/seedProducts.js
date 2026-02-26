import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup basic __dirname to find the right dotenv file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to server root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import Product from '../models/Product.js';

const catalogueProducts = [
    {
        slug: 'hoodies-sweatshirts',
        name: 'Hoodies & Sweatshirts',
        category: 'New Arrivals',
        image: '/assets/hoodie.jpg',
        price: 59.99,
        originalPrice: 89.99,
        badge: 'Trending',
        rating: 4.5,
        reviews: 128,
        description: 'Premium quality hoodies and sweatshirts crafted for ultimate comfort and style. Made from soft, breathable cotton blend fabric with a modern oversized fit. Perfect for layering in cooler weather or wearing as a standalone statement piece.',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['#000000', '#2c3e50', '#8e44ad', '#e5d241', '#ecf0f1'],
        features: [
            'Premium 100% organic cotton blend',
            'Oversized relaxed fit',
            'Ribbed cuffs and hem',
            'Kangaroo front pocket',
            'Machine washable',
            'Available in 5 colors',
        ],
        careInstructions: [
            'Machine wash cold with like colors',
            'Tumble dry low',
            'Do not bleach',
            'Iron on low heat if needed',
        ],
    },
    {
        slug: 'coats-parkas',
        name: 'Coats & Parkas',
        category: 'New Arrivals',
        image: '/assets/arrival-2.jpg',
        price: 129.99,
        originalPrice: 179.99,
        badge: 'Winter Essential',
        rating: 4.7,
        reviews: 96,
        description: 'Stay warm in style with our premium coats and parkas collection. Featuring water-resistant outer shells, insulated lining, and contemporary silhouettes that transition seamlessly from street to occasion.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['#000000', '#2c3e50', '#7f8c8d', '#c0392b'],
        features: [
            'Water-resistant outer shell',
            'Warm quilted insulation',
            'Detachable faux-fur hood',
            'Multiple zippered pockets',
            'Adjustable drawstring waist',
            'Wind-proof construction',
        ],
        careInstructions: [
            'Dry clean recommended',
            'Spot clean minor stains',
            'Store on a wide hanger',
            'Do not iron directly on fabric',
        ],
    },
    {
        slug: 'oversized-tshirt',
        name: 'Oversized T-Shirt',
        category: 'New Arrivals',
        image: '/assets/OVRSIZED.webp',
        price: 34.99,
        originalPrice: 49.99,
        badge: 'Best Seller',
        rating: 4.8,
        reviews: 256,
        description: 'The ultimate streetwear essential. Our oversized tees feature a dropped shoulder design, premium heavyweight cotton, and a relaxed silhouette that delivers effortless cool. Perfect for everyday wear.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['#000000', '#ecf0f1', '#e5d241', '#2ecc71', '#3498db'],
        features: [
            '240 GSM heavyweight cotton',
            'Dropped shoulder design',
            'Reinforced neck ribbing',
            'Pre-shrunk fabric',
            'Unisex fit',
            'Screen-printed graphics',
        ],
        careInstructions: [
            'Machine wash cold inside out',
            'Hang dry for best results',
            'Do not bleach',
            'Iron inside out on low heat',
        ],
    },
    {
        slug: 'instagram-trending',
        name: 'Trending on Instagram',
        category: "Young's Favourite",
        image: '/assets/Selena Gomez.webp',
        price: 79.99,
        originalPrice: null,
        badge: 'Viral',
        rating: 4.6,
        reviews: 189,
        description: 'Curated collection of the most-loved pieces trending on Instagram. These are the styles influencers and fashion-forward individuals are wearing right now. Stay ahead of the curve with our hand-picked viral fits.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['#000000', '#e5d241', '#e74c3c', '#9b59b6'],
        features: [
            'Instagram-approved styles',
            'Limited edition drops',
            'Celebrity-inspired designs',
            'Premium quality materials',
            'Exclusive to CITY STYLE',
            'New arrivals weekly',
        ],
        careInstructions: [
            'Follow individual garment care labels',
            'Machine wash cold recommended',
            'Lay flat to dry',
        ],
    },
    {
        slug: 'under-40',
        name: 'All Under $40',
        category: "Young's Favourite",
        image: '/assets/favourite-2.jpg',
        price: 29.99,
        originalPrice: 39.99,
        badge: 'Value Pick',
        rating: 4.3,
        reviews: 312,
        description: 'Style does not have to break the bank. Discover our collection of trend-right pieces all priced under $40. From basics to statement pieces, build your wardrobe without the guilt.',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['#000000', '#ecf0f1', '#2c3e50', '#e5d241'],
        features: [
            'All items under $40',
            'Quality materials guaranteed',
            'Mix and match essentials',
            'Seasonal updates',
            'Free returns within 30 days',
            'Bundle discounts available',
        ],
        careInstructions: [
            'Follow individual garment care labels',
            'Machine wash cold recommended',
        ],
    },
];

async function seedProducts() {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.error('No MONGODB_URI found in environment variables.');
            process.exit(1);
        }
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Clear existing
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new
        await Product.insertMany(catalogueProducts);
        console.log('Successfully seeded database with products');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
