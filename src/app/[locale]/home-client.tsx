'use client'

import { TrendingUp, BarChart3, Bell } from 'lucide-react'
import { useLocale } from '@/lib/useLocale'
import { LocaleLink } from '@/components/LocaleLink'
import { ProductCard } from '@/components/ProductCard'
import productsRaw from '@/data/products.json'
import type { Product } from '@/types'

const products = productsRaw as Product[]

const features = [
  { icon: TrendingUp, key: 'feature1' as const },
  { icon: BarChart3, key: 'feature2' as const },
  { icon: Bell, key: 'feature3' as const },
]

function FloatingOrbs() {
  return (
    <>
      <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-cyan-400/40 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full bg-cyan-400/30 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-32 left-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400/20 animate-float" style={{ animationDelay: '3s' }} />
    </>
  )
}

export default function HomePage() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-grid">
        <FloatingOrbs />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LocaleLink href="/shop">
              <button className="glow-up px-8 py-3 bg-gradient-to-r from-[#0ECB81] to-[#089e64] text-black font-semibold rounded-lg text-base hover:brightness-110 transition-all">
                {t('home.hero.buy')}
              </button>
            </LocaleLink>
            <LocaleLink href="/screener">
              <button className="px-8 py-3 border border-white/20 text-gray-300 font-medium rounded-lg text-base hover:bg-white/5 hover:text-white transition-all">
                {t('home.hero.screener')}
              </button>
            </LocaleLink>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon
            return (
              <div key={feat.key} className="bg-[#161B22] border border-white/10 rounded-xl p-6 backdrop-blur-xl bg-white/5 hover:border-cyan-400/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {t('home.hero.title')}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('home.hero.subtitle')}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {t('shop.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
