'use client';

import { useState } from 'react';

import { ProductCard } from '@/components/ProductCard';
import { useLocale } from '@/contexts/LocaleContext';
import { products } from '@/data/products';

const categories = ['all', 'bottom', 'volume', 'classic'] as const;

export default function IndicatorsPage(): JSX.Element {
  const { t } = useLocale();
  const [category, setCategory] = useState<(typeof categories)[number]>('all');
  const filtered = category === 'all' ? products : products.filter((product) => product.category === category);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">{t('indicators.title')}</h1>
      <p className="mt-3 text-[#848E9C]">{t('indicators.subtitle')}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            className={`rounded-lg border px-4 py-2 text-sm ${category === item ? 'border-[#0ECB81]/30 bg-[#0ECB81]/15 text-[#0ECB81]' : 'border-[#2B3139] bg-[#1E2329] text-[#848E9C]'}`}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item === 'all' ? t('common.all') : t(`indicators.${item}`)}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
