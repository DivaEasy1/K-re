'use client'

import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import Link from 'next/link'
import { MapContainer, Marker, Popup, TileLayer, Tooltip, ZoomControl } from 'react-leaflet'

import { Badge } from '@/components/ui/badge'
import { getStationHref } from '@/lib/stations'
import type { Station } from '@/types'

const openIcon = L.divIcon({
  className: '',
  html: `<span style="display:block;width:18px;height:18px;background:#1E90FF;border:3px solid #ffffff;border-radius:9999px;box-shadow:0 0 0 2px rgba(30,144,255,0.35)"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const comingSoonIcon = L.divIcon({
  className: '',
  html: `<span style="display:block;width:18px;height:18px;background:#94A3B8;border:3px solid #ffffff;border-radius:9999px;box-shadow:0 0 0 2px rgba(148,163,184,0.35)"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

interface MapViewProps {
  stations: Station[]
  height?: number
  center?: [number, number]
  zoom?: number
  showLearnMore?: boolean
  selectedStationId?: string | null
  onStationSelect?: (station: Station) => void
}

const getStationIcon = (color: string, selected = false) =>
  L.divIcon({
    className: '',
    html: `<span style="display:block;width:${selected ? 24 : 18}px;height:${selected ? 24 : 18}px;background:${color};border:3px solid #ffffff;border-radius:9999px;box-shadow:0 0 0 ${selected ? 4 : 2}px rgba(30,144,255,0.35)"></span>`,
    iconSize: [selected ? 24 : 18, selected ? 24 : 18],
    iconAnchor: [selected ? 12 : 9, selected ? 12 : 9],
  })

export default function MapView({
  stations,
  height = 500,
  center = [46.19, -1.4],
  zoom = 11,
  showLearnMore = true,
  selectedStationId = null,
  onStationSelect,
}: MapViewProps) {
  // Mobile zoom adjustment
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const mobileZoom = isMobile ? zoom - 1 : zoom

  return (
    <div
      className="overflow-hidden rounded-[1.6rem] border border-slate-200 shadow-ocean"
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={mobileZoom}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((station) => {
          const detailHref = getStationHref(station)
          const isSelected = station.id === selectedStationId

          return (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              icon={
                isSelected
                  ? getStationIcon('#1E90FF', true)
                  : station.status === 'open'
                  ? openIcon
                  : comingSoonIcon
              }
              eventHandlers={{
                click: () => {
                  onStationSelect?.(station)
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                {station.name}
              </Tooltip>
              <Popup minWidth={220}>
                <div className="space-y-2">
                  <p className="font-semibold text-brand-dark">{station.name}</p>
                  <p className="text-xs text-slate-600">{station.location}</p>
                  <p className="text-xs text-slate-700">Ouverture: {station.openYear}</p>
                  <Badge
                    variant={station.status === 'open' ? 'success' : 'muted'}
                    className="w-fit"
                  >
                    {station.status === 'open' ? 'Ouvert' : 'Bientot'}
                  </Badge>

                  <div className="space-y-2 pt-2">
                    {station.status === 'open' && station.bookingUrl ? (
                      <a
                        href={station.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg bg-brand-gold px-3 py-2 text-center text-xs font-semibold text-brand-dark transition-colors hover:bg-amber-300"
                      >
                        Reserver
                      </a>
                    ) : station.status === 'open' ? (
                      <button
                        disabled
                        className="w-full rounded-lg bg-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-500"
                      >
                        Reservation bientot
                      </button>
                    ) : null}
                    {showLearnMore ? (
                      <Link
                        href={detailHref ?? `/stations#station-${station.id}`}
                        className="block rounded-lg border border-brand-blue bg-white px-3 py-2 text-center text-xs font-semibold text-brand-blue transition-colors hover:bg-blue-50"
                      >
                        {detailHref ? 'Voir la fiche' : 'En savoir plus'}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
