'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, CheckCircle } from 'lucide-react'
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

      {isAdded && (
        <Button
          asChild
          size="lg"
          className="gap-2 bg-emerald-500 text-white shadow-[0_18px_40px_-22px_rgba(16,185,129,0.95)] hover:bg-emerald-600"
        >
          <Link href="/panier">
            <CheckCircle className="h-5 w-5" />
            Voir le panier
          </Link>
        </Button>
      )}

      <Button
        asChild
        size="lg"
        variant="outline"
        className="border-white/30 text-white hover:bg-white/10"
      >
        <a
          href="https://www.kayakomat.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reserver directement
        </a>
      </Button>
    </>
  )
}
