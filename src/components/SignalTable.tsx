'use client';

import { useMemo } from 'react';

import type { Locale, StockSignal } from '@/types';
import { sortByLevel } from '@/types';

const levelColor: Record<string, string> = {
  '4h级别': 'bg-[#848E9C]/15 text-[#848E9C]',
  '日级别': 'bg-[#FFB800]/15 text-[#FFB800]',
  '周级别': 'bg-[#0ECB81]/15 text-[#0ECB81]',
  '月级别': 'bg-[#00F0FF]/15 text-[#00F0FF]',
  '季级别': 'bg-[#F6465D]/15 text-[#F6465D]',
};
const signalColor: Record<StockSignal['signal'], string> = {
  '抄底': 'bg-[#0ECB81]/15 text-[#0ECB81]',
  '卖出': 'bg-[#F6465D]/15 text-[#F6465D]',
};

export function SignalTable({ locale, signals }: { locale: Locale; signals: StockSignal[] }): JSX.Element {
  const sortedSignals = useMemo(() => sortByLevel(signals), [signals]);

  return (
    <div className="overflow-x-auto rounded-xl border border-[#2B3139] bg-[#1E2329]">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wider text-[#848E9C]">
          <tr>
            <th className="px-4 py-3">{locale === 'zh' ? '股票代码' : 'Symbol'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '信号时间' : 'Signal Time'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '信号' : 'Signal'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '信号级别' : 'Signal Level'}</th>
          </tr>
        </thead>
        <tbody>
          {sortedSignals.map((signal) => (
            <tr className="border-t border-[#2B3139]" key={`${signal.symbol}-${signal.signalTime}`}>
              <td className="px-4 py-3 font-mono font-medium text-white">{signal.symbol}</td>
              <td className="px-4 py-3 font-mono text-[#848E9C]">{signal.signalTime}</td>
              <td className="px-4 py-3">
                <span className={`rounded px-2 py-1 text-xs ${signalColor[signal.signal]}`}>
                  {signal.signal}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`rounded px-2 py-1 text-xs ${levelColor[signal.level] ?? 'bg-[#848E9C]/15 text-[#848E9C]'}`}>
                  {signal.level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
