import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarClock,
  Zap,
} from 'lucide-react'

import PageTransition from '@/components/layout/PageTransition'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Breadcrumb from '@/components/ui/breadcrumb'
import { fetchActivityBySlug } from '@/lib/api'
import { BLUR_DATA_URL } from '@/lib/utils'
import type { Activity } from '@/types'
import ActivityDetailsClient from '@/components/activities/ActivityDetailsClient'

export const dynamicParams = true

const difficultyInfo = {
  easy: { label: 'Facile', icon: '🎯', color: 'success' },
  medium: { label: 'Intermediaire', icon: '⚡', color: 'warning' },
  hard: { label: 'Difficile', icon: '🔥', color: 'destructive' },
} as const satisfies Record<
  Activity['difficulty'],
  { label: string; icon: string; color: NonNullable<BadgeProps['variant']> }
>

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const activity = await fetchActivityBySlug(slug)

    return {
      title: activity.title,
      description: activity.description,
      alternates: {
        canonical: `/activities/${slug}`,
      },
      openGraph: {
        title: `${activity.title} | Kayak en Re`,
        description: activity.description,
        url: `https://www.kayak-en-re.fr/activities/${slug}`,
        images: [
          {
            url: activity.image,
            alt: activity.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${activity.title} | Kayak en Re`,
        description: activity.description,
        images: [activity.image],
      },
    }
  } catch {
    return {
      title: 'Activite introuvable',
    }
  }
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let activity: Activity

  try {
    activity = await fetchActivityBySlug(slug)
  } catch {
    notFound()
  }

  const difficulty =
    difficultyInfo[activity.difficulty as keyof typeof difficultyInfo] ?? difficultyInfo.easy

  return (
    <PageTransition>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={activity.image}
            alt={activity.title}
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
                { label: 'Activites', href: '/activities' },
                { label: activity.title, href: `/activities/${slug}` },
              ]}
            />
          </div>

          <Link
            href="/activities"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white/92 backdrop-blur transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour aux activites
          </Link>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_360px] xl:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-3xl">{activity.icon}</span>
              </div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Experience K-Re
              </p>
              <h1 className="section-heading font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {activity.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
                {activity.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="default" className="bg-white/20 text-white">
                  {activity.duration}
                </Badge>
                <Badge variant={difficulty.color} className="capitalize">
                  {difficulty.label}
                </Badge>
                <Badge variant="default" className="bg-brand-gold text-brand-dark">
                  {activity.price}
                </Badge>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:w-auto sm:flex-row">
                <ActivityDetailsClient activity={activity} />
              </div>
            </div>

            <Card className="border-white/20 bg-white/10 backdrop-blur">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CalendarClock className="h-5 w-5 text-brand-gold" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase text-white/70">Duree</p>
                      <p className="text-sm font-semibold text-white">{activity.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-brand-gold" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase text-white/70">Difficulte</p>
                      <p className="text-sm font-semibold text-white">{difficulty.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="h-5 w-5 text-brand-gold" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase text-white/70">Categorie</p>
                      <p className="text-sm font-semibold text-white capitalize">
                        {activity.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm text-white/90">
                    <span className="font-bold text-brand-gold">{activity.price}</span> par personne
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-white/70 bg-white/85">
              <CardContent className="pt-6">
                <h2 className="font-heading text-2xl font-bold text-brand-dark">
                  Details et conditions
                </h2>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-brand-dark">Niveau requis:</span>{' '}
                    Tous niveaux - {difficulty.label.toLowerCase()}
                  </p>
                  <p>
                    <span className="font-semibold text-brand-dark">Duree:</span> {activity.duration}
                  </p>
                  <p>
                    <span className="font-semibold text-brand-dark">Prix:</span> {activity.price}{' '}
                    par personne
                  </p>
                  <p className="pt-2 text-xs text-slate-500">
                    Les conditions exactes et disponibilites seront confirmees lors de la reservation sur
                    Kayakomat.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/70 bg-white/85">
              <CardContent className="pt-6">
                <h2 className="font-heading text-2xl font-bold text-brand-dark">
                  Conseils K-Re
                </h2>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>
                    Arrivez 15 minutes avant votre depart pour les verifications de securite.
                  </p>
                  <p>Portez une tenue legere resistant aux eclaboussures et appliquez de la creme solaire.</p>
                  <p>
                    Apportez une serviette et des vetements de rechange. Pas de sacs a main durant l&apos;activite.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
