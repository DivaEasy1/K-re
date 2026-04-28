import Image from 'next/image'
import { ReactNode } from 'react'
import { BLUR_DATA_URL } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  variant?: 'home' | 'activities' | 'stations' | 'about' | 'contact'
  title: string | ReactNode
  subtitle: string
  backgroundImage?: string
  backgroundGradient?: string
  badge?: string
  stats?: Array<{ label: string; value: string | number }>
  cta?: Array<{
    label: string
    href: string
    variant?: 'primary' | 'secondary' | 'ghost'
  }>
  children?: ReactNode
  align?: 'left' | 'center'
}

const variantStyles = {
  home: {
    container: 'min-h-[calc(100svh-4.85rem)] items-start lg:items-center',
    overlay: 'from-brand-dark/90 via-brand-dark/58 to-brand-dark/84',
    gradient:
      'radial-gradient(circle_at_16%_18%,rgba(27,160,226,0.4),transparent_38%),radial-gradient(circle_at_86%_12%,rgba(248,180,0,0.35),transparent_38%)',
    textColor: 'text-white',
    titleSize: 'text-4xl sm:text-5xl lg:text-7xl',
    align: 'center',
  },
  activities: {
    container: 'min-h-[500px] items-center',
    overlay: 'from-brand-dark/80 via-brand-dark/40 to-transparent',
    gradient:
      'radial-gradient(circle_at_12%_14%,rgba(255,165,0,0.26),transparent_30%),radial-gradient(circle_at_88%_14%,rgba(30,144,255,0.18),transparent_33%)',
    textColor: 'text-white',
    titleSize: 'text-3xl sm:text-4xl lg:text-5xl',
    align: 'left',
  },
  stations: {
    container: 'min-h-[450px] items-center',
    overlay: 'from-brand-dark/75 via-brand-dark/35 to-transparent',
    gradient:
      'radial-gradient(circle_at_14%_18%,rgba(30,144,255,0.2),transparent_32%),radial-gradient(circle_at_87%_12%,rgba(255,165,0,0.2),transparent_31%)',
    textColor: 'text-white',
    titleSize: 'text-3xl sm:text-4xl lg:text-5xl',
    align: 'left',
  },
  about: {
    container: 'min-h-[400px] items-center',
    overlay: 'from-brand-dark/70 via-brand-dark/30 to-transparent',
    gradient:
      'radial-gradient(circle_at_12%_12%,rgba(30,144,255,0.15),transparent_30%),radial-gradient(circle_at_88%_22%,rgba(255,165,0,0.11),transparent_34%)',
    textColor: 'text-white',
    titleSize: 'text-3xl sm:text-4xl lg:text-5xl',
    align: 'left',
  },
  contact: {
    container: 'min-h-[400px] items-center',
    overlay: 'from-brand-dark/65 via-brand-dark/25 to-transparent',
    gradient:
      'radial-gradient(circle_at_15%_12%,rgba(30,144,255,0.14),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(255,165,0,0.12),transparent_33%)',
    textColor: 'text-white',
    titleSize: 'text-3xl sm:text-4xl lg:text-5xl',
    align: 'left',
  },
}

export default function HeroSection({
  variant = 'home',
  title,
  subtitle,
  backgroundImage,
  backgroundGradient,
  badge,
  stats,
  cta,
  children,
  align: alignProp,
}: HeroSectionProps) {
  const style = variantStyles[variant]
  const align = alignProp || (style.align as 'left' | 'center')

  return (
    <section className={cn('relative isolate flex overflow-hidden', style.container)}>
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          data-hero-media
          fill
          sizes="100vw"
          quality={70}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-center"
          priority
        />
      )}

      {/* Overlay */}
      <div className={cn('absolute inset-0 bg-linear-to-b', style.overlay)} />

      {/* Gradient Accent */}
      <div
        className="absolute inset-0"
        style={{
          background: backgroundGradient || style.gradient,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          className={cn(
            'flex flex-col gap-6',
            align === 'center' ? 'items-center text-center' : 'items-start text-left'
          )}
        >
          {/* Badge */}
          {badge && (
            <span className="glass-panel rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white sm:text-sm backdrop-blur-sm bg-white/10 border border-white/20">
              {badge}
            </span>
          )}

          {/* Title */}
          <h1
            className={cn(
              'section-heading font-heading font-bold tracking-tight',
              style.titleSize,
              style.textColor
            )}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed sm:text-lg',
              style.textColor,
              style.textColor === 'text-white' ? 'text-slate-100' : 'text-slate-600'
            )}
          >
            {subtitle}
          </p>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div
              className={cn(
                'mt-2 flex flex-wrap gap-2',
                align === 'center' ? 'justify-center' : 'justify-start'
              )}
            >
              {stats.map((stat, index) => (
                <span
                  key={index}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm sm:text-sm"
                >
                  {stat.value} {stat.label}
                </span>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          {cta && cta.length > 0 && (
            <div
              className={cn(
                'mt-6 flex flex-wrap gap-3',
                align === 'center' ? 'justify-center' : 'justify-start'
              )}
            >
              {cta.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={cn(
                    'px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    button.variant === 'primary' &&
                      'bg-brand-gold text-brand-dark shadow-[0_12px_30px_-10px_rgba(255,165,0,0.6)] hover:bg-amber-300 hover:shadow-[0_16px_40px_-12px_rgba(255,165,0,0.7)]',
                    button.variant === 'secondary' &&
                      'border-white/50 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm',
                    button.variant === 'ghost' &&
                      'border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'
                  )}
                >
                  {button.label}
                </a>
              ))}
            </div>
          )}

          {/* Children (for custom content) */}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  )
}
