'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import { formatPrice } from '@/lib/formatPrice';
import { localizePath } from '@/lib/paths';
import { purchase } from '@/lib/purchase';
import type { Market, SignalAction, StockSignal } from '@/types';

import { MarketTabs } from './MarketTabs';
import { PaymentModal } from './PaymentModal';
import { SignalTable } from './SignalTable';

const levelLabel: Record<string, string> = {
  '4h': '4h级别', daily: '日级别', weekly: '周级别',
  monthly: '月级别', quarterly: '季级别',
};

export interface ScanResult {
  ticker: string;
  timeframe: string;
  signal_date: string;
  signal: string;
  level: string;
  close: number | null;
}

interface Props {
  signalMap: Record<string, ScanResult[]>;
}

export function ScreenerPageClient({ signalMap }: Props): JSX.Element {
  const { locale, t } = useLocale();
  const router = useRouter();
  const [market, setMarket] = useState<Market>('us');
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [open, setOpen] = useState(false);

  const realSignals = useMemo<StockSignal[] | null>(() => {
    const all: StockSignal[] = [];
    for (const tf of ['4h', 'daily', 'weekly']) {
      const key = `${market}-${tf}`;
      const signals = signalMap[key] ?? [];
      for (const s of signals) {
        all.push({
          symbol: s.ticker,
          name: s.ticker,
          signalTime: s.signal_date,
          signal: '抄底' as SignalAction,
          level: levelLabel[s.level] ?? levelLabel[tf] ?? tf,
          price: s.close ?? 0,
        });
      }
    }
    return all.length > 0 ? all : null;
  }, [signalMap, market]);

  const switchMarket = (m: Market): void => {
    setMarket(m);
    setShowResults(false);
  };

  const startScan = async (): Promise<void> => {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 2000));
    setScanning(false);
    setShowResults(true);
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

        {showResults ? (
          realSignals !== null ? (
            <SignalTable locale={locale} signals={realSignals} />
          ) : (
            <p className="py-8 text-center text-sm text-[#848E9C]">
              {locale === 'zh' ? '暂未扫描到信号，系统将定时自动扫描' : 'No signals yet. Auto-scan runs on schedule.'}
            </p>
          )
        ) : (
          <p className="py-8 text-center text-sm text-[#848E9C]">
            {locale === 'zh' ? '点击「开始扫描」查看 NX/CD 抄底信号' : 'Click "Start Scan" to view NX/CD bottom-fishing signals.'}
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
