import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AQUEREBURU & PARTNERS',
  description: "Société d'Avocats Juridique et Fiscale",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
