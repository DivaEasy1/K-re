'use client'

import React, { createContext, useContext, useState } from 'react'

interface CartDrawerContextType {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const CartDrawerContext = createContext<CartDrawerContextType | undefined>(undefined)

export function CartDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const toggleCart = () => setIsOpen((prev) => !prev)

  return (
    <CartDrawerContext.Provider value={{ isOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartDrawerContext.Provider>
  )
}

export function useCartDrawer() {
  const context = useContext(CartDrawerContext)
  if (!context) {
    throw new Error('useCartDrawer must be used within CartDrawerProvider')
  }
  return context
}
