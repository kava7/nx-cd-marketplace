'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';

import { AlertLog } from '@/components/AlertLog';
import { MarketTabs } from '@/components/MarketTabs';
import { SubscribeCard } from '@/components/SubscribeCard';
import { useLocale } from '@/contexts/LocaleContext';
import { mockAlertTypes, mockAlertTypesEn } from '@/data/mock-alerts';
import { sendDiscordWebhook } from '@/lib/discord';

export function AlertsPageClient(): JSX.Element {
  const { locale, t } = useLocale();
  const [market, setMarket] = useState<'us' | 'hk'>('us');
  const alertTypes = locale === 'zh' ? mockAlertTypes : mockAlertTypesEn;
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">{t('alerts.title')}</h1>
      <p className="mt-3 text-[#848E9C]">{t('alerts.subtitle')}</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
        {alertTypes.map((item) => (
          <div className="rounded-xl border border-[#2B3139] bg-[#1E2329] p-4 text-center" key={item}>
            <Bell className="mx-auto h-5 w-5 text-[#0ECB81]" />
            <p className="mt-2 text-sm text-white">{item}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <SubscribeCard locale={locale} title={t('alerts.subscribe')} onConfirm={async (url) => {
          await sendDiscordWebhook('Alert subscription confirmed', url);
          await fetch('/api/notify-merchant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'alert', userWebhookUrl: url }),
          });
        }} />
      </div>
      <div className="mt-8 space-y-4">
        <MarketTabs
          activeTab={market}
          onChange={setMarket}
          tabs={[
            { key: 'us', label: t('alerts.us') },
            { key: 'hk', label: t('alerts.hk') },
          ]}
        />
        <AlertLog tab={market} />
      </div>
    </main>
  );
}
