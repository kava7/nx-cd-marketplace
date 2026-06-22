'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import { hkSignals } from '@/data/mock-signals-hk';
import { jpSignals } from '@/data/mock-signals-jp';
import { usSignals } from '@/data/mock-signals-us';
import { formatPrice } from '@/lib/formatPrice';
import { localizePath } from '@/lib/paths';
import { purchase } from '@/lib/purchase';
import type { Market, StockSignal } from '@/types';

import { MarketTabs } from './MarketTabs';
import { PaymentModal } from './PaymentModal';
import { SignalTable } from './SignalTable';

export function ScreenerPageClient(): JSX.Element {
  const { locale, t } = useLocale();
  const router = useRouter();
  const [market, setMarket] = useState<Market>('us');
  const [category, setCategory] = useState('fourHour');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [scanResults, setScanResults] = useState<StockSignal[] | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const mockSignals = useMemo(() => (market === 'us' ? usSignals : market === 'jp' ? jpSignals : hkSignals), [market]);

  const startScan = async (): Promise<void> => {
    setLoading(true);
    setScanError(null);
    try {
      const res = await fetch('/api/screener', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxStocks: 100 }),
      });
      const data = (await res.json()) as { signals?: Array<{ ticker: string; timeframe: string; signal_date: string; close: number | null }>; error?: string };
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Scan failed');
      }
      const mapped: StockSignal[] = (data.signals || []).map((s) => ({
        symbol: s.ticker,
        name: s.ticker,
        signalTime: s.signal_date,
        strength: '强',
        price: s.close ?? 0,
        changePercent: 0,
        details: { rsi: 30, macd: 'Golden cross', kdj: 'Oversold' },
      }));
      setScanResults(mapped);
    } catch (e) {
      setScanError(e instanceof Error ? e.message : 'Scan failed');
    } finally {
      setLoading(false);
    }
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
          onChange={setCategory}
          tabs={[
            { key: 'fourHour', label: t('screener.fourHour') },
            { key: 'daily', label: t('screener.daily') },
            { key: 'weekly', label: t('screener.weekly') },
          ]}
        />
        <MarketTabs
          activeTab={market}
          onChange={setMarket}
          tabs={[
            { key: 'us', label: t('screener.us') },
            { key: 'jp', label: t('screener.jp') },
            { key: 'hk', label: t('screener.hk') },
          ]}
        />
        <button className="flex items-center gap-2 rounded-lg border border-[#2B3139] px-5 py-3 text-white" disabled={loading} onClick={startScan} type="button">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? t('common.scanning') : t('common.startScan')}
        </button>
        {scanError && <p className="text-sm text-[#F6465D]">{scanError}</p>}
        {scanResults && scanResults.length === 0 && !scanError && (
          <p className="text-sm text-[#848E9C]">{locale === 'zh' ? '未扫描到信号' : 'No signals found'}</p>
        )}
        <SignalTable locale={locale} signals={scanResults ?? mockSignals} />
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
