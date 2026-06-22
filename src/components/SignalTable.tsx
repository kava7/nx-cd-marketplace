'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { Locale, StockSignal } from '@/types';

const strengthRank: Record<StockSignal['strength'], number> = { 强: 3, 中: 2, 低: 1 };

export function SignalTable({ locale, signals }: { locale: Locale; signals: StockSignal[] }): JSX.Element {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'strength' | 'change'>('strength');
  const sortedSignals = useMemo(
    () =>
      [...signals].sort((a, b) =>
        sortBy === 'strength' ? strengthRank[b.strength] - strengthRank[a.strength] : b.changePercent - a.changePercent,
      ),
    [signals, sortBy],
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-[#2B3139] bg-[#1E2329]">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wider text-[#848E9C]">
          <tr>
            <th className="px-4 py-3">Symbol</th>
            <th className="px-4 py-3">{locale === 'zh' ? '名称' : 'Name'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '信号时间' : 'Time'}</th>
            <th className="px-4 py-3">
              <button onClick={() => setSortBy('strength')} type="button">
                {locale === 'zh' ? '强度' : 'Strength'}
              </button>
            </th>
            <th className="px-4 py-3">{locale === 'zh' ? '价格' : 'Price'}</th>
            <th className="px-4 py-3">
              <button onClick={() => setSortBy('change')} type="button">
                {locale === 'zh' ? '涨跌幅' : 'Change'}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSignals.map((signal) => (
            <tr className="border-t border-[#2B3139]" key={signal.symbol}>
              <td className="px-4 py-3 font-mono font-medium text-white">
                <button className="flex items-center gap-2" onClick={() => setExpanded(expanded === signal.symbol ? null : signal.symbol)} type="button">
                  {expanded === signal.symbol ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {signal.symbol}
                </button>
                {expanded === signal.symbol ? (
                  <div className="mt-3 whitespace-nowrap rounded-lg bg-[#2B3139] p-3 text-xs text-[#EAECEF]">
                    RSI: {signal.details.rsi} · MACD: {signal.details.macd} · KDJ: {signal.details.kdj}
                  </div>
                ) : null}
              </td>
              <td className="px-4 py-3 text-[#EAECEF]">{signal.name}</td>
              <td className="px-4 py-3 font-mono text-[#848E9C]">{signal.signalTime}</td>
              <td className="px-4 py-3">
                <span className={`rounded px-2 py-1 text-xs ${signal.strength === '强' ? 'bg-[#0ECB81]/15 text-[#0ECB81]' : signal.strength === '中' ? 'bg-[#FFB800]/15 text-[#FFB800]' : 'bg-[#848E9C]/15 text-[#848E9C]'}`}>
                  {signal.strength}
                </span>
              </td>
              <td className="px-4 py-3 font-mono">${signal.price}</td>
              <td className={`px-4 py-3 font-mono ${signal.changePercent >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                {signal.changePercent >= 0 ? '+' : ''}
                {signal.changePercent}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
