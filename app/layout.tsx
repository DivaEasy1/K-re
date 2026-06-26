import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import MotionProvider from '@/components/layout/MotionProvider'
import ClientEffects from '@/components/layout/ClientEffects'

const bodyFont = Manrope({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-body-base',
})

const headingFont = Sora({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-heading-base',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://k-re.fr'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  applicationName: 'Kayak',
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Location Kayak & Paddle Île de Ré | K-Re',
    template: '%s',
  },
  description: "Location autonome de kayaks et paddles sur l'Île de Ré. Réservez en ligne et profitez d'une aventure nautique en toute liberté.",
  keywords: [
    'location kayak autonome',
    'location kayak la Rochelle',
    'location kayak',
    'activites nautiques ile de re',
    'location kayak ile de re',
    'location paddle ile de re',
    'kayak ile de re',
    'paddle ile de re',
    'kayak la rochelle',
    'paddle la rochelle',
    'activites nautiques ile de re',
    'location kayak autonome',
    'sortie kayak ile de re',
    'kayak en libre service',
    'k-re'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://k-re.fr',
    title: "Location Kayak & Paddle Île de Ré | K-Re",
    description:
      "Stations en libre-service sur l'ile de Re. Reservez en ligne et pagayez en toute liberte.",
    siteName: 'K-re',
    images: [
      {
        url: '/images/hero-img.jpeg',
        width: 1200,
        height: 630,
        alt: 'K-re - Ile de Re',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kayak en re | K-re',
    description: "L'aventure aquatique en toute liberte.",
    images: [
      '/images/hero-img.jpeg',
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${bodyFont.variable} ${headingFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics - Replace with your GA4 ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body
        className="min-h-screen bg-white font-body text-brand-dark antialiased"
        suppressHydrationWarning
      >
        <MotionProvider>
          <Navbar />
          <div id="main-content" className="relative flex min-h-screen flex-col pt-[4.85rem]">
            {children}
            <Footer />
          </div>
          <ClientEffects />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  )
}
