'use client';

import { useState } from 'react';

import { getTranslation } from '@/contexts/LocaleContext';
import type { Locale } from '@/types';

import { PaymentModal } from './PaymentModal';

export function SubscribeCard({
  locale,
  title,
  onConfirm,
}: {
  locale: Locale;
  title: string;
  onConfirm: (webhookUrl: string) => Promise<void>;
}): JSX.Element {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[#2B3139] bg-[#1E2329] p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <label className="mt-4 block text-sm text-[#848E9C]" htmlFor="webhook">
        {getTranslation(locale, 'common.webhook')}
      </label>
      <input
        className="mt-2 w-full rounded-lg border border-[#2B3139] bg-[#0B0E11] px-3 py-2 text-white outline-none focus:border-[#0ECB81] focus:ring-1 focus:ring-[#0ECB81]"
        id="webhook"
        onChange={(event) => setWebhookUrl(event.target.value)}
        placeholder="https://discord.com/api/webhooks/..."
        value={webhookUrl}
      />
      <button className="glow-button mt-4 rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-5 py-3 font-medium text-white" onClick={() => setOpen(true)} type="button">
        {title}
      </button>
      <PaymentModal
        amount={9.9}
        isOpen={open}
        locale={locale}
        productName={title}
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          await onConfirm(webhookUrl);
          setOpen(false);
        }}
      />
    </div>
  );
}
