import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_FILE = join(__dirname, 'subscribers.json')

async function readSubscribers() {
  if (!existsSync(DATA_FILE)) {
    return []
  }
  const data = await readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

async function writeSubscribers(subscribers) {
  await writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2))
}

export async function addSubscriber(email) {
  const subscribers = await readSubscribers()
  const normalized = email.trim().toLowerCase()

  const existing = subscribers.find((s) => s.email === normalized)
  if (existing) {
    if (!existing.unsubscribed) return { success: false, duplicate: true }
    existing.unsubscribed = false
    existing.subscribedAt = new Date().toISOString()
  } else {
    subscribers.push({
      email: normalized,
      subscribedAt: new Date().toISOString(),
      unsubscribed: false,
    })
  }
  await writeSubscribers(subscribers)
  return { success: true }
}

export async function getAllSubscribers() {
  return readSubscribers()
}

export async function unsubscribeEmail(email) {
  const subscribers = await readSubscribers()
  const normalized = email.trim().toLowerCase()
  const sub = subscribers.find((s) => s.email === normalized)
  if (!sub) return { success: false, notFound: true }
  if (sub.unsubscribed) return { success: true, already: true }
  sub.unsubscribed = true
  sub.unsubscribedAt = new Date().toISOString()
  await writeSubscribers(subscribers)
  return { success: true }
}
