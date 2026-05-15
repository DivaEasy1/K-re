import stationDetailsData from '@/data/station-details.json'
import stationsData from '@/data/stations.json'
import { fetchStations } from '@/lib/api'
import type { Station, StationDetailContent } from '@/types'

const stations = stationsData as Station[]
const stationDetails = stationDetailsData as StationDetailContent[]

const stationDetailMap = new Map(
  stationDetails.map((detail) => [detail.stationId, detail] as const)
)

export interface StationPageData extends Station {
  slug: string
  gallery: string[]
  bookingUrlResolved: string | null
  highlight: string
  intro: string
  ambience: string
  practicalInfo: string[]
  nearbyHighlights: string[]
}

function compactSlug(value: string) {
  return value.replace(/-/g, '')
}

function normalizeSlugValue(value: string) {
  return value.trim().toLowerCase()
}

function mergeStations(jsonStations: Station[], apiStations: Station[]) {
  const apiMap = new Map(apiStations.map((station) => [station.id, station] as const))
  const merged: Station[] = []
  const processedIds = new Set<string>()

  for (const jsonStation of jsonStations) {
    const apiStation = apiMap.get(jsonStation.id)

    merged.push(apiStation ?? jsonStation)
    processedIds.add(jsonStation.id)
  }

  for (const apiStation of apiStations) {
    if (!processedIds.has(apiStation.id)) {
      merged.push(apiStation)
    }
  }

  return merged
}

export function slugifyStationName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function resolveStationSlug(station: Pick<Station, 'name' | 'slug'>) {
  const prettySlug = slugifyStationName(station.name)
  return prettySlug || station.slug?.trim() || ''
}

function getStationSlugCandidates(station: Pick<Station, 'name' | 'slug'>) {
  const resolvedSlug = normalizeSlugValue(resolveStationSlug(station))
  const storedSlug = normalizeSlugValue(station.slug?.trim() || '')
  const candidates = new Set([
    resolvedSlug,
    storedSlug,
    compactSlug(resolvedSlug),
    compactSlug(storedSlug),
  ])

  return Array.from(candidates).filter(Boolean)
}

export function resolveStationBookingUrl(station: Pick<Station, 'bookingUrl'>) {
  return station.bookingUrl ?? null
}

export function getStationHref(station: Pick<Station, 'name' | 'slug' | 'status'>) {
  return `/stations/${resolveStationSlug(station)}`
}

function toStationPageData(station: Station): StationPageData {
  const detail = stationDetailMap.get(station.id)
  const gallery = detail?.gallery?.length ? detail.gallery : station.gallery?.length ? station.gallery : [station.image]

  return {
    ...station,
    slug: resolveStationSlug(station),
    gallery,
    bookingUrlResolved: resolveStationBookingUrl(station),
    highlight: station.highlight?.trim() || detail?.highlight || `Depart ideal depuis ${station.location}`,
    intro: detail?.intro ?? station.description,
    ambience:
      station.ambience?.trim() ||
      detail?.ambience ||
      "Une station claire, simple d'acces et adaptee a une sortie nautique sans friction.",
    practicalInfo:
      station.practicalInfo && station.practicalInfo.length > 0
        ? station.practicalInfo
        : detail?.practicalInfo ?? [
            'Reservation conseillee avant votre depart.',
            "Consultez les conditions sur place avant la mise a l'eau.",
          ],
    nearbyHighlights:
      station.nearbyHighlights && station.nearbyHighlights.length > 0
        ? station.nearbyHighlights
        : detail?.nearbyHighlights ?? [station.location, 'Reservation express'],
  }
}

export async function getMergedStations() {
  try {
    const apiStations = await fetchStations()
    return mergeStations(stations, apiStations)
  } catch (error) {
    console.error('Failed to merge stations with API data:', error)
    return stations
  }
}

export async function getOpenStationPages() {
  const mergedStations = await getMergedStations()

  return mergedStations
    .filter((station) => station.status === 'open')
    .map(toStationPageData)
}

export async function getAllStationPages() {
  const mergedStations = await getMergedStations()

  return mergedStations.map(toStationPageData)
}

export async function getStationPageBySlug(slug: string) {
  const allStationPages = await getAllStationPages()
  const normalizedSlug = normalizeSlugValue(slug)

  return allStationPages.find((station) =>
    getStationSlugCandidates(station).includes(normalizedSlug)
  )
}

export async function getOpenStationBySlug(slug: string) {
  const openStationPages = await getOpenStationPages()
  const normalizedSlug = normalizeSlugValue(slug)

  return openStationPages.find((station) =>
    getStationSlugCandidates(station).includes(normalizedSlug)
  )
}
