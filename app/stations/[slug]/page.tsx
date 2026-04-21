import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarClock,
  Compass,
  MapPin,
  Ship,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react'

import PageTransition from '@/components/layout/PageTransition'
import StationGallery from '@/components/stations/StationGallery'
import StationCard from '@/components/stations/StationCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Breadcrumb from '@/components/ui/breadcrumb'
import { getOpenStationPages, getStationPageBySlug } from '@/lib/stations'
import { BLUR_DATA_URL } from '@/lib/utils'

export const dynamicParams = false

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

function getMapsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}

export async function generateStaticParams() {
  return getOpenStationPages().map((station) => ({
    slug: station.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const station = getStationPageBySlug(slug)

  if (!station) {
    return {
      title: 'Station introuvable',
    }
  }

  return {
    title: station.name,
    description: `${station.name} sur l'ile de Re: infos pratiques, galerie photo et reservation rapide.`,
    alternates: {
      canonical: `/stations/${station.slug}`,
    },
    openGraph: {
      title: `${station.name} | Kayak en Re`,
      description: `${station.highlight}. Consultez la fiche station et reservez en ligne.`,
      url: `https://www.kayak-en-re.fr/stations/${station.slug}`,
      images: [
        {
          url: station.gallery[0],
          alt: station.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${station.name} | Kayak en Re`,
      description: `${station.highlight}. Consultez la fiche station et reservez en ligne.`,
      images: [station.gallery[0]],
    },
  }
}

export default async function StationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const station = getStationPageBySlug(slug)

  if (!station) {
    notFound()
  }

  const relatedStations = getOpenStationPages()
    .filter((candidate) => candidate.id !== station.id)
    .slice(0, 2)
  const hasBooking = Boolean(station.bookingUrlResolved)

  return (
    <PageTransition>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={station.gallery[0]}
            alt={`Vue principale de ${station.name}`}
            fill
            priority
            sizes="100vw"
            quality={84}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-brand-dark/94 via-brand-dark/84 to-brand-dark/62" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(27,160,226,0.34),transparent_32%),radial-gradient(circle_at_84%_14%,rgba(248,180,0,0.24),transparent_34%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-22 pt-10 text-white sm:px-6 sm:pb-26 lg:px-8 lg:pb-28 lg:pt-14">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Stations', href: '/stations' },
                { label: station.name, href: `/stations/${station.slug}` },
              ]}
            />
          </div>

          <Link
            href="/stations"
            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white/92 backdrop-blur transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour aux stations
          </Link>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_360px] xl:items-end">
            <div className="max-w-3xl">
              <Badge variant="success" className="mb-4 bg-emerald-500/95 text-white">
                Station ouverte
              </Badge>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                {station.highlight}
              </p>
              <h1 className="section-heading font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {station.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
                {station.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-white/92">
                <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1.5">
                  {station.location}
                </span>
                <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1.5">
                  Ouverte depuis {station.openYear}
                </span>
                <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1.5">
                  {station.gallery.length} vue{station.gallery.length > 1 ? 's' : ''} disponibles
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:w-auto sm:flex-row">
                {hasBooking ? (
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-gold text-brand-dark shadow-[0_18px_40px_-22px_rgba(248,180,0,0.95)] hover:bg-amber-300"
                  >
                    <a
                      href={station.bookingUrlResolved!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Reserver ${station.name} sur Kayakomat`}
                    >
                      Reserver cette station
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="bg-white/16 text-white opacity-100 shadow-none hover:translate-y-0"
                  >
                    Reservation bientot disponible
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/16"
                >
                  <a
                    href={getMapsUrl(station.lat, station.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ouvrir ${station.name} dans Google Maps`}
                  >
                    Ouvrir dans Maps
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-4xl border border-white/16 bg-white/10 p-5 shadow-[0_28px_60px_-32px_rgba(10,22,40,0.78)] backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {hasBooking ? 'Reservation rapide' : 'Reservation a venir'}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                {hasBooking
                  ? 'Tout est pret pour partir sans friction'
                  : 'La fiche est prete, la reservation arrive bientot'}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {hasBooking
                  ? "Une fiche claire, un acces direct a la reservation et les informations essentielles au meme endroit."
                  : "Vous pouvez deja consulter les visuels, l'emplacement et les informations utiles. Le lien de reservation sera ajoute des qu'il sera disponible."}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/12 bg-white/8 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/68">
                    Materiel
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">{station.equipment.length}</p>
                  <p className="text-xs text-white/72">formats proposes</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/8 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/68">
                    Galerie
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">{station.gallery.length}</p>
                  <p className="text-xs text-white/72">vues utiles</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-3xl border border-white/12 bg-brand-dark/22 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-brand-gold" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-white">Point de depart</p>
                    <p className="mt-1 text-sm text-slate-200">{station.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarClock className="mt-0.5 h-4 w-4 text-brand-gold" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-white">Mise en service</p>
                    <p className="mt-1 text-sm text-slate-200">Station ouverte depuis {station.openYear}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 text-brand-gold" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-white">Style du spot</p>
                    <p className="mt-1 text-sm text-slate-200">{station.ambience}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {hasBooking ? (
                  <Button asChild size="lg" className="w-full bg-brand-blue hover:bg-sky-600">
                    <a
                      href={station.bookingUrlResolved!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Reserver ${station.name} sur Kayakomat`}
                    >
                      Reserver maintenant
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="w-full bg-white/14 text-white opacity-100 shadow-none hover:translate-y-0"
                  >
                    Reservation bientot disponible
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-white/20 bg-white/6 text-white hover:bg-white/14"
                >
                  <a
                    href={getMapsUrl(station.lat, station.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir ${station.name} sur Google Maps`}
                  >
                    Voir l&apos;acces
                    <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-14 pb-10 sm:-mt-16 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div className="space-y-6">
              <Card className="overflow-hidden border-white/75 bg-white/94 shadow-[0_28px_70px_-42px_rgba(10,22,40,0.78)] backdrop-blur">
                <CardContent className="p-6 sm:p-8">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <div>
                      <p className="mb-2 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
                        L&apos;esprit du spot
                      </p>
                      <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
                        Une fiche plus claire pour choisir votre depart
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {station.intro}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-3xl border border-brand-blue/14 bg-brand-blue/8 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                          Ambiance
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                          {station.ambience}
                        </p>
                      </div>
                      <div className="rounded-3xl border border-amber-200 bg-amber-50/90 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                          Ce que vous allez aimer
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {station.nearbyHighlights.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-white/70 bg-white/92">
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                      Localisation
                    </p>
                    <p className="mt-3 text-lg font-bold tracking-tight text-brand-dark">
                      {station.location}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Un point de depart simple a reperer pour une mise a l&apos;eau rapide.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-white/70 bg-white/92">
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                      Ouverture
                    </p>
                    <p className="mt-3 text-lg font-bold tracking-tight text-brand-dark">
                      Depuis {station.openYear}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Station active, prete pour une reservation fluide via Kayakomat.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-white/70 bg-white/92">
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                      Materiel
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {station.equipment.map((item) => {
                        const equipment = equipmentLabel(item)

                        return (
                          <span
                            key={`${station.id}-${item}`}
                            className="inline-flex items-center gap-2 rounded-full border border-brand-blue/12 bg-brand-light px-3 py-1 text-xs font-medium text-brand-dark"
                          >
                            {equipment.icon}
                            {equipment.label}
                          </span>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-white/75 bg-white/96 shadow-[0_24px_55px_-38px_rgba(10,22,40,0.75)] xl:sticky xl:top-28">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  Informations pratiques
                </p>

                <div className="mt-4 space-y-3">
                  {station.practicalInfo.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm leading-relaxed text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl border border-brand-blue/12 bg-brand-blue/[0.07] p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
                    <Compass className="h-4 w-4 text-brand-blue" aria-hidden />
                    Conseil K-Re
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Pour une experience encore plus agreable, reservez avant votre depart et
                    consultez la meteo ainsi que les marees avant la mise a l&apos;eau.
                  </p>
                </div>

                <div className="mt-6 grid gap-2">
                  {hasBooking ? (
                    <Button asChild size="lg" className="w-full bg-brand-blue hover:bg-sky-600">
                      <a
                        href={station.bookingUrlResolved!}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Reserver ${station.name} sur Kayakomat`}
                      >
                        Reserver maintenant
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      disabled
                      className="w-full bg-slate-200 text-slate-500 opacity-100 shadow-none hover:translate-y-0"
                    >
                      Reservation bientot disponible
                    </Button>
                  )}
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <a
                      href={getMapsUrl(station.lat, station.lng)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Voir ${station.name} sur Google Maps`}
                    >
                      Voir sur Google Maps
                      <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
            <div>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
                    Galerie station
                  </p>
                  <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
                    Une lecture photo plus nette et plus premium
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-right">
                  Parcourez les vues, changez d&apos;angle en un clic, puis ouvrez la galerie en
                  plein ecran pour inspecter le spot plus confortablement.
                </p>
              </div>

              <StationGallery gallery={station.gallery} stationName={station.name} />
            </div>

            <div className="space-y-4 xl:sticky xl:top-28">
              <Card className="border-white/75 bg-white/94">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                    Lecture rapide
                  </p>
                  <p className="mt-3 text-lg font-bold tracking-tight text-brand-dark">
                    Choisissez la vue la plus utile avant de reserver
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    La grande image met en avant le spot, les miniatures permettent de comparer
                    rapidement plusieurs points de vue, et le plein ecran facilite une lecture plus
                    immersive.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-white/75 bg-linear-to-br from-brand-dark to-slate-900 text-white">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/64">
                    {hasBooking ? 'Reservation express' : 'Acces reservation'}
                  </p>
                  <p className="mt-3 text-xl font-bold tracking-tight">
                    {hasBooking
                      ? 'Pret a choisir votre depart ?'
                      : 'Le spot est visible, le lien arrive bientot'}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    {hasBooking
                      ? 'Une fois la station validee, finalisez la reservation en quelques clics puis partez pagayer en toute autonomie.'
                      : "Cette station n'a pas encore de lien de reservation actif. La fiche reste disponible pour preparer votre future sortie."}
                  </p>
                  {hasBooking ? (
                    <Button
                      asChild
                      size="lg"
                      className="mt-5 w-full bg-brand-gold text-brand-dark hover:bg-amber-300"
                    >
                      <a
                        href={station.bookingUrlResolved!}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Reserver ${station.name} sur Kayakomat`}
                      >
                        Reserver cette station
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      disabled
                      className="mt-5 w-full bg-white/16 text-white opacity-100 shadow-none hover:translate-y-0"
                    >
                      Reservation bientot disponible
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {relatedStations.length > 0 ? (
        <section className="pb-18 pt-8 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-4xl border border-white/70 bg-white/92 p-4 shadow-[0_20px_55px_-38px_rgba(10,22,40,0.7)] backdrop-blur sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
                    Explorer d&apos;autres stations ouvertes
                  </h2>
                </div>
                <Link
                  href="/stations"
                  className="text-sm font-semibold text-brand-blue transition-colors hover:text-sky-700"
                >
                  Voir toutes les stations
                </Link>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {relatedStations.map((relatedStation) => (
                  <StationCard key={relatedStation.id} station={relatedStation} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </PageTransition>
  )
}
