'use client';

import { useMemo } from 'react';

import type { Locale, StockSignal } from '@/types';

const strengthRank: Record<StockSignal['strength'], number> = { 强: 3, 中: 2, 低: 1 };

export function SignalTable({ locale, signals }: { locale: Locale; signals: StockSignal[] }): JSX.Element {
  const sortedSignals = useMemo(
    () => [...signals].sort((a, b) => strengthRank[b.strength] - strengthRank[a.strength]),
    [signals],
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-[#2B3139] bg-[#1E2329]">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wider text-[#848E9C]">
          <tr>
            <th className="px-4 py-3">{locale === 'zh' ? '股票代码' : 'Symbol'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '信号时间' : 'Signal Time'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '信号级别' : 'Signal Level'}</th>
          </tr>
        </thead>
        <tbody>
          {sortedSignals.map((signal) => (
            <tr className="border-t border-[#2B3139]" key={signal.symbol}>
              <td className="px-4 py-3 font-mono font-medium text-white">{signal.symbol}</td>
              <td className="px-4 py-3 font-mono text-[#848E9C]">{signal.signalTime}</td>
              <td className="px-4 py-3">
                <span className={`rounded px-2 py-1 text-xs ${signal.strength === '强' ? 'bg-[#0ECB81]/15 text-[#0ECB81]' : signal.strength === '中' ? 'bg-[#FFB800]/15 text-[#FFB800]' : 'bg-[#848E9C]/15 text-[#848E9C]'}`}>
                  {signal.strength}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
