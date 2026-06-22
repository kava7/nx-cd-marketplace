'use client';

import { LocaleLink } from '@/components/LocaleLink';
import { useLocale } from '@/contexts/LocaleContext';

export default function NotFoundPage(): JSX.Element {
  const { t } = useLocale();
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-white">{t('notFound.title')}</h1>
      <LocaleLink className="mt-6 rounded-lg bg-[#0ECB81] px-5 py-3 font-medium text-white" href="/">
        {t('notFound.home')}
      </LocaleLink>
    </main>
  );
}
