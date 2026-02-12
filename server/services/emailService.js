import nodemailer from 'nodemailer'

let transporter = null

async function getTransporter() {
  if (transporter) return transporter

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  } else {
    const testAccount = await nodemailer.createTestAccount()
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    console.log('📧 Using Ethereal test inbox. Preview URLs will be logged.')
  }

  return transporter
}

export async function sendWelcomeEmail(toEmail) {
  try {
    const transport = await getTransporter()
    const isEthereal = !process.env.SMTP_HOST

    const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 3001}`
    const unsubscribeLink = `${baseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(toEmail)}`

    const info = await transport.sendMail({
      from: process.env.EMAIL_FROM || '"CITY STYLE" <noreply@citystyle.com>',
      to: toEmail,
      subject: 'Welcome to CITY STYLE! 🏙️',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #e5d241;">Welcome to CITY STYLE!</h1>
          <p>Thank you for joining our shopping community. You're now part of the young wild generation!</p>
          <p>Stay tuned for:</p>
          <ul>
            <li>🛍️ Monthly promo codes & exclusive deals</li>
            <li>👗 New arrivals & trending styles</li>
            <li>✨ Early access to sales</li>
          </ul>
          <p>We'll keep you updated with the latest urban fashion trends.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #737373; font-size: 12px;">
            CITY STYLE — Experience the art of fashion.<br>
            You received this because you subscribed at citystyle.com<br>
            <a href="${unsubscribeLink}" style="color:#737373;">Unsubscribe</a>
          </p>
        </div>
      `,
      text: `Welcome to CITY STYLE! Thank you for subscribing. Stay tuned for monthly promos, new arrivals, and exclusive deals. Experience the art of fashion.`,
    })

    if (isEthereal) {
      console.log('📧 Welcome email sent. Preview:', nodemailer.getTestMessageUrl(info))
    }

    return { success: true }
  } catch (err) {
    console.error('Welcome email error:', err.message)
    return { success: false }
  }
}
