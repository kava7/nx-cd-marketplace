'use client'

import { useState } from 'react'
import { Scan } from 'lucide-react'
import { useLocale } from '@/lib/useLocale'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ScreenerTable } from '@/components/ScreenerTable'
import { mockSignals } from '@/data/mock-signals'
import { mockSignalsJP } from '@/data/mock-signals-jp'
import { mockSignalsHK } from '@/data/mock-signals-hk'
import type { StockSignal } from '@/types'

const markets = ['us', 'jp', 'hk'] as const

const signalData: Record<string, StockSignal[]> = {
  us: mockSignals,
  jp: mockSignalsJP,
  hk: mockSignalsHK,
}

const stockCounts: Record<string, number> = {
  us: 415,
  jp: 210,
  hk: 380,
}

export default function ScreenerPage() {
  const { t } = useLocale()
  const [market, setMarket] = useState<string>('us')
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [results, setResults] = useState<StockSignal[]>([])

  const handleScan = () => {
    setScanning(true)
    setScanned(false)
    setTimeout(() => {
      setResults(signalData[market])
      setScanning(false)
      setScanned(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">{t('screener.title')}</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {markets.map((m) => {
          const isActive = market === m
          return (
            <button
              key={m}
              onClick={() => {
                setMarket(m)
                setScanned(false)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cyan-400 text-black'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {t(`screener.${m}`)}
            </button>
          )
        })}
      </div>

      <p className="text-gray-400 mb-6">
        {t('screener.desc').replace('415', String(stockCounts[market]))}
      </p>

      <button
        onClick={handleScan}
        disabled={scanning}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#0ECB81] to-[#089e64] text-black font-semibold rounded-lg text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-10"
      >
        <Scan size={18} />
        {scanning ? t('screener.scanning') : t('screener.scan')}
      </button>

      {scanning && <LoadingSpinner text={t('screener.scanning')} />}

      {scanned && !scanning && <ScreenerTable signals={results} />}
    </div>
  )
}
