import { Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { LocaleProvider } from '@/contexts/LocaleContext';
import type { Locale } from '@/types';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });
const locales: Locale[] = ['zh', 'en'];

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}): JSX.Element {
  if (!locales.includes(params.locale)) {
    notFound();
  }

  return (
    <html className={`${inter.variable} ${jetbrains.variable}`} lang={params.locale}>
      <body className="min-h-screen bg-[#0B0E11] font-sans text-[#EAECEF]">
        <LocaleProvider initialLocale={params.locale}>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 pt-16">{children}</div>
            <Footer />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
