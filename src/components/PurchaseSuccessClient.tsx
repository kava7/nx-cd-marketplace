'use client';

import { CheckCircle, Download } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { useLocale } from '@/contexts/LocaleContext';

import { LocaleLink } from './LocaleLink';

export function PurchaseSuccessClient(): JSX.Element {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const product = searchParams.get('product') || 'NX/CD';
  const amount = searchParams.get('amount');

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <CheckCircle className="h-16 w-16 text-[#0ECB81]" />
      <h1 className="mt-6 text-3xl font-bold text-white">{t('purchaseSuccess.title')}</h1>
      <p className="mt-3 text-[#EAECEF]">
        {t('purchaseSuccess.thanks')} {product} {amount ? `(${amount})` : ''}
      </p>
      <p className="mt-2 text-[#848E9C]">{t('purchaseSuccess.notice')}</p>
      <a className="glow-button mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-6 py-3 font-medium text-white" href="/files/sample.zip">
        <Download className="h-4 w-4" />
        {t('common.download')}
      </a>
      <p className="mt-6 text-sm text-[#848E9C]">{t('purchaseSuccess.support')}</p>
      <LocaleLink className="mt-4 text-[#00F0FF]" href="/">
        {t('notFound.home')}
      </LocaleLink>
    </main>
  );
}
