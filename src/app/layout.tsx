import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NX/CD Marketplace',
  description: 'Bilingual stock indicator marketplace for US, Japan, and Hong Kong equities.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return children as JSX.Element;
}
