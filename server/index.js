import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/database.js'
import newsletterRoutes from './routes/newsletter.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/orders.js'
import userRoutes from './routes/users.js'
import reviewRoutes from './routes/review.js'

const app = express()
const PORT = process.env.PORT || 3001

connectDB()

app.use(cors({ origin: true }))
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please try again later.' },
})
app.use('/api/newsletter', limiter)

app.use('/api/newsletter', newsletterRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
