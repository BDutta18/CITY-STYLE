import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    badge: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    description: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    features: [{ type: String }],
    careInstructions: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

export default mongoose.model('Product', productSchema);
