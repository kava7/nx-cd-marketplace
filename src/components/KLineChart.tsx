'use client'

import { useEffect, useRef } from 'react'
import { createChart, CandlestickSeries, ColorType, createSeriesMarkers, type IChartApi } from 'lightweight-charts'

interface CandleData {
  time: string
  open: number
  high: number
  low: number
  close: number
}

function generateOHLCV(count: number): CandleData[] {
  const data: CandleData[] = []
  let price = 150
  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.48) * 6
    const open = price
    const close = Math.round((open + change) * 100) / 100
    const high = Math.round(Math.max(open, close) + Math.random() * 2 * 100) / 100
    const low = Math.round(Math.min(open, close) - Math.random() * 2 * 100) / 100
    const m = (i % 12) + 1
    const d = (i % 28) + 1
    data.push({ time: `2026-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`, open, high, low, close })
    price = close
  }
  return data
}

export function KLineChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#161B22' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: '#1F2937' },
        horzLines: { color: '#1F2937' },
      },
      width: containerRef.current.clientWidth,
      height: 400,
    })

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#F6465D',
      downColor: '#0ECB81',
      borderUpColor: '#F6465D',
      borderDownColor: '#0ECB81',
      wickUpColor: '#F6465D',
      wickDownColor: '#0ECB81',
    })

    const ohlcv = generateOHLCV(120)
    candleSeries.setData(ohlcv)

    const markers = createSeriesMarkers(candleSeries)
    const markerData: { time: string; color: string; position: 'aboveBar' | 'belowBar'; shape: 'circle'; size: number }[] = []

    for (let i = 10; i < ohlcv.length; i += Math.floor(Math.random() * 15) + 5) {
      if (i >= ohlcv.length) break
      const isBuy = Math.random() > 0.4
      markerData.push({
        time: ohlcv[i].time,
        color: isBuy ? '#0ECB81' : '#F6465D',
        position: isBuy ? 'belowBar' : 'aboveBar',
        shape: 'circle',
        size: 1.5,
      })
    }

    markers.setMarkers(markerData)

    chart.timeScale().fitContent()
    chartRef.current = chart

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth })
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [])

  return <div ref={containerRef} className="w-full rounded-lg overflow-hidden" />
}
