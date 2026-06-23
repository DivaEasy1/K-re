import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Ship, Users, Waves } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getStationHref, resolveStationBookingUrl } from '@/lib/stations'
import { BLUR_DATA_URL, cn } from '@/lib/utils'
import type { Station } from '@/types'

function equipmentLabel(equipment: string) {
  if (equipment === 'kayak_tandem') {
    return {
      icon: <Users className="h-4 w-4" aria-hidden />,
      label: 'Kayak tandem',
    }
  }
  if (equipment === 'kayak_solo') {
    return {
      icon: <Ship className="h-4 w-4" aria-hidden />,
      label: 'Kayak solo',
    }
  }
  return { icon: <Waves className="h-4 w-4" aria-hidden />, label: 'Paddle' }
}

export default function StationCard({ station }: { station: Station }) {
  const detailHref = getStationHref(station)
  const bookingUrl = resolveStationBookingUrl(station)
  
  // Use image, fallback to first gallery image, or empty string will be handled by next/image
  const imageUrl = station.image && station.image.trim() 
    ? station.image 
    : station.gallery?.[0] || null

  return (
    <div className="gsap-card h-full transform-gpu transition-transform duration-200 hover:-translate-y-1">
      <Card className="group relative h-full overflow-hidden border-white/80 bg-white/95 shadow-[0_18px_40px_-28px_rgba(10,22,40,0.6)] transition-shadow hover:shadow-[0_22px_50px_-24px_rgba(10,22,40,0.75)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(30,144,255,0.1)_46%,transparent_72%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative h-52 overflow-hidden bg-slate-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`Station ${station.name}`}
              fill
              unoptimized
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              loading="lazy"
              quality={70}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-slate-200 to-slate-300 text-slate-500">
              <span className="text-sm font-medium">Image à venir</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 via-brand-dark/25 to-transparent opacity-90" />
          <Badge
            variant={station.status === 'open' ? 'success' : 'muted'}
            className="absolute left-4 top-4 shadow-sm"
            aria-label={station.status === 'open' ? 'Station ouverte' : 'Station bientot disponible'}
          >
            {station.status === 'open' ? 'Ouvert' : 'Bientot'}
          </Badge>
          <div className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {station.openYear}
          </div>
        </div>

        <CardContent className="space-y-3 pt-5">
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold tracking-tight text-brand-dark">
              {detailHref ? (
                <Link
                  href={detailHref}
                  className="transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  {station.name}
                </Link>
              ) : (
                station.name
              )}
            </h3>
            <p className="text-sm text-slate-600">{station.location}</p>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
            {station.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {station.equipment.map((item) => {
              const equipment = equipmentLabel(item)
              return (
                <span
                  key={`${station.id}-${item}`}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border border-brand-blue/12 bg-brand-light px-2.5 py-1 text-xs font-medium text-brand-dark'
                  )}
                >
                  {equipment.icon}
                  {equipment.label}
                </span>
              )
            })}
          </div>

          {bookingUrl ? (
            <div className={cn('grid gap-2 pt-1', detailHref ? 'sm:grid-cols-2' : 'grid-cols-1')}>
              {detailHref ? (
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href={detailHref} aria-label={`Voir la fiche de ${station.name}`}>
                    Voir la fiche
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              ) : null}

              {(station.googleMapsUrl && station.googleMapsUrl.trim()) ? (
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a
                    href={station.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir la station ${station.name} sur Google Maps`}
                  >
                    Carte
                    <MapPin className="ml-1 h-4 w-4" aria-hidden />
                  </a>
                </Button>
              ) : Number.isFinite(station.lat) && Number.isFinite(station.lng) ? (
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a
                    href={`https://www.google.com/maps?ll=${station.lat},${station.lng}&z=16`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir la station ${station.name} sur Google Maps`}
                  >
                    Carte
                    <MapPin className="ml-1 h-4 w-4" aria-hidden />
                  </a>
                </Button>
              ) : null}

              <Button
                asChild
                size="lg"
                className="w-full bg-brand-dark text-white shadow-[0_18px_38px_-24px_rgba(10,22,40,0.95)] hover:bg-slate-900"
              >
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Reserver ${station.name} sur Kayakomat`}
                >
                  Reserver
                </a>
              </Button>
            </div>
          ) : (
            <div className={cn('grid gap-2 pt-1', detailHref ? 'sm:grid-cols-2' : 'grid-cols-1')}>
              {detailHref ? (
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href={detailHref} aria-label={`Voir la fiche de ${station.name}`}>
                    Voir la fiche
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              ) : null}

              {(station.googleMapsUrl && station.googleMapsUrl.trim()) ? (
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a
                    href={station.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir la station ${station.name} sur Google Maps`}
                  >
                    Carte
                    <MapPin className="ml-1 h-4 w-4" aria-hidden />
                  </a>
                </Button>
              ) : Number.isFinite(station.lat) && Number.isFinite(station.lng) ? (
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a
                    href={`https://www.google.com/maps?ll=${station.lat},${station.lng}&z=16`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir la station ${station.name} sur Google Maps`}
                  >
                    Carte
                    <MapPin className="ml-1 h-4 w-4" aria-hidden />
                  </a>
                </Button>
              ) : null}

              <Button
                size="lg"
                disabled
                className="w-full bg-slate-200 text-slate-500 opacity-100 shadow-none hover:translate-y-0"
              >
                Reservation bientot
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
