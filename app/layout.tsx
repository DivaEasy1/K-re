import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body-base',
})

const headingFont = Sora({
  subsets: ['latin'],
  variable: '--font-heading-base',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kayak-en-re.fr'),
  title: {
    default: 'Kayak en Ré | K-Ré',
    template: '%s | Kayak en Ré',
  },
  description: "K-Ré, location autonome de kayaks et paddles sur l'Île de Ré.",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.kayak-en-re.fr',
    title: 'Kayak en Ré | L’aventure aquatique en toute liberté',
    description:
      "Stations en libre-service sur l'Île de Ré. Réservez en ligne et pagayez en toute liberté.",
    siteName: 'Kayak en Ré',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Kayak en Ré - Île de Ré',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kayak en Ré',
    description: "L'aventure aquatique en toute liberté.",
    images: ['/images/hero-bg.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className="min-h-screen bg-white font-body text-brand-dark antialiased">
        <Navbar />
        <div className="relative flex min-h-screen flex-col pt-[4.5rem]">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
