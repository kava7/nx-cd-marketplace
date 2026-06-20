'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown } from 'lucide-react'
import type { StockSignal } from '@/types'
import { useLocale } from '@/lib/useLocale'
import { SignalRow } from '@/components/SignalRow'

type SortKey = 'strength' | 'change_percent'

const strengthOrder: Record<string, number> = { '强': 3, '中': 2, '低': 1 }

export function ScreenerTable({ signals }: { signals: StockSignal[] }) {
  const { t } = useLocale()
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortAsc, setSortAsc] = useState(true)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((a) => !a)
    } else {
      setSortKey(key)
      setSortAsc(key === 'change_percent' ? false : true)
    }
  }

  const sorted = useMemo(() => {
    if (!sortKey) return signals
    return [...signals].sort((a, b) => {
      const aVal = sortKey === 'strength' ? (strengthOrder[a.strength] ?? 0) : a.change_percent
      const bVal = sortKey === 'strength' ? (strengthOrder[b.strength] ?? 0) : b.change_percent
      return sortAsc ? aVal - bVal : bVal - aVal
    })
  }, [signals, sortKey, sortAsc])

  const sortIcon = (key: SortKey) => (
    <button onClick={() => handleSort(key)} className="inline-flex items-center gap-1 hover:text-white transition-colors">
      <ArrowUpDown size={14} />
    </button>
  )

  if (signals.length === 0) {
    return (
      <div className="bg-[#161B22] border border-white/10 rounded-lg p-8 text-center text-gray-500">
        {t('screener.empty')}
      </div>
    )
  }

  return (
    <div className="bg-[#161B22] border border-white/10 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 font-medium">{t('screener.symbol')}</th>
              <th className="px-4 py-3 font-medium">{t('screener.name')}</th>
              <th className="px-4 py-3 font-medium">{t('screener.time')}</th>
              <th className="px-4 py-3 font-medium">
                <span className="inline-flex items-center gap-1">
                  {t('screener.strength')}
                  {sortIcon('strength')}
                </span>
              </th>
              <th className="px-4 py-3 font-medium">{t('screener.price')}</th>
              <th className="px-4 py-3 font-medium">
                <span className="inline-flex items-center gap-1">
                  {t('screener.change')}
                  {sortIcon('change_percent')}
                </span>
              </th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((signal, i) => (
              <SignalRow key={signal.symbol} signal={signal} index={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
