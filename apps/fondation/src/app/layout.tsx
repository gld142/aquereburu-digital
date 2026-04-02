import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fondation AQUEREBURU & Partners',
  description: 'Actions sociales, éducatives et environnementales au Togo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
