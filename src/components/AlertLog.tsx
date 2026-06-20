'use client'

import { useEffect, useState, useRef } from 'react'
import type { Alert } from '@/types'

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'AMD', name: 'Advanced Micro Devices' },
]

const signalTexts = [
  'NX/CD 底部反转信号',
  'DW1 下穿确认',
  'NX 支撑位反弹',
  '成交量放大确认',
  'RSI 超卖反转',
]

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomPrice(): number {
  return Math.round((Math.random() * 500 + 20) * 100) / 100
}

function randomTime(base: Date): string {
  const d = new Date(base.getTime() - Math.random() * 60 * 60 * 1000)
  return d.toLocaleTimeString('zh-CN', { hour12: false })
}

const now = new Date()

const initialAlerts: Alert[] = Array.from({ length: 5 }, (_, i) => {
  const stock = stocks[i % stocks.length]
  return {
    id: `init-${i}`,
    symbol: stock.symbol,
    name: stock.name,
    signal: randomItem(signalTexts),
    time: randomTime(new Date(now.getTime() - (5 - i) * 3 * 60 * 1000)),
    price: randomPrice(),
  }
})

export function AlertLog() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const bottomRef = useRef<HTMLDivElement>(null)
  const counter = useRef(5)

  useEffect(() => {
    const id = setInterval(() => {
      const stock = randomItem(stocks)
      counter.current += 1
      const newAlert: Alert = {
        id: `alert-${counter.current}`,
        symbol: stock.symbol,
        name: stock.name,
        signal: randomItem(signalTexts),
        time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
        price: randomPrice(),
      }
      setAlerts((prev) => [...prev.slice(-49), newAlert])
    }, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [alerts.length])

  return (
    <div className="bg-[#161B22] border border-white/10 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-semibold">实时警报流</h3>
      </div>
      <div className="max-h-96 overflow-y-auto divide-y divide-white/5">
        {alerts.map((alert) => (
          <div key={alert.id} className="px-4 py-2.5 flex items-center gap-4 text-sm hover:bg-white/5 transition-colors">
            <span className="text-gray-500 font-mono text-xs w-16 shrink-0">{alert.time}</span>
            <span className="text-cyan-400 font-semibold font-mono w-16 shrink-0">{alert.symbol}</span>
            <span className="text-gray-300 flex-1 truncate">{alert.signal}</span>
            <span className="text-gray-400 font-mono text-xs">${alert.price.toFixed(2)}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
