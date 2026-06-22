import { CandleAnimation } from '@/components/CandleAnimation';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { getTranslation } from '@/lib/i18n';
import type { Locale } from '@/types';

import { LocaleLink } from '@/components/LocaleLink';
import { ChevronDown } from 'lucide-react';

export default function HomePage({ params }: { params: { locale: Locale } }): JSX.Element {
  const t = (key: string): string => getTranslation(params.locale, key);
  return (
    <main>
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        <CandleAnimation />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white md:text-6xl">{t('home.title')}</h1>
            <p className="mt-6 text-lg text-[#EAECEF] md:text-xl">{t('home.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LocaleLink className="glow-button rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-6 py-3 font-medium text-white" href="/indicators">
                {t('home.shopCta')}
              </LocaleLink>
              <LocaleLink className="rounded-lg border border-[#2B3139] bg-[#1E2329] px-6 py-3 font-medium text-[#EAECEF]" href="/screener">
                {t('home.screenerCta')}
              </LocaleLink>
            </div>
          </div>
        </div>
        <ChevronDown className="absolute bottom-8 left-1/2 h-8 w-8 -translate-x-1/2 animate-bounce text-[#848E9C]" />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-6 text-2xl font-semibold text-white">{t('home.previewTitle')}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
