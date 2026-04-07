import stationDetailsData from '@/data/station-details.json'
import stationsData from '@/data/stations.json'
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

const openStationPages: StationPageData[] = stations
  .filter((station) => station.status === 'open')
  .map((station) => {
    const detail = stationDetailMap.get(station.id)

    return {
      ...station,
      slug: slugifyStationName(station.name),
      gallery: detail?.gallery?.length ? detail.gallery : [station.image],
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
  })

export function getOpenStationPages() {
  return openStationPages
}

export function getStationPageBySlug(slug: string) {
  return openStationPages.find((station) => station.slug === slug)
}
