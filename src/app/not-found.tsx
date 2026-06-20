'use client'

import { useLocale } from '@/lib/useLocale'
import { LocaleLink } from '@/components/LocaleLink'

export default function NotFound() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E11] text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">{t('404.title')}</p>
        <LocaleLink
          href="/"
          className="inline-block bg-gradient-to-r from-[#0ECB81] to-[#089e64] text-white px-6 py-3 rounded-lg font-medium hover:shadow-glow-up transition-shadow"
        >
          {t('404.back')}
        </LocaleLink>
      </div>
    </div>
  )
}
