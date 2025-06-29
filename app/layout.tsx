import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AIQuira - Plataforma Digital de M&A',
  description: 'A principal plataforma para fusões e aquisições digitais. Compre, venda e avalie ativos digitais com insights potenciados por IA.',
  keywords: 'M&A digital, fusões aquisições, ativos digitais, avaliação de websites, corretor de negócios',
  authors: [{ name: 'Equipa AIQuira' }],
  creator: 'Plataforma AIQuira',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://aiquira.com',
    title: 'AIQuira - Plataforma Digital de M&A',
    description: 'A principal plataforma para fusões e aquisições digitais.',
    siteName: 'AIQuira',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIQuira - Plataforma Digital de M&A',
    description: 'A principal plataforma para fusões e aquisições digitais.',
    creator: '@aiquira',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}