'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

import { cn } from '@/lib/utils'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 460)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className={cn(
        'fixed bottom-5 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/75 bg-brand-dark/90 text-white shadow-[0_18px_40px_-22px_rgba(10,22,40,0.8)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:bottom-6 sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  )
}
