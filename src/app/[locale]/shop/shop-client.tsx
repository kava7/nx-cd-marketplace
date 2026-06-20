'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/useLocale'
import { ProductCard } from '@/components/ProductCard'
import productsRaw from '@/data/products.json'
import type { Product } from '@/types'

const products = productsRaw as Product[]

const filters = ['all', 'bottom', 'volume', 'common'] as const

const categoryMap: Record<string, string> = {
  all: '',
  bottom: '抄底指标',
  volume: '量价指标',
  common: '常用指标',
}

export default function ShopPage() {
  const { t } = useLocale()
  const [active, setActive] = useState<string>('all')

  const filtered = active === 'all'
    ? products
    : products.filter((p) => p.category === categoryMap[active])

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">{t('shop.title')}</h1>

      <div className="flex flex-wrap gap-3 mb-10">
        {filters.map((f) => {
          const isActive = active === f
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cyan-400 text-black'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {t(`shop.filter.${f}`)}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
