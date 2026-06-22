'use client';

import { useState } from 'react';

import { MarketTabs } from '@/components/MarketTabs';
import { SectorStrengthList } from '@/components/SectorStrengthList';
import { SubscribeCard } from '@/components/SubscribeCard';
import { useLocale } from '@/contexts/LocaleContext';
import { hkSectors, usSectors } from '@/data/mock-sectors';
import { sendDiscordWebhook } from '@/lib/discord';

export function SectorPageClient(): JSX.Element {
  const { locale, t } = useLocale();
  const [market, setMarket] = useState<'us' | 'hk'>('us');
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">{t('sector.title')}</h1>
      <p className="mt-3 text-[#848E9C]">{t('sector.subtitle')}</p>
      <div className="mt-8 space-y-6">
        <MarketTabs
          activeTab={market}
          onChange={setMarket}
          tabs={[
            { key: 'us', label: t('sector.us') },
            { key: 'hk', label: t('sector.hk') },
          ]}
        />
        <SectorStrengthList items={market === 'us' ? usSectors : hkSectors} locale={locale} />
        <SubscribeCard locale={locale} title={t('sector.subscribe')} onConfirm={async (url) => {
          await sendDiscordWebhook('Sector strength subscription confirmed', url);
          await fetch('/api/notify-merchant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'sector', userWebhookUrl: url }),
          });
        }} />
      </div>
    </main>
  );
}
