import type { Metadata } from 'next'
import { Inter, Manrope, Roboto_Mono } from 'next/font/google'
import './globals.css'

import { CustomCursor } from '@/components/layout/CustomCursor'
import { ToastProvider } from '@/components/providers/ToastProvider'

/* ---------------- Fonts ---------------- */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

/* ---------------- Metadata ---------------- */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://yourportfolio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Full-Stack Developer Portfolio',
    template: '%s | Portfolio',
  },
  description:
    'Full-Stack Developer specializing in scalable web applications, APIs, and modern UI systems.',
  keywords: [
    'Full-Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Software Engineer',
  ],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Full-Stack Developer Portfolio',
    description: 'Crafting modern scalable web applications',
    url: siteUrl,
    siteName: 'Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Stack Developer Portfolio',
    description: 'Crafting modern scalable web applications',
  },
}

/* ---------------- Root Layout ---------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {/* Global Providers */}
        <ToastProvider>
          {/* Custom Cursor (safe client component) */}
          <CustomCursor />

          {/* Page Content */}
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}