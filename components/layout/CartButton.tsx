'use client'

import { ShoppingCart } from 'lucide-react'
import { useMemo } from 'react'
import { useCart, useCartHydrated } from '@/lib/cartStore'
import { useCartDrawer } from '@/lib/cart-drawer-context'
import { Button } from '@/components/ui/button'

export default function CartButton() {
  const hydrated = useCartHydrated()
  const items = useCart((state) => state.items)
  const { openCart } = useCartDrawer()
  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )

  return (
    <Button
      onClick={openCart}
      size="sm"
      variant="ghost"
      className="relative h-10 w-10 p-0 transition-transform hover:scale-110"
      aria-label="Ouvrir le panier"
    >
      <ShoppingCart className="h-5 w-5 text-white" />
      {hydrated && totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-dark shadow-[0_4px_12px_-4px_rgba(255,165,0,0.6)] animate-pulse">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Button>
  )
}
