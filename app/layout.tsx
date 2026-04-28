import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import MotionProvider from '@/components/layout/MotionProvider'
import ClientEffects from '@/components/layout/ClientEffects'
import { CartDrawerProvider } from '@/lib/cart-drawer-context'
import CartDrawerContainer from '@/components/cart/CartDrawerContainer'

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
  metadataBase: new URL('https://www.kayak-en-re.fr'),
  applicationName: 'Kayak en Re',
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Kayak en Re | K-Re',
    template: '%s | Kayak en Re',
  },
  description: "K-Re, location autonome de kayaks et paddles sur l'ile de Re.",
  keywords: [
    'kayak ile de re',
    'paddle ile de re',
    'location kayak autonome',
    'kayakomat',
    'activites nautiques ile de re',
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
    url: 'https://www.kayak-en-re.fr',
    title: "Kayak en Re | L'aventure aquatique en toute liberte",
    description:
      "Stations en libre-service sur l'ile de Re. Reservez en ligne et pagayez en toute liberte.",
    siteName: 'Kayak en Re',
    images: [
      {
        url: 'https://images.pexels.com/photos/7615952/pexels-photo-7615952.jpeg?auto=compress&cs=tinysrgb&w=1800',
        width: 1200,
        height: 630,
        alt: 'Kayak en Re - Ile de Re',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kayak en Re',
    description: "L'aventure aquatique en toute liberte.",
    images: [
      'https://images.pexels.com/photos/7615952/pexels-photo-7615952.jpeg?auto=compress&cs=tinysrgb&w=1800',
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
        <CartDrawerProvider>
          <MotionProvider>
            <Navbar />
            <div id="main-content" className="relative flex min-h-screen flex-col pt-[4.85rem]">
              {children}
              <Footer />
            </div>
            <ClientEffects />
            <BackToTop />
            <CartDrawerContainer />
          </MotionProvider>
        </CartDrawerProvider>
      </body>
    </html>
  )
}
