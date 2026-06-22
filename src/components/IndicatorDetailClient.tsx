'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import { formatPrice } from '@/lib/formatPrice';
import { localizePath } from '@/lib/paths';
import { purchase } from '@/lib/purchase';
import type { Product } from '@/types';

import { ImageCarousel } from './ImageCarousel';
import { LocaleLink } from './LocaleLink';
import { PaymentModal } from './PaymentModal';

export function IndicatorDetailClient({ product }: { product: Product }): JSX.Element {
  const { locale, t } = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <LocaleLink className="mb-6 inline-flex items-center gap-2 text-[#00F0FF]" href="/indicators">
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </LocaleLink>
      <div className="grid gap-8 lg:grid-cols-2">
        <ImageCarousel alt={product.name[locale]} images={product.images} />
        <section>
          <h1 className="text-3xl font-bold text-white">{product.name[locale]}</h1>
          <p className="mt-3 font-mono text-3xl font-bold text-[#0ECB81]">{formatPrice(product.price, locale)}</p>
          <p className="mt-6 text-[#EAECEF]">{product.description[locale]}</p>
          <div className="mt-6">
            <h2 className="font-semibold text-white">{t('indicators.markets')}</h2>
            <p className="mt-2 font-mono text-[#848E9C]">{product.markets.join(' / ').toUpperCase()}</p>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-white">{t('indicators.features')}</h2>
            <ul className="mt-2 space-y-2 text-[#EAECEF]">
              {product.features[locale].map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
          <button className="glow-button mt-8 w-full rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-6 py-3 font-medium text-white" onClick={() => setOpen(true)} type="button">
            {t('common.buyNow')} {formatPrice(product.price, locale)}
          </button>
        </section>
      </div>
      <PaymentModal
        amount={product.price}
        isOpen={open}
        locale={locale}
        productName={product.name[locale]}
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          await purchase(product.name[locale], 'WeChat/PayPal', formatPrice(product.price, locale));
          router.push(`${localizePath('/purchase-success', locale)}?product=${encodeURIComponent(product.name[locale])}&amount=${encodeURIComponent(formatPrice(product.price, locale))}`);
        }}
      />
    </main>
  );
}
