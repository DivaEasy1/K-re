'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import settings from '@/data/settings.json'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/stations', label: 'Stations' },
  { href: '/activities', label: 'Activites' },
  { href: '/about', label: 'A propos' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    const SCROLL_ENTER = 18
    const SCROLL_EXIT = 6
    let raf = 0

    const updateScrolled = () => {
      const y = window.scrollY
      setScrolled((prev) => (prev ? y > SCROLL_EXIT : y > SCROLL_ENTER))
      raf = 0
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(updateScrolled)
    }

    updateScrolled()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    const prevTouchAction = document.body.style.touchAction

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.touchAction = prevTouchAction
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? 'bg-brand-dark/88 shadow-[0_14px_30px_-22px_rgba(10,22,40,0.82)] md:backdrop-blur-xl backdrop-blur-sm'
          : 'bg-brand-dark/68 md:backdrop-blur-md backdrop-blur-0'
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(30,144,255,0.1),transparent_30%,transparent_70%,rgba(255,165,0,0.08))]" />

      <nav
        className={cn(
          'relative mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8',
          scrolled ? 'h-[4.35rem]' : 'h-[4.85rem]'
        )}
        aria-label="Navigation principale"
      >
        <Link
          href="/"
          className="rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          aria-label="Retour a l'accueil Kayak en Re"
        >
          <p className="text-xl font-bold tracking-tight text-white">
            <span className="bg-linear-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
              Kayak
            </span>{' '}
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              en Re
            </span>
          </p>
          <p className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-white/65 lg:block">
            Ile de Re
          </p>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1 rounded-2xl border border-white/15 bg-white/8 p-1.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-xl px-3.5 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                    isActive
                      ? 'bg-white text-brand-dark shadow-[0_10px_20px_-14px_rgba(10,22,40,0.75)]'
                      : 'text-slate-100 hover:bg-white/14 hover:text-white'
                  )}
                  aria-label={`Aller a ${link.label}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <Button
            asChild
            size="sm"
            className="h-10 bg-brand-gold px-5 text-brand-dark shadow-[0_14px_30px_-18px_rgba(255,165,0,1)] hover:-translate-y-0.5 hover:bg-amber-300"
          >
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reserver sur Kayakomat"
            >
              Reserver
            </a>
          </Button>

          <span
            className={cn(
              'rounded-full border border-white/22 px-3 py-1 text-xs font-semibold text-white/80 transition-opacity',
              isHome ? 'opacity-100' : 'opacity-0'
            )}
            aria-hidden={!isHome}
          >
            24/7 autonome
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/28 bg-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:hidden"
          aria-label={open ? 'Fermer le menu mobile' : 'Ouvrir le menu mobile'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          'px-4 pb-4 md:hidden transition-opacity duration-200',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div
          className={cn(
            'overflow-hidden rounded-2xl border border-white/16 bg-brand-dark/96 p-3 shadow-[0_20px_34px_-24px_rgba(10,22,40,0.9)] transition-[max-height,transform,opacity] duration-300',
            open ? 'max-h-96 translate-y-0 opacity-100' : 'max-h-0 -translate-y-2 opacity-0 p-0'
          )}
        >
          <div className="space-y-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-xl px-3 py-2.5 text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                    isActive
                      ? 'bg-white text-brand-dark shadow-[0_10px_20px_-14px_rgba(10,22,40,0.75)]'
                      : 'hover:bg-white/10'
                  )}
                  aria-label={`Aller a ${link.label}`}
                >
                  {link.label}
                </Link>
              )
            })}

            <Button
              asChild
              className="mt-1 w-full bg-brand-gold text-brand-dark hover:bg-amber-300"
            >
              <a
                href={settings.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                aria-label="Reserver maintenant sur Kayakomat"
              >
                Reserver
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
