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
  title: 'AIQuira - Digital M&A Platform',
  description: 'The leading platform for digital mergers and acquisitions. Buy, sell, and value digital assets with AI-powered insights.',
  keywords: 'digital M&A, mergers acquisitions, digital assets, website valuation, business broker',
  authors: [{ name: 'AIQuira Team' }],
  creator: 'AIQuira Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aiquira.com',
    title: 'AIQuira - Digital M&A Platform',
    description: 'The leading platform for digital mergers and acquisitions.',
    siteName: 'AIQuira',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIQuira - Digital M&A Platform',
    description: 'The leading platform for digital mergers and acquisitions.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}