'use client'

import { useLocale } from '@/lib/useLocale'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useLocale()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E11] text-white px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">{t('error.title')}</h1>
        <button
          onClick={() => reset()}
          className="bg-gradient-to-r from-[#0ECB81] to-[#089e64] text-white px-6 py-3 rounded-lg font-medium hover:shadow-glow-up transition-shadow"
        >
          {t('error.retry')}
        </button>
      </div>
    </div>
  )
}
