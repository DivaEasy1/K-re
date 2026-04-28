'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import gsap from 'gsap'

import { useCart, useCartHydrated } from '@/lib/cartStore'
import { Button } from '@/components/ui/button'
import { BLUR_DATA_URL } from '@/lib/utils'
import { resolveActivityImage } from '@/lib/media'
import settings from '@/data/settings.json'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const hydrated = useCartHydrated()
  const items = useCart((state) => state.items)
  const removeItem = useCart((state) => state.removeItem)
  const updateQuantity = useCart((state) => state.updateQuantity)

  const drawerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // Smooth open/close animation
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current || !contentRef.current) return

    if (isOpen) {
      // Open animation
      gsap.set(drawerRef.current, { display: 'flex' })
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(contentRef.current, {
        x: 0,
        duration: 0.35,
        ease: 'power2.out',
      })
    } else {
      // Close animation
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
      gsap.to(contentRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(drawerRef.current, { display: 'none' })
        },
      })
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!hydrated) {
    return null
  }

  return (
    <div
      ref={drawerRef}
      className="fixed inset-0 z-[140] hidden flex-col items-end overflow-hidden"
    >
      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Content */}
      <div
        ref={contentRef}
        className="relative h-full w-full max-w-md translate-x-full transform overflow-hidden bg-white shadow-2xl"
        style={{
          maxHeight: '100dvh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="font-heading text-xl font-bold text-brand-dark">Mon Panier</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center">
              <div className="rounded-full bg-slate-100 p-3">
                <svg
                  className="h-6 w-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-slate-600">Votre panier est vide</p>
              <Button
                onClick={onClose}
                asChild
                variant="outline"
                size="sm"
                className="mt-2"
              >
                <Link href="/activities">Découvrir les activités</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={resolveActivityImage(item.image, {
                        title: item.title,
                        slug: item.slug,
                      })}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                      placeholder="blur"
                      unoptimized={true}
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/activities/${item.slug || item.id}`}
                      className="line-clamp-2 text-sm font-semibold text-brand-dark hover:text-brand-blue"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>

                    <p className="mt-1 text-xs text-slate-600">
                      {item.price.toFixed(2)} € × {item.quantity}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded p-0.5 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="h-3 w-3 text-slate-600" />
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-brand-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded p-0.5 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-1"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="h-3 w-3 text-slate-600" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto rounded p-0.5 text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                        aria-label="Supprimer l'article"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 space-y-3">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Nombre d'articles</span>
                <span className="font-semibold text-brand-dark">{totalItems}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span className="font-semibold text-brand-dark">Total</span>
                <span className="font-heading text-lg font-bold text-brand-gold">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              asChild
              className="w-full bg-brand-gold text-brand-dark hover:bg-amber-300 shadow-[0_8px_20px_-8px_rgba(255,165,0,0.4)]"
            >
              <Link href="/checkout" onClick={onClose} className="flex items-center justify-center gap-2">
                Passer la commande
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* Continue Shopping */}
            <Button
              onClick={onClose}
              asChild
              variant="outline"
              className="w-full border-slate-300 text-brand-dark hover:bg-slate-100"
            >
              <Link href="/activities">Continuer les achats</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
