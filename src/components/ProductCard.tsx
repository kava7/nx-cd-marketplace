'use client'

import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'
import { useLocale } from '@/lib/useLocale'
import { formatPrice } from '@/lib/formatPrice'
import { LocaleLink } from '@/components/LocaleLink'

export function ProductCard({ product }: { product: Product }) {
  const { locale, t } = useLocale()
  const name = locale === 'zh' ? product.name_zh : product.name_en
  const desc = locale === 'zh' ? product.desc_zh : product.desc_en

  return (
    <div className="bg-[#161B22] border border-white/10 rounded-lg overflow-hidden hover:border-cyan-400/30 transition-all duration-300 group">
      <div className="bg-gray-800 aspect-video flex items-center justify-center text-gray-500 text-sm">
        {product.id}
      </div>
      <div className="p-4 space-y-3">
        <span className="inline-block text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded font-medium">
          {product.category}
        </span>
        <h3 className="text-white font-semibold text-base leading-tight">{name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{desc}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-white">
            {formatPrice(product.price_usd, locale)}
          </span>
          <LocaleLink href={`/shop/${product.id}`}>
            <button className="flex items-center gap-1.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
              <ShoppingCart size={15} />
              {t('product.buy')}
            </button>
          </LocaleLink>
        </div>
      </div>
    </div>
  )
}
