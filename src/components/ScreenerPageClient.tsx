'use client';

import { AlertCircle, Lock, Loader2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import { formatPrice } from '@/lib/formatPrice';
import { products } from '@/data/products';
import type { Market, SignalAction, StockSignal } from '@/types';

import { MarketTabs } from './MarketTabs';
import { PaymentModal } from './PaymentModal';
import { SignalTable } from './SignalTable';

const SCAN_DAYS = [1, 2, 3];
const DAY_NAMES_EN = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_NAMES_ZH = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

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
  const [market, setMarket] = useState<Market>('us');
  const [timeframe, setTimeframe] = useState<string>('4h');
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scanError, setScanError] = useState('');
  const [liveSignals, setLiveSignals] = useState<StockSignal[] | null>(null);
  const [buyProduct, setBuyProduct] = useState<{ id: string; name: string; price: number } | null>(null);

  const today = new Date().getDay();
  const canScan = SCAN_DAYS.includes(today);
  const isZh = locale === 'zh';

  const marketProducts = useMemo(() => {
    return products.filter(p => p.category === 'screener' && p.markets.includes(market));
  }, [market]);

  const realSignals = useMemo<StockSignal[] | null>(() => {
    const all: StockSignal[] = [];
    const key = `${market}-${timeframe}`;
    const signals = signalMap[key] ?? [];
    for (const s of signals) {
      all.push({
        symbol: s.ticker,
        name: s.ticker,
        signalTime: s.signal_date,
        signal: '抄底' as SignalAction,
        level: levelLabel[s.level] ?? levelLabel[timeframe] ?? timeframe,
        price: s.close ?? 0,
      });
    }
    return all.length > 0 ? all : null;
  }, [signalMap, market, timeframe]);

  const switchMarket = (m: Market): void => {
    setMarket(m);
    setShowResults(false);
    setLiveSignals(null);
    setScanError('');
    setTimeframe(m === 'us' ? '4h' : 'daily');
  };

  const startScan = useCallback(async (): Promise<void> => {
    setScanning(true);
    setScanError('');
    setShowResults(false);
    setLiveSignals(null);

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 180000);

      const res = await fetch('/api/screener', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ market, timeframe, maxStocks: 10 }),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.signals && data.signals.length > 0) {
        const mapped: StockSignal[] = data.signals.map((s: ScanResult) => ({
          symbol: s.ticker,
          name: s.ticker,
          signalTime: s.signal_date,
          signal: '抄底' as SignalAction,
          level: levelLabel[s.level] ?? levelLabel[timeframe] ?? timeframe,
          price: s.close ?? 0,
        }));
        setLiveSignals(mapped);
      } else {
        setLiveSignals(null);
      }
    } catch {
      if (realSignals && realSignals.length > 0) {
        setLiveSignals(realSignals);
      } else {
        setLiveSignals(null);
      }
    } finally {
      setScanning(false);
      setShowResults(true);
    }
  }, [market, timeframe, realSignals]);

  const timeframeOptions = market === 'us'
    ? ['4h', 'daily', 'weekly']
    : ['daily', 'weekly'];

  const tfLabel = (tf: string) => {
    if (tf === '4h') return '4h';
    if (tf === 'daily') return isZh ? '日级别' : 'Daily';
    return isZh ? '周级别' : 'Weekly';
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold text-white">{t('screener.title')}</h1>
        <p className="mt-3 text-[#848E9C]">{t('screener.subtitle')}</p>
      </div>

      <section className="mt-8 rounded-xl border border-[#2B3139] bg-[#1E2329] p-6">
        <div className="space-y-6">
          <MarketTabs
            activeTab={market}
            onChange={switchMarket}
            tabs={[
              { key: 'us', label: t('screener.us') },
              { key: 'jp', label: t('screener.jp') },
              { key: 'hk', label: t('screener.hk') },
            ]}
          />

          <div className="flex gap-2">
            {timeframeOptions.map(tf => (
              <button
                key={tf}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  timeframe === tf
                    ? 'bg-[#0ECB81] text-white'
                    : 'border border-[#2B3139] text-[#848E9C] hover:border-[#363E47] hover:text-white'
                }`}
                onClick={() => { setTimeframe(tf); setShowResults(false); }}
                type="button"
              >
                {tfLabel(tf)}
              </button>
            ))}
          </div>

          {canScan ? (
            <>
              <button
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_rgba(14,203,129,0.5)] disabled:opacity-60"
                disabled={scanning}
                onClick={startScan}
                type="button"
              >
                {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {scanning ? t('common.scanning') : t('common.startScan')}
              </button>

              {showResults ? (
                liveSignals !== null ? (
                  <SignalTable locale={locale} signals={liveSignals} />
                ) : (
                  <div className="py-8 text-center">
                    {scanError ? (
                      <div className="flex items-center justify-center gap-2 text-sm text-[#F6465D]">
                        <AlertCircle className="h-4 w-4" />
                        <span>{scanError}</span>
                      </div>
                    ) : null}
                    <p className="mt-2 text-sm text-[#848E9C]">
                      {isZh ? '暂未扫描到信号' : 'No signals detected.'}
                    </p>
                  </div>
                )
              ) : (
                <p className="py-8 text-center text-sm text-[#848E9C]">
                  {isZh ? `点击「开始扫描」查看 ${market.toUpperCase()} ${tfLabel(timeframe)} 抄底信号` : `Click "Start Scan" to view ${market.toUpperCase()} ${timeframe} bottom signals.`}
                </p>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-[#FFB800]/30 bg-[#FFB800]/5 p-6 text-center">
              <Lock className="mx-auto h-8 w-8 text-[#FFB800]" />
              <h3 className="mt-3 text-lg font-semibold text-white">
                {isZh ? '今日不可扫描' : 'Scan Unavailable Today'}
              </h3>
              <p className="mt-2 text-sm text-[#848E9C]">
                {isZh
                  ? `扫描仅在每周一至周三开放（今天${DAY_NAMES_ZH[today]}）。购买选股器代码后可在本地随时运行。`
                  : `Scanning is available Mon–Wed only (today is ${DAY_NAMES_EN[today]}). Purchase the screener code to run locally anytime.`}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-white">
          {isZh ? `选购${market.toUpperCase()}选股器` : `Buy ${market.toUpperCase()} Screener`}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marketProducts.map(p => {
            const timeframeTag = p.id.includes('4h') ? '4h' : p.id.includes('1d') ? (isZh ? '日级别' : 'Daily') : (isZh ? '周级别' : 'Weekly');
            return (
            <div key={p.id} className="group rounded-xl border border-[#2B3139] bg-[#1E2329] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#363E47] hover:shadow-lg">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-white">{p.name[locale]}</h3>
                <span className="rounded-md border border-[#0ECB81]/30 bg-[#0ECB81]/10 px-2 py-0.5 font-mono text-xs text-[#0ECB81]">{timeframeTag}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#848E9C]">{p.description[locale]}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.features[locale].map(f => (
                  <span key={f} className="rounded-md bg-[#2B3139] px-2 py-0.5 text-xs text-[#848E9C]">{f}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-xl font-bold text-[#0ECB81]">{formatPrice(p.price, locale)}</span>
                <button
                  className="rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_rgba(14,203,129,0.5)]"
                  onClick={() => setBuyProduct({ id: p.id, name: p.name[locale], price: p.price })}
                  type="button"
                >
                  {isZh ? '立即购买' : 'Buy Now'}
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {buyProduct && (
        <PaymentModal
          amount={buyProduct.price}
          isOpen={!!buyProduct}
          locale={locale}
          productId={buyProduct.id}
          productName={buyProduct.name}
          onClose={() => setBuyProduct(null)}
          onConfirm={async () => {}}
        />
      )}
    </main>
  );
}
