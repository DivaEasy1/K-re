'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { BLUR_DATA_URL, cn } from '@/lib/utils'

interface StationGalleryProps {
  gallery: string[]
  stationName: string
}

export default function StationGallery({
  gallery,
  stationName,
}: StationGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const hasMultipleImages = gallery.length > 1

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1))
  }

  const showNext = () => {
    setActiveIndex((current) => (current === gallery.length - 1 ? 0 : current + 1))
  }

  useEffect(() => {
    if (!lightboxOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false)
      }
      if (event.key === 'ArrowLeft' && hasMultipleImages) {
        setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1))
      }
      if (event.key === 'ArrowRight' && hasMultipleImages) {
        setActiveIndex((current) => (current === gallery.length - 1 ? 0 : current + 1))
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [gallery.length, hasMultipleImages, lightboxOpen])

  return (
    <>
      <div className="rounded-[2rem] border border-white/70 bg-white/95 p-3 shadow-[0_28px_70px_-42px_rgba(10,22,40,0.72)] backdrop-blur sm:p-4">
        <div className="relative overflow-hidden rounded-[1.65rem] border border-slate-200 bg-slate-950">
          <div className="relative h-[22rem] sm:h-[28rem] lg:h-[34rem]">
            <Image
              src={gallery[activeIndex]}
              alt={`Vue ${activeIndex + 1} de ${stationName}`}
              fill
              sizes="(min-width: 1280px) 72vw, (min-width: 768px) 100vw, 100vw"
              quality={84}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-dark/58 via-brand-dark/8 to-transparent" />

            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {activeIndex + 1}/{gallery.length}
              </span>
              <span className="hidden rounded-full border border-white/18 bg-white/10 px-3 py-1 text-xs font-medium text-white/88 backdrop-blur sm:inline-flex">
                Galerie station
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute right-4 top-4 border-white/22 bg-white/10 text-white hover:bg-white/18"
              onClick={() => setLightboxOpen(true)}
              aria-label="Ouvrir la galerie en plein ecran"
            >
              <Expand className="mr-1 h-4 w-4" aria-hidden />
              Plein ecran
            </Button>

            {hasMultipleImages ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  aria-label="Voir l'image precedente"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  aria-label="Voir l'image suivante"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </>
            ) : null}

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">
                  Selection visuelle
                </p>
                <p className="mt-1 text-sm font-medium text-white/92 sm:text-base">
                  Vue {activeIndex + 1} de {stationName}
                </p>
              </div>
              {hasMultipleImages ? (
                <p className="hidden text-xs text-white/72 sm:block">
                  Choisissez une vue ou naviguez avec les fleches
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {hasMultipleImages ? (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'group relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border bg-slate-100 shadow-[0_14px_26px_-20px_rgba(10,22,40,0.65)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:h-24 sm:w-36',
                  activeIndex === index
                    ? 'border-brand-blue ring-2 ring-brand-blue/30'
                    : 'border-slate-200 hover:border-brand-blue/35'
                )}
                aria-label={`Afficher l'image ${index + 1}`}
                aria-pressed={activeIndex === index}
              >
                <Image
                  src={image}
                  alt={`Miniature ${index + 1} de ${stationName}`}
                  fill
                  sizes="160px"
                  quality={70}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/45 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 rounded-full border border-white/12 bg-black/30 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-60 bg-slate-950/94 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie photo de ${stationName}`}
        >
          <div className="absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 text-white sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
                  Galerie immersive
                </p>
                <p className="mt-1 text-sm font-medium text-white/92">
                  {stationName} · vue {activeIndex + 1}/{gallery.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="Fermer la galerie"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="relative flex-1 px-4 pb-4 sm:px-6 sm:pb-6">
              <div className="relative h-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-900">
                <Image
                  src={gallery[activeIndex]}
                  alt={`Vue ${activeIndex + 1} de ${stationName}`}
                  fill
                  sizes="100vw"
                  quality={88}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-contain"
                />

                {hasMultipleImages ? (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white backdrop-blur transition hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      aria-label="Image precedente"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white backdrop-blur transition hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            {hasMultipleImages ? (
              <div className="overflow-x-auto px-4 pb-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-6">
                <div className="flex gap-3">
                  {gallery.map((image, index) => (
                    <button
                      key={`lightbox-${image}-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        'relative h-18 w-28 shrink-0 overflow-hidden rounded-2xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80',
                        activeIndex === index
                          ? 'border-white'
                          : 'border-white/12 opacity-70 hover:opacity-100'
                      )}
                      aria-label={`Afficher l'image ${index + 1} en grand`}
                    >
                      <Image
                        src={image}
                        alt={`Miniature plein ecran ${index + 1} de ${stationName}`}
                        fill
                        sizes="160px"
                        quality={70}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
