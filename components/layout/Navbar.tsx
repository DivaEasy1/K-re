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
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-dark/70 backdrop-blur-xl transition-shadow',
        scrolled && 'shadow-ocean'
      )}
    >
      <nav
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <Link
          href="/"
          className="focus-visible:ring-brand-blue rounded-md px-1 py-0.5 text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          aria-label="Retour à l'accueil Kayak en Ré"
        >
          <span className="text-brand-blue">Kayak</span>{' '}
          <span className="text-brand-gold">en Ré</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-2 py-1 text-sm font-medium text-slate-100 transition-colors hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                  isActive && 'text-brand-gold'
                )}
                aria-label={`Aller à ${link.label}`}
              >
                {link.label}
              </Link>
            )
          })}
          <Button asChild size="sm" className="bg-brand-gold text-brand-dark hover:bg-amber-400">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:hidden"
          aria-label={open ? 'Fermer le menu mobile' : 'Ouvrir le menu mobile'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="space-y-2 border-t border-white/10 bg-brand-dark/95 px-4 py-4">
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
                      isActive && 'bg-brand-blue/25 text-brand-gold'
                    )}
                    aria-label={`Aller à ${link.label}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Button
                asChild
                className="mt-2 w-full bg-brand-gold text-brand-dark hover:bg-amber-400"
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
