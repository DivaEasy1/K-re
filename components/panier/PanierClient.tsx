'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useMemo, useEffect } from 'react'
import { useCart, useCartHydrated } from '@/lib/cartStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { BLUR_DATA_URL } from '@/lib/utils'
import { resolveActivityImage } from '@/lib/media'
import { fetchActivities } from '@/lib/api'

export default function PanierClient() {
  const hydrated = useCartHydrated()
  const items = useCart((state) => state.items)
  const removeItem = useCart((state) => state.removeItem)
  const updateQuantity = useCart((state) => state.updateQuantity)
  const validateAndCleanCart = useCart((state) => state.validateAndCleanCart)

  // Validate cart items on mount
  useEffect(() => {
    const validateCart = async () => {
      try {
        const activities = await fetchActivities()
        const validIds = activities.map((a) => a.id)
        validateAndCleanCart(validIds)
      } catch (error) {
        console.error('Error validating cart:', error)
      }
    }

    if (hydrated && items.length > 0) {
      validateCart()
    }
  }, [hydrated, validateAndCleanCart])

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )
  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )

  if (!hydrated) {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="rounded-4xl border border-white/70 bg-white/85 p-8 shadow-[0_26px_65px_-42px_rgba(10,22,40,0.7)] backdrop-blur">
        <div className="text-center py-12">
          <p className="text-lg text-slate-600 mb-6">
            Votre panier est vide
          </p>
          <Button asChild className="bg-brand-dark hover:bg-slate-900">
            <Link href="/activities" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continuer les achats
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden border-white/80 bg-white/95">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={resolveActivityImage(item.image, { title: item.title, slug: item.slug })}
                    alt={item.title}
                    fill
                    sizes="100px"
                    className="object-cover"
                    placeholder="blur"
                    unoptimized={true}
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/activities/${item.slug || item.id}`}
                    className="hover:underline"
                  >
                    <h3 className="font-heading text-lg font-bold text-brand-dark">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.price.toFixed(2)} € par activite
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <span className="ml-auto font-bold text-brand-dark">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <div className="h-fit space-y-4">
        <Card className="border-white/80 bg-white/95 shadow-[0_18px_40px_-28px_rgba(10,22,40,0.6)]">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2 border-b border-slate-200 pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Nombre d&apos;activites</span>
                <span className="font-semibold text-brand-dark">{totalItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Sous-total</span>
                <span className="font-semibold text-brand-dark">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-brand-dark">
              <span>Total</span>
              <span className="text-2xl text-brand-gold">{totalPrice.toFixed(2)} €</span>
            </div>

            <p className="text-xs text-slate-500">
              Les frais de reservation seront ajoutes lors du paiement.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-0">
            <Button
              asChild
              className="w-full bg-brand-gold text-brand-dark hover:bg-amber-300"
            >
              <a
                href="https://www.kayakomat.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Continuer vers Kayakomat
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link href="/activities">
                Continuer les achats
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="rounded-2xl border border-brand-blue/12 bg-brand-blue/[0.07] p-4 text-sm text-slate-600">
          <p className="font-semibold text-brand-dark">Info</p>
          <p className="mt-1">
            Votre panier est sauvegarde localement. Vous pouvez fermer la page et revenir plus tard.
          </p>
        </div>
      </div>
    </div>
  )
}
