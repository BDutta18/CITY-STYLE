import express from 'express'
import { authenticateUser } from '../middleware/auth.js'
import Review from '../models/Rate.js'
import User from '../models/User.js'

const router = express.Router()
const reviewIndexesReady = Review.init()

const publicReviewFilter = (productSlug) => ({
  productSlug: String(productSlug).trim().toLowerCase(),
  isApproved: true,
  isHidden: false,
})

const getRatingSummary = async (productSlug) => {
  const filter = publicReviewFilter(productSlug)
  const [summary] = await Review.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ])

  return {
    productSlug,
    averageRating: summary ? Number(summary.averageRating.toFixed(1)) : 0,
    totalReviews: summary ? summary.totalReviews : 0,
  }
}

router.get('/:productSlug', async (req, res) => {
  try {
    const { productSlug } = req.params
    const filter = publicReviewFilter(productSlug)

    const [reviews, ratingSummary] = await Promise.all([
      Review.find(filter)
        .sort({ createdAt: -1 })
        .select('-isApproved -isHidden -__v'),
      getRatingSummary(productSlug),
    ])

    res.status(200).json({
      ...ratingSummary,
      reviews,
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

router.get('/:productSlug/summary', async (req, res) => {
  try {
    const { productSlug } = req.params
    const ratingSummary = await getRatingSummary(productSlug)
    res.status(200).json(ratingSummary)
  } catch (error) {
    console.error('Error fetching review summary:', error)
    res.status(500).json({ error: 'Failed to fetch review summary' })
  }
})

router.post('/submit', authenticateUser, async (req, res) => {
  try {
    await reviewIndexesReady
    const { productSlug, rating, title, comment, sizePurchased, imageUrl, recommended } = req.body
    const normalizedProductSlug = String(productSlug || '').trim().toLowerCase()
    const normalizedUserId = String(req.user.firebaseUid || '').trim()
    const parsedRating = Number(rating)

    if (!normalizedProductSlug || !normalizedUserId || Number.isNaN(parsedRating) || !title || !comment) {
      return res
        .status(400)
        .json({ error: 'productSlug, rating, title, and comment are required' })
    }
    if (parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ error: 'rating must be between 1 and 5' })
    }

    let user = await User.findOne({ firebaseUid: req.user.firebaseUid })
    if (!user) {
      user = await User.create({
        firebaseUid: req.user.firebaseUid,
        email: req.user.email,
        displayName: req.body.userName || req.user.email?.split('@')[0] || 'Anonymous',
      })
    }

    const existingReview = await Review.findOne({
      productSlug: normalizedProductSlug,
      'user.id': normalizedUserId,
    })
    if (existingReview) {
      return res.status(409).json({
        error: 'Duplicate review not allowed. You have already reviewed this product.',
      })
    }

    const review = new Review({
      user: {
        id: normalizedUserId,
        email: req.user.email,
        name: user.displayName || 'Anonymous',
      },
      productSlug: normalizedProductSlug,
      rating: parsedRating,
      title,
      comment,
      sizePurchased,
      imageUrl,
      recommended,
      verified: false,
    })

    await review.save()
    const ratingSummary = await getRatingSummary(normalizedProductSlug)

    res.status(201).json({
      message: 'Review submitted successfully',
      review,
      ratingSummary,
    })
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate review not allowed. You have already reviewed this product.',
      })
    }

    console.error('Error submitting review:', error)
    res.status(500).json({ error: 'Failed to submit review' })
  }
})

export default router
