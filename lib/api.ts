import type { Activity } from '@/types'
import { resolveActivityImage } from '@/lib/media'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type RawActivity = {
  id: string
  title: string
  description: string
  duration: string
  difficulty?: string
  price?: string | number
  priceLabel?: string
  image?: unknown
  icon?: string | null
  category?: string
  slug?: string | null
}

function normalizeActivityDifficulty(value?: string): Activity['difficulty'] {
  const normalized = value?.toLowerCase()

  if (normalized === 'medium' || normalized === 'hard') {
    return normalized
  }

  return 'easy'
}

function normalizeActivityCategory(value?: string): Activity['category'] {
  const normalized = value?.toLowerCase()

  if (
    normalized === 'leisure' ||
    normalized === 'nature' ||
    normalized === 'gastronomy' ||
    normalized === 'sport'
  ) {
    return normalized
  }

  return 'leisure'
}

function normalizeActivityPrice(activity: RawActivity): Activity['price'] {
  if (typeof activity.price === 'string' && activity.price.trim().length > 0) {
    return activity.price
  }

  if (typeof activity.priceLabel === 'string' && activity.priceLabel.trim().length > 0) {
    return activity.priceLabel
  }

  if (typeof activity.price === 'number' && Number.isFinite(activity.price)) {
    return `${activity.price} EUR`
  }

  return 'Tarif sur demande'
}

function normalizeActivity(activity: RawActivity): Activity {
  return {
    id: activity.id,
    title: activity.title,
    description: activity.description,
    duration: activity.duration,
    difficulty: normalizeActivityDifficulty(activity.difficulty),
    category: normalizeActivityCategory(activity.category),
    price: normalizeActivityPrice(activity),
    image: resolveActivityImage(activity.image, activity),
    icon: activity.icon?.trim() || '🌊',
    slug: activity.slug?.trim() || undefined,
  }
}

export async function fetchActivities() {
  try {
    const response = await fetch(`${API_BASE_URL}/activities`, {
      next: { revalidate: 3600 }, // fetch fresh data: 1h
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.statusText}`)
    }

    const json = await response.json()
    const payload = json.data || json

    return Array.isArray(payload) ? payload.map(normalizeActivity) : []
  } catch (error) {
    console.error('Error fetching activities:', error)
    throw error
  }
}

export async function fetchActivityBySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/slug/${slug}`, {
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch activity: ${response.statusText}`)
    }

    const json = await response.json()
    return normalizeActivity((json.data || json) as RawActivity)
  } catch (error) {
    console.error(`Error fetching activity with slug ${slug}:`, error)
    throw error
  }
}

export async function fetchActivityById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch activity: ${response.statusText}`)
    }

    const json = await response.json()
    return normalizeActivity((json.data || json) as RawActivity)
  } catch (error) {
    console.error(`Error fetching activity with id ${id}:`, error)
    throw error
  }
}
