'use client';

import Image from 'next/image';

import { useLocale } from '@/contexts/LocaleContext';
import { formatPrice } from '@/lib/formatPrice';
import type { Product } from '@/types';

import { LocaleLink } from './LocaleLink';

export function ProductCard({ product }: { product: Product }): JSX.Element {
  const { locale } = useLocale();
  return (
    <LocaleLink
      className="block rounded-xl border border-[#2B3139] bg-[#1E2329] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#363E47] hover:shadow-lg focus:outline focus:outline-2 focus:outline-[#0ECB81]"
      href={`/indicators/${product.id}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-[#2B3139]">
        <Image alt={product.name[locale]} className="object-cover" fill src={product.images[0]} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{product.name[locale]}</h3>
        <span className="font-mono text-xl font-bold text-[#0ECB81]">{formatPrice(product.price, locale)}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-[#848E9C]">{product.description[locale]}</p>
    </LocaleLink>
  );
}
