import { Trophy } from 'lucide-react';

import type { Locale, SectorStrength } from '@/types';

export function SectorStrengthList({ items, locale }: { items: SectorStrength[]; locale: Locale }): JSX.Element {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#2B3139] bg-[#1E2329]">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wider text-[#848E9C]">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">{locale === 'zh' ? '板块' : 'Sector'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '强度' : 'Strength'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '涨幅' : 'Change'}</th>
            <th className="px-4 py-3">{locale === 'zh' ? '领涨股' : 'Leaders'}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr className="border-t border-[#2B3139]" key={item.sectorName.en}>
              <td className="px-4 py-3 font-mono text-white">
                {index === 0 ? <Trophy className="inline h-4 w-4 text-[#FFB800]" /> : null} #{index + 1}
              </td>
              <td className="px-4 py-3 text-white">{item.sectorName[locale]}</td>
              <td className="px-4 py-3">
                <div className="h-2 w-32 overflow-hidden rounded bg-[#2B3139]">
                  <div className="h-full bg-gradient-to-r from-[#F6465D] via-[#FFB800] to-[#0ECB81]" style={{ width: `${item.strengthScore}%` }} />
                </div>
                <span className="mt-1 block font-mono text-xs text-[#848E9C]">{item.strengthScore}</span>
              </td>
              <td className="px-4 py-3 font-mono text-[#0ECB81]">+{item.changePercent}%</td>
              <td className="px-4 py-3 font-mono text-[#EAECEF]">{item.topStocks.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
