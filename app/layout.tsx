import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Bursa Trading Academy Webinar',
  description: 'Master the Markets: Learn proven trading strategies and turn your trading around in 2 hours. Join our live webinar for only RM19',
  generator: 'https://bursawebinar.online',
  metadataBase: new URL('https://bursawebinar.online'),
  keywords: ['trading', 'bursa', 'webinar', 'trading academy', 'trading strategy', 'malaysia', 'EMA strategy'],
  authors: [{ name: 'Bursa Trading Academy' }],
  creator: 'Bursa Trading Academy',
  publisher: 'Bursa Trading Academy',
  formatDetection: {
    telephone: true,
    email: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    title: 'Bursa Trading Academy - Live Trading Masterclass',
    description: 'Master the Markets: Learn proven trading strategies that work – not random signals. Join our live webinar for only RM19',
    siteName: 'Bursa Trading Academy',
    url: 'https://bursawebinar.online',
    images: [
      {
        url: '/preview.jpeg',
        width: 1200,
        height: 630,
        alt: 'Bursa Trading Academy Webinar',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bursa Trading Academy - Live Trading Masterclass',
    description: 'Master the Markets: Learn proven trading strategies that work – not random signals. Join our live webinar for only RM19',
    images: ['/preview.jpeg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon-180.png" />
        <meta name="theme-color" content="#d00" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Bursa Trading Academy Logo" />
        <meta name="twitter:image" content="/logo.png" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
