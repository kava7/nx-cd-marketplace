import { notFound } from 'next/navigation';

import { IndicatorDetailClient } from '@/components/IndicatorDetailClient';
import { getProduct, products } from '@/data/products';
import type { Locale } from '@/types';

export function generateStaticParams(): Array<{ id: string; locale: Locale }> {
  return ['zh', 'en'].flatMap((locale) => products.map((product) => ({ locale: locale as Locale, id: product.id })));
}

export default function IndicatorDetailPage({ params }: { params: { id: string; locale: Locale } }): JSX.Element {
  const product = getProduct(params.id);
  if (!product) {
    notFound();
  }

  return <IndicatorDetailClient product={product} />;
}
