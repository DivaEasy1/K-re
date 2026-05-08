import type { Station } from '@/types'
import stationsJson from '@/data/stations.json'
import stationDetailsJson from '@/data/station-details.json'

/**
 * Fetch stations from the backend API
 */
async function fetchApiStations(): Promise<Station[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const response = await fetch(`${baseUrl}/api/stations`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    if (!response.ok) return []
    const data = await response.json()
    return Array.isArray(data.data) ? data.data : []
  } catch (error) {
    console.error('Failed to fetch API stations:', error)
    return []
  }
}

/**
 * Load stations from JSON (static data)
 */
function loadJsonStations(): Station[] {
  return stationsJson as Station[]
}

/**
 * Merge stations from JSON and API
 * API stations take precedence if they have the same ID
 * Returns only OPEN stations
 */
export async function loadAndMergeStations(): Promise<Station[]> {
  try {
    const jsonStations = loadJsonStations().filter(s => s.status === 'open')
    const apiStations = await fetchApiStations()

    // Create a map of API stations by ID for quick lookup
    const apiMap = new Map(apiStations.map(s => [s.id, s]))

    // Merge: start with JSON stations, override with API if exists
    const merged: Station[] = []
    const processedIds = new Set<string>()

    // Add JSON stations (or API versions if they exist)
    for (const jsonStation of jsonStations) {
      const apiStation = apiMap.get(jsonStation.id)
      if (apiStation) {
        merged.push(apiStation)
        processedIds.add(apiStation.id)
      } else {
        merged.push(jsonStation)
        processedIds.add(jsonStation.id)
      }
    }

    // Add any new API stations not in JSON
    for (const apiStation of apiStations) {
      if (!processedIds.has(apiStation.id)) {
        merged.push(apiStation)
      }
    }

    return merged
  } catch (error) {
    console.error('Error merging stations:', error)
    // Fallback to JSON only
    return loadJsonStations().filter(s => s.status === 'open')
  }
}

/**
 * Get a single station by slug (merged data)
 */
export async function getStationBySlugMerged(slug: string): Promise<Station | null> {
  const stations = await loadAndMergeStations()
  return stations.find(s => s.slug === slug) || null
}
