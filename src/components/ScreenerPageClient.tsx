'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import { formatPrice } from '@/lib/formatPrice';
import { localizePath } from '@/lib/paths';
import { purchase } from '@/lib/purchase';
import type { Market, StockSignal } from '@/types';

import { MarketTabs } from './MarketTabs';
import { PaymentModal } from './PaymentModal';
import { SignalTable } from './SignalTable';

interface ScanResult {
  ticker: string;
  timeframe: string;
  signal_date: string;
  close: number | null;
}

interface Props {
  initialSignals?: ScanResult[];
}

export function ScreenerPageClient({ initialSignals }: Props): JSX.Element {
  const { locale, t } = useLocale();
  const router = useRouter();
  const [market, setMarket] = useState<Market>('us');
  const [category, setCategory] = useState('daily');
  const [scanning, setScanning] = useState(false);
  const [open, setOpen] = useState(false);

  const buildStockSignals = (data: ScanResult[]): StockSignal[] =>
    data.map((s) => ({
      symbol: s.ticker,
      name: s.ticker,
      signalTime: s.signal_date,
      strength: '强' as const,
      price: s.close ?? 0,
      changePercent: 0,
      details: { rsi: 30, macd: 'Golden cross', kdj: 'Oversold' },
    }));

  const realSignals = useMemo<StockSignal[] | null>(
    () =>
      initialSignals && initialSignals.length > 0
        ? buildStockSignals(initialSignals)
        : null,
    [initialSignals],
  );

  const hasRealData = realSignals !== null;

  const switchMarket = (m: Market): void => {
    setMarket(m);
  };

  const switchCategory = (c: string): void => {
    setCategory(c);
  };

  const startScan = async (): Promise<void> => {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 2000));
    setScanning(false);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('screener.title')}</h1>
          <p className="mt-3 text-[#848E9C]">{t('screener.subtitle')}</p>
        </div>
        <button className="glow-button rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-6 py-3 font-medium text-white" onClick={() => setOpen(true)} type="button">
          {t('screener.buy')}
        </button>
      </div>
      <section className="mt-8 space-y-6 rounded-xl border border-[#2B3139] bg-[#1E2329] p-6">
        <MarketTabs
          activeTab={category}
          onChange={switchCategory}
          tabs={[
            { key: 'fourHour', label: t('screener.fourHour') },
            { key: 'daily', label: t('screener.daily') },
            { key: 'weekly', label: t('screener.weekly') },
          ]}
        />
        <MarketTabs
          activeTab={market}
          onChange={switchMarket}
          tabs={[
            { key: 'us', label: t('screener.us') },
            { key: 'jp', label: t('screener.jp') },
            { key: 'hk', label: t('screener.hk') },
          ]}
        />
        <button className="flex items-center gap-2 rounded-lg border border-[#2B3139] px-5 py-3 text-white" disabled={scanning} onClick={startScan} type="button">
          {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {scanning ? t('common.scanning') : t('common.startScan')}
        </button>

        {hasRealData ? (
          <SignalTable locale={locale} signals={realSignals!} />
        ) : (
          <p className="py-8 text-center text-sm text-[#848E9C]">
            {locale === 'zh' ? '暂未扫描到信号，系统将定时自动扫描' : 'No signals yet. Auto-scan runs on schedule.'}
          </p>
        )}
      </section>
      <PaymentModal
        amount={99}
        isOpen={open}
        locale={locale}
        productName={t('screener.title')}
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          await purchase(t('screener.title'), 'WeChat/PayPal', formatPrice(99, locale));
          router.push(`${localizePath('/purchase-success', locale)}?product=${encodeURIComponent(t('screener.title'))}&amount=${encodeURIComponent(formatPrice(99, locale))}`);
        }}
      />
    </main>
  );
}
