'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Check } from 'lucide-react'
import { useLocale } from '@/lib/useLocale'
import { LocaleLink } from '@/components/LocaleLink'
import { ImageCarousel } from '@/components/ImageCarousel'
import { Toast } from '@/components/Toast'
import { formatPrice } from '@/lib/formatPrice'
import { purchase } from '@/lib/purchase'
import productsRaw from '@/data/products.json'
import type { Product } from '@/types'

const products = productsRaw as Product[]

const marketFlags: Record<string, string> = {
  us: '🇺🇸',
  jp: '🇯🇵',
  hk: '🇭🇰',
}

export default function ProductDetailClient() {
  const { locale, t } = useLocale()
  const params = useParams()
  const id = params.id as string

  const product = products.find((p) => p.id === id)

  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'paypal'>('wechat')
  const [processing, setProcessing] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('404.title')}</h1>
          <LocaleLink href="/shop">
            <button className="px-4 py-2 bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 rounded-lg text-sm">
              {t('404.back')}
            </button>
          </LocaleLink>
        </div>
      </div>
    )
  }

  const name = locale === 'zh' ? product.name_zh : product.name_en
  const desc = locale === 'zh' ? product.desc_zh : product.desc_en

  const handleBuy = async () => {
    setProcessing(true)
    const result = await purchase({
      productName: name,
      price: product.price_usd,
      paymentMethod: paymentMethod === 'wechat' ? '微信支付' : 'PayPal',
    })
    setProcessing(false)

    if (result.success) {
      setDownloadUrl(result.downloadUrl)
      setToast({ message: t('contact.success'), type: 'success' })
    } else {
      setToast({ message: t('contact.fail'), type: 'error' })
    }
  }

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <ImageCarousel images={product.images} productId={product.id} />
        </div>

        <div className="space-y-6">
          <span className="inline-block text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded font-medium">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-white">{name}</h1>

          <p className="text-gray-400 leading-relaxed">{desc}</p>

          <div className="text-3xl font-bold text-white">
            {formatPrice(product.price_usd, locale)}
          </div>

          <div>
            <span className="text-sm text-gray-400 block mb-2">{t('product.markets')}</span>
            <div className="flex gap-2">
              {product.markets.map((m) => (
                <span key={m} className="text-lg" title={m.toUpperCase()}>
                  {marketFlags[m] ?? m}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-400 block mb-3">{t('product.buy')}</span>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'wechat'}
                  onChange={() => setPaymentMethod('wechat')}
                  className="accent-cyan-400"
                />
                <span className="text-gray-300 text-sm">{t('product.wechat')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="accent-cyan-400"
                />
                <span className="text-gray-300 text-sm">{t('product.paypal')}</span>
              </label>
            </div>

            <button
              onClick={handleBuy}
              disabled={processing}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#0ECB81] to-[#089e64] text-black font-semibold rounded-lg text-base hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? '...' : t('product.buy')}
            </button>

            {downloadUrl && (
              <div className="mt-4">
                <a
                  href={downloadUrl}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                >
                  <Check size={16} />
                  {t('product.download')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
