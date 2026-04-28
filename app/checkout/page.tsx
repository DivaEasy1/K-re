import type { Metadata } from 'next'
import PageTransition from '@/components/layout/PageTransition'
import CheckoutClient from '@/components/checkout/CheckoutClient'

export const metadata: Metadata = {
  title: 'Passer la commande',
  description: 'Finalisez votre achat d\'activités K-Ré',
  robots: {
    index: false, // Checkout pages typically shouldn't be indexed
  },
}

export default function CheckoutPage() {
  return (
    <PageTransition>
      <CheckoutClient />
    </PageTransition>
  )
}
