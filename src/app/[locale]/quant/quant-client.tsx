'use client'

import { useState, type FormEvent } from 'react'
import { Construction } from 'lucide-react'
import { useLocale } from '@/lib/useLocale'
import { Toast } from '@/components/Toast'

export default function QuantPage() {
  const { locale, t } = useLocale()
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setToast({
      message: locale === 'zh' ? '已登记，上线后将第一时间通知您！' : 'Registered! We\'ll notify you when it launches.',
      type: 'success',
    })
    setEmail('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-400/10 flex items-center justify-center">
          <Construction size={36} className="text-amber-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">{t('quant.title')}</h1>
        <p className="text-gray-400 mb-8">{t('quant.notify')}</p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('contact.email')}
            className="flex-1 bg-[#0B0E11] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-[#0ECB81] to-[#089e64] text-black font-semibold rounded-lg text-sm hover:brightness-110 transition-all shrink-0"
          >
            {locale === 'zh' ? '通知我' : 'Notify Me'}
          </button>
        </form>
      </div>
    </div>
  )
}
