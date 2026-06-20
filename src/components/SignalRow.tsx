'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { StockSignal } from '@/types'
import { useLocale } from '@/lib/useLocale'

const strengthConfig: Record<string, { label: string; class: string }> = {
  '强': { label: '强', class: 'bg-[#0ECB81]/20 text-[#0ECB81]' },
  '中': { label: '中', class: 'bg-[#FFB800]/20 text-[#FFB800]' },
  '低': { label: '低', class: 'bg-gray-500/20 text-gray-400' },
}

function pseudoDetails(index: number) {
  const seed = index * 7 + 13
  return {
    rsi: 30 + (seed % 40),
    macd: (seed % 20) - 10,
    volume: 1_000_000 + seed * 50_000,
    support: (100 + (seed % 300)).toFixed(2),
    resistance: (200 + (seed % 500)).toFixed(2),
  }
}

export function SignalRow({ signal, index }: { signal: StockSignal; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useLocale()
  const strength = strengthConfig[signal.strength] ?? strengthConfig['低']
  const changePositive = signal.change_percent >= 0
  const details = pseudoDetails(index)

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <td className="px-4 py-3 text-white font-mono font-semibold text-sm">{signal.symbol}</td>
        <td className="px-4 py-3 text-gray-300 text-sm">{signal.name}</td>
        <td className="px-4 py-3 text-gray-400 text-sm font-mono">{signal.signal_time}</td>
        <td className="px-4 py-3">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${strength.class}`}>
            {strength.label}
          </span>
        </td>
        <td className="px-4 py-3 text-gray-300 font-mono text-sm">${signal.price.toFixed(2)}</td>
        <td className={`px-4 py-3 font-mono text-sm font-medium ${changePositive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
          {changePositive ? '+' : ''}{signal.change_percent.toFixed(2)}%
        </td>
        <td className="px-4 py-3 text-gray-500">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </td>
      </tr>
      {expanded && (
        <tr className="bg-white/[0.02]">
          <td colSpan={7} className="px-6 py-4">
            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>
                <span className="text-gray-500 text-xs">{t('screener.details')} RSI</span>
                <p className="text-white font-mono mt-0.5">{details.rsi}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">MACD</span>
                <p className="text-white font-mono mt-0.5">{details.macd > 0 ? '+' : ''}{details.macd}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Volume</span>
                <p className="text-white font-mono mt-0.5">{(details.volume / 1_000_000).toFixed(1)}M</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Support</span>
                <p className="text-white font-mono mt-0.5">${details.support}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Resistance</span>
                <p className="text-white font-mono mt-0.5">${details.resistance}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
