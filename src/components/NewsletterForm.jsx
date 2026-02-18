import React, { useState } from 'react'
import { subscribeNewsletter } from '../services/newsletterService'

/* Email validation regex - RFC 5322 compliant simplified */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const isValidEmail = (value) => EMAIL_REGEX.test(value.trim())

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setStatus('idle')
    setMessage('')

    if (!value.trim()) {
      setEmailError('')
    } else if (!isValidEmail(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setEmailError('Email is required')
      return
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setEmailError('')
    setMessage('')

    const result = await subscribeNewsletter(trimmedEmail, honeypot)

    if (result.success) {
      setStatus('success')
      setMessage(result.message || 'Thank you for subscribing!')
      setEmail('')
    } else {
      setStatus('error')
      setMessage(result.error || 'Something went wrong. Please try again.')
    }
  }

  const isSubmitting = status === 'loading'
  const isSuccess = status === 'success'
  const isDisabled = isSubmitting || isSuccess

  return (
    <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
      {/* Honeypot - hidden from users, catches bots */}
      <div className="newsletter-form__honeypot" aria-hidden="true">
        <label htmlFor="website-url">Leave this empty</label>
        <input
          type="text"
          id="website-url"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="newsletter-form__row">
          <input
            type="email"
            placeholder="Add your email here"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => {
              if (email.trim() && !isValidEmail(email)) {
                setEmailError('Please enter a valid email address')
              }
            }}
            disabled={isDisabled}
            className={emailError ? 'newsletter-form__input--error' : ''}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          <button
            type="submit"
            className="btn newsletter-form__btn"
            disabled={isDisabled}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="newsletter-form__spinner" aria-hidden="true">
                <i className="ri-loader-4-line"></i>
              </span>
            ) : (
              'SEND'
            )}
          </button>
      </div>

      {emailError && (
        <p id="email-error" className="newsletter-form__error" role="alert">
          {emailError}
        </p>
      )}

      {status === 'success' && message && (
        <p className="newsletter-form__success" role="status">
          <i className="ri-checkbox-circle-fill"></i> {message}
        </p>
      )}

      {status === 'error' && message && (
        <p className="newsletter-form__error-message" role="alert">
          <i className="ri-error-warning-fill"></i> {message}
        </p>
      )}
    </form>
  )
}

export default NewsletterForm
