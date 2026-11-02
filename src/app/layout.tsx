import type { Metadata } from 'next';
import { Italiana, Hanken_Grotesk, Caveat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italiana',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

const caveat = Caveat({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://marielagonzalez-arte.vercel.app'),
  title: 'Mariela Gonzalez · Pintura abstracta',
  description: 'Obra abstracta de Mariela Gonzalez, artista plástica de Tunuyán, Mendoza. Explorá sus pinturas, consultá disponibilidad y encargá una obra para tu espacio.',
  openGraph: {
    title: 'Mariela Gonzalez · Pintura abstracta',
    description: 'Obra abstracta de Mariela Gonzalez, artista plástica de Tunuyán, Mendoza.',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mariela Gonzalez · Pintura abstracta',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${italiana.variable} ${hanken.variable} ${caveat.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mariela Gonzalez',
              jobTitle: 'Artista plástica',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Tunuyán',
                addressRegion: 'Mendoza',
                addressCountry: 'AR',
              },
              sameAs: ['https://www.instagram.com/marielagonzalez_arte/'],
              url: 'https://marielagonzalez-arte.vercel.app',
            }),
          }}
        />
      </body>
    </html>
  );
}
