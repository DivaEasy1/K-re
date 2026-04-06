'use client'

import 'leaflet/dist/leaflet.css'

import Link from 'next/link'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, Tooltip, ZoomControl } from 'react-leaflet'

import type { Station } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '../ui/button'

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
}

export default function MapView({
  stations,
  height = 500,
  center = [46.19, -1.4],
  zoom = 11,
  showLearnMore = true,
}: MapViewProps) {
  return (
    <div
      className="overflow-hidden rounded-[1.6rem] border border-slate-200 shadow-ocean"
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={station.status === 'open' ? openIcon : comingSoonIcon}
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
                  {station.status === 'open' ? 'Ouvert' : 'Bientôt'}
                </Badge>

                {station.bookingUrl ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="ml-2 h-7 w-fit border-black bg-white/10 text-black hover:bg-white/20"
                  >
                    <a
                      href={station.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Réserver ${station.name} sur Kayakomat`}
                    >
                      Réserver maintenant
                    </a>
                  </Button>
                ) : null}

                {showLearnMore ? (
                  <div>
                    <Link
                      href={`/stations#station-${station.id}`}
                      className="inline-flex rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    >
                      En savoir plus
                    </Link>
                  </div>
                ) : null}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
