import type { Metadata } from 'next';
import { zonaPro } from "./fonts";
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Platforms Starter Kit',
  description: 'Next.js template for building a multi-tenant SaaS.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${zonaPro.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
