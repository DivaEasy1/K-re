'use client'

import { useSyncExternalStore } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Activity } from '@/types'
import { resolveActivityImage } from '@/lib/media'

interface CartState {
  items: CartItem[]
  addItem: (activity: Activity, quantity: number) => void
  removeItem: (activityId: string) => void
  updateQuantity: (activityId: string, quantity: number) => void
  clearCart: () => void
  validateAndCleanCart: (validActivityIds: string[]) => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (activity: Activity, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === activity.id)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === activity.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                id: activity.id,
                title: activity.title,
                price: parseFloat(activity.price.replace(/[^\d.-]/g, '') || '0'),
                image: resolveActivityImage(activity.image, activity),
                quantity,
                slug: activity.slug,
              },
            ],
          }
        })
      },
      removeItem: (activityId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== activityId),
        }))
      },
      updateQuantity: (activityId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(activityId)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === activityId ? { ...item, quantity } : item
          ),
        }))
      },
      clearCart: () => {
        set({ items: [] })
      },
      validateAndCleanCart: (validActivityIds: string[]) => {
        set((state) => ({
          items: state.items.filter((item) => validActivityIds.includes(item.id)),
        }))
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
)

function subscribeToCartHydration(callback: () => void) {
  const unsubscribeHydrate = useCart.persist.onHydrate(() => callback())
  const unsubscribeFinishHydration = useCart.persist.onFinishHydration(() => callback())

  return () => {
    unsubscribeHydrate()
    unsubscribeFinishHydration()
  }
}

export function useCartHydrated() {
  return useSyncExternalStore(
    subscribeToCartHydration,
    () => useCart.persist.hasHydrated(),
    () => false
  )
}
