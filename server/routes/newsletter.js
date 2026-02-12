import { Router } from 'express'
import { addSubscriber, getAllSubscribers, unsubscribeEmail } from '../storage/subscribers.js'
import { sendWelcomeEmail } from '../services/emailService.js'

const router = Router()

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim())
}

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' })
    }

    const result = await addSubscriber(email)

    if (result.duplicate) {
      return res.status(409).json({
        error: 'This email is already subscribed to our newsletter.',
      })
    }

    sendWelcomeEmail(email.trim().toLowerCase()).catch(() => {})

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Check your inbox for our welcome email.',
    })
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    res.status(500).json({ error: 'Something went wrong. Please try again later.' })
  }
})

router.get('/unsubscribe', async (req, res) => {
  try {
    const email = req.query.email
    if (!email) {
      res.setHeader('Content-Type', 'text/html')
      return res.status(400).send(`
        <html><body style="font-family:sans-serif;padding:2rem;text-align:center">
          <h1>Invalid Link</h1>
          <p>Missing email parameter.</p>
        </body></html>
      `)
    }
    const result = await unsubscribeEmail(email)
    if (result.notFound) {
      res.setHeader('Content-Type', 'text/html')
      return res.status(404).send(`
        <html><body style="font-family:sans-serif;padding:2rem;text-align:center">
          <h1>Not Found</h1>
          <p>This email was not in our newsletter list.</p>
        </body></html>
      `)
    }
    res.setHeader('Content-Type', 'text/html')
    res.send(`
      <html><body style="font-family:sans-serif;padding:2rem;text-align:center">
        <h1>Unsubscribed</h1>
        <p>You have been successfully unsubscribed from our newsletter.</p>
        <p>We're sorry to see you go. You can resubscribe anytime!</p>
      </body></html>
    `)
  } catch (err) {
    console.error('Unsubscribe error:', err)
    res.status(500).send('<html><body><h1>Something went wrong.</h1></body></html>')
  }
})

// Admin: Export email list (add auth in production)
router.get('/export', async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key']
    if (process.env.ADMIN_KEY && adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const activeOnly = req.query.active !== 'false'
    let subscribers = await getAllSubscribers()
    if (activeOnly) {
      subscribers = subscribers.filter((s) => !s.unsubscribed)
    }
    res.json({ subscribers, count: subscribers.length })
  } catch (err) {
    console.error('Export error:', err)
    res.status(500).json({ error: 'Failed to export' })
  }
})

export default router
