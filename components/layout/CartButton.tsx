'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useMemo } from 'react'
import { useCart, useCartHydrated } from '@/lib/cartStore'
import { Button } from '@/components/ui/button'

export default function CartButton() {
  const hydrated = useCartHydrated()
  const items = useCart((state) => state.items)
  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )

  if (!hydrated) {
    return (
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="h-10 w-10 p-0"
      >
        <Link href="/panier">
          <ShoppingCart className="h-5 w-5 text-white" />
        </Link>
      </Button>
    )
  }

  return (
    <Button
      asChild
      size="sm"
      variant="ghost"
      className="relative h-10 w-10 p-0"
    >
      <Link href="/panier">
        <ShoppingCart className="h-5 w-5 text-white" />
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-dark">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Link>
    </Button>
  )
}
