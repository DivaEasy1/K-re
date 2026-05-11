import type { Activity, Station, StationStatus } from '@/types'
import { resolveActivityImage, resolveAssetUrl } from '@/lib/media'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

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

type RawStation = {
  id: string
  name: string
  slug?: string
  location: string
  lat: number
  lng: number
  description: string
  richContent?: string
  image?: string
  bookingUrl?: string
  equipment?: string[]
  status: 'OPEN' | 'COMING_SOON' | 'CLOSED' | 'MAINTENANCE'
  openYear?: number
  gallery?: Array<{
    id: string
    url: string
    alt: string
    position: number
  }>
}

function normalizeStationStatus(value: RawStation['status']): StationStatus {
  switch (value) {
    case 'COMING_SOON':
      return 'coming_soon'
    case 'CLOSED':
      return 'closed'
    case 'MAINTENANCE':
      return 'maintenance'
    case 'OPEN':
    default:
      return 'open'
  }
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

function normalizeStation(station: RawStation): Station {
  return {
    id: station.id,
    name: station.name,
    slug: station.slug?.trim() || undefined,
    location: station.location,
    lat: station.lat,
    lng: station.lng,
    description: station.description,
    richContent: station.richContent,
    image: resolveAssetUrl(station.image) ?? '',
    bookingUrl: station.bookingUrl,
    equipment: station.equipment || [],
    status: normalizeStationStatus(station.status),
    openYear: station.openYear,
    gallery: station.gallery
      ?.slice()
      .sort((a, b) => a.position - b.position)
      .map((image) => resolveAssetUrl(image.url) ?? image.url) || [],
  }
}

export async function fetchActivities() {
  try {
    const response = await fetch(`${API_BASE_URL}/activities`, {
      next: { revalidate: 0 }, // fetch fresh data: 1h
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

// STATIONS

export async function fetchStations() {
  try {
    const response = await fetch(`${API_BASE_URL}/stations`, {
      next: { revalidate: 0 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch stations: ${response.statusText}`)
    }

    const json = await response.json()
    const payload = json.data || json

    return Array.isArray(payload) ? payload.map(normalizeStation) : []
  } catch (error) {
    console.error('Error fetching stations:', error)
    throw error
  }
}

export async function fetchStationBySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/stations/${slug}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch station: ${response.statusText}`)
    }

    const json = await response.json()
    return normalizeStation((json.data || json) as RawStation)
  } catch (error) {
    console.error(`Error fetching station with slug ${slug}:`, error)
    throw error
  }
}
