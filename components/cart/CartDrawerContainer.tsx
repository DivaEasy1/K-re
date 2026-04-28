'use client'

import { useCartDrawer } from '@/lib/cart-drawer-context'
import CartDrawer from '@/components/cart/CartDrawer'

export default function CartDrawerContainer() {
  const { isOpen, closeCart } = useCartDrawer()

  return <CartDrawer isOpen={isOpen} onClose={closeCart} />
}
