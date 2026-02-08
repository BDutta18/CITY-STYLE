const API_BASE = import.meta.env.VITE_API_URL || '/api'

/**
 * Subscribe email to newsletter
 * @param {string} email - User email
 * @param {string} honeypot - Honeypot field (should be empty for real users)
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export async function subscribeNewsletter(email, honeypot = '') {
  // Spam check: if honeypot is filled, silently reject
  if (honeypot && honeypot.trim() !== '') {
    return { success: true, message: 'Thank you for subscribing!' }
  }

  const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    return {
      success: false,
      error: data.error || data.message || 'Something went wrong. Please try again.',
    }
  }

  return {
    success: true,
    message: data.message || 'Thank you for subscribing!',
  }
}
