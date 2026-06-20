'use client'

import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { useLocale } from '@/lib/useLocale'

export function SubscribeModal({
  planName,
  onClose,
  onSubmit,
}: {
  planName: string
  onClose: () => void
  onSubmit: (email: string, webhookUrl: string) => void
}) {
  const { t } = useLocale()
  const [email, setEmail] = useState('')
  const [webhook, setWebhook] = useState('')
  const [emailError, setEmailError] = useState('')
  const [webhookError, setWebhookError] = useState('')

  const validate = (): boolean => {
    let valid = true
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('请输入有效的邮箱地址')
      valid = false
    } else {
      setEmailError('')
    }
    if (webhook.trim() && !/^https:\/\/discord\.com\/api\/webhooks\//.test(webhook.trim())) {
      setWebhookError('请输入有效的 Discord Webhook URL')
      valid = false
    } else {
      setWebhookError('')
    }
    return valid
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(email.trim(), webhook.trim())
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#161B22] border border-white/10 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">
            {t('alerts.subscribe')} — {planName}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">{t('contact.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
            {emailError && <p className="text-[#F6465D] text-xs mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Discord Webhook URL（可选）</label>
            <input
              type="url"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              placeholder="https://discord.com/api/webhooks/..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
            {webhookError && <p className="text-[#F6465D] text-xs mt-1">{webhookError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/20 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            {t('alerts.subscribe')}
          </button>
        </form>
      </div>
    </div>
  )
}
