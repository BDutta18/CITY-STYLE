import mongoose from 'mongoose'

const productRatingSchema = new mongoose.Schema(
  {
    productSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    sizePurchased: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    recommended: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    // Moderation fields for future admin panel workflows.
    isApproved: { type: Boolean, default: true, index: true },
    isHidden: { type: Boolean, default: false, index: true },
    user: {
      id: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      name: { type: String, trim: true },
    },
  },
  { timestamps: true }
)

productRatingSchema.index({ productSlug: 1, 'user.id': 1 }, { unique: true })
productRatingSchema.index({ productSlug: 1, createdAt: -1 })

export default mongoose.model('ProductRating', productRatingSchema)
