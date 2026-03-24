'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import settings from '@/data/settings.json'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/stations', label: 'Stations' },
  { href: '/activities', label: 'Activités' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={false}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all',
        scrolled
          ? 'bg-brand-dark/86 shadow-ocean backdrop-blur-xl'
          : 'bg-gradient-to-b from-brand-dark/78 to-brand-dark/48 backdrop-blur-md'
      )}
    >
      <nav
        className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <Link
          href="/"
          className="rounded-xl px-2 py-1 text-xl font-bold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          aria-label="Retour à l'accueil Kayak en Ré"
        >
          <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Kayak
          </span>{' '}
          <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
            en Ré
          </span>
        </Link>

        <div className="hidden items-center gap-3 rounded-full border border-white/15 bg-white/10 p-1.5 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm font-medium text-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                  isActive
                    ? 'bg-white text-brand-dark'
                    : 'hover:bg-white/12 hover:text-brand-gold'
                )}
                aria-label={`Aller à ${link.label}`}
              >
                {link.label}
              </Link>
            )
          })}
          <Button
            asChild
            size="sm"
            className="ml-1 bg-brand-gold text-brand-dark shadow-[0_10px_25px_-16px_rgba(255,165,0,0.95)] hover:bg-amber-300"
          >
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Réserver sur Kayakomat"
            >
              Réserver
            </a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:hidden"
          aria-label={open ? 'Fermer le menu mobile' : 'Ouvrir le menu mobile'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="md:hidden"
          >
            <div className="space-y-2 border-t border-white/10 bg-brand-dark/96 px-4 py-4">
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
                      'block rounded-xl px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                      isActive && 'bg-white text-brand-dark'
                    )}
                    aria-label={`Aller à ${link.label}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Button
                asChild
                className="mt-2 w-full bg-brand-gold text-brand-dark hover:bg-amber-300"
              >
                <a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  aria-label="Réserver maintenant sur Kayakomat"
                >
                  Réserver
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
