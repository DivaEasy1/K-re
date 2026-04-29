'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cartStore'
import type { Activity } from '@/types'

export default function ActivityDetailsClient({ activity }: { activity: Activity }) {
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(activity, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <>
      <Button
        onClick={handleAddToCart}
        size="lg"
        className="gap-2 bg-brand-gold text-brand-dark shadow-[0_18px_40px_-22px_rgba(248,180,0,0.95)] hover:bg-amber-300"
      >
        <ShoppingCart className="h-5 w-5" />
        {isAdded ? 'Ajoute au panier!' : 'Ajouter au panier'}
      </Button>
    </>
  )
}
