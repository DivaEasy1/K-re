const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

type ActivityImageContext = {
  title?: string | null
  slug?: string | null
  category?: string | null
  difficulty?: string | null
}

function getApiOrigin() {
  try {
    return new URL(API_BASE_URL).origin
  } catch {
    return null
  }
}

function normalizeText(value?: string | null) {
  return value?.trim().toLowerCase() ?? ''
}

export function resolveAssetUrl(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  try {
    return new URL(trimmed).toString()
  } catch {
    const apiOrigin = getApiOrigin()

    if (!apiOrigin) {
      return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    }

    const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    return new URL(normalizedPath, apiOrigin).toString()
  }
}

function getActivityFallbackImage({
  title,
  slug,
  category,
  difficulty,
}: ActivityImageContext) {
  const slugText = normalizeText(slug)
  const titleText = normalizeText(title)
  const categoryText = normalizeText(category)
  const difficultyText = normalizeText(difficulty)
  const searchable = `${slugText} ${titleText}`

  if (searchable.includes('24h')) {
    return '/images/activities/24h.jpg'
  }

  if (searchable.includes('breakfast') || searchable.includes('petit-dejeuner')) {
    return '/images/activities/breakfast.jpg'
  }

  if (searchable.includes('gastro')) {
    return '/images/activities/gastro.jpg'
  }

  if (searchable.includes('marais')) {
    return '/images/activities/marais.jpg'
  }

  if (searchable.includes('regate')) {
    return '/images/activities/regate.jpg'
  }

  if (searchable.includes('apero') || searchable.includes('sunset')) {
    return '/images/activities/sunset.jpg'
  }

  if (categoryText === 'sport') {
    return difficultyText === 'hard' ? '/images/activities/24h.jpg' : '/images/activities/regate.jpg'
  }

  if (categoryText === 'gastronomy') {
    return '/images/activities/gastro.jpg'
  }

  if (categoryText === 'nature' || categoryText === 'discovery') {
    return '/images/activities/marais.jpg'
  }

  return '/images/activities/sunset.jpg'
}

export function resolveActivityImage(
  image: unknown,
  context: ActivityImageContext = {}
) {
  return resolveAssetUrl(image) ?? getActivityFallbackImage(context)
}
