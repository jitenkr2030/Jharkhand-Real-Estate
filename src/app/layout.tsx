import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Baraik Brother Property - Find Your Dream Property in Ranchi, Jamshedpur, Dhanbad',
  description: 'Discover verified properties with Baraik Brother Property. Search plots, apartments, villas, and independent houses in Ranchi, Jamshedpur, Dhanbad and more. Direct owner listings, RERA verified, trusted platform.',
  keywords: 'property in Ranchi, plots in Jamshedpur, houses in Dhanbad, real estate Jharkhand, verified properties, RERA Jharkhand, land for sale, Baraik Brother Property',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}