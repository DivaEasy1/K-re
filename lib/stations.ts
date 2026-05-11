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

export function resolveStationBookingUrl(station: Pick<Station, 'bookingUrl'>) {
  return station.bookingUrl ?? null
}

export function getStationHref(station: Pick<Station, 'name' | 'status'>) {
  if (station.status !== 'open') return null
  return `/stations/${slugifyStationName(station.name)}`
}

function toStationPageData(station: Station): StationPageData {
  const detail = stationDetailMap.get(station.id)
  const gallery = detail?.gallery?.length ? detail.gallery : station.gallery?.length ? station.gallery : [station.image]

  return {
    ...station,
    slug: station.slug?.trim() || slugifyStationName(station.name),
    gallery,
    bookingUrlResolved: resolveStationBookingUrl(station),
    highlight: detail?.highlight ?? `Depart ideal depuis ${station.location}`,
    intro: detail?.intro ?? station.description,
    ambience:
      detail?.ambience ??
      "Une station claire, simple d'acces et adaptee a une sortie nautique sans friction.",
    practicalInfo: detail?.practicalInfo ?? [
      "Reservation conseillee avant votre depart.",
      "Consultez les conditions sur place avant la mise a l'eau.",
    ],
    nearbyHighlights: detail?.nearbyHighlights ?? [station.location, 'Reservation express'],
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

export async function getStationPageBySlug(slug: string) {
  const openStationPages = await getOpenStationPages()
  return openStationPages.find((station) => station.slug === slug)
}
