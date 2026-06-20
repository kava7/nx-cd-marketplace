'use client'

import { useState, type FormEvent } from 'react'
import { MessageSquare, Mail } from 'lucide-react'
import { useLocale } from '@/lib/useLocale'
import { Toast } from '@/components/Toast'
import { sendDiscordWebhook } from '@/lib/discord'

export default function ContactPage() {
  const { t } = useLocale()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setSubmitting(true)
    const content = `📬 新消息来自 ${name} (${email}):\n${message}`
    const result = await sendDiscordWebhook(content)
    setSubmitting(false)

    if (result.success) {
      setName('')
      setEmail('')
      setMessage('')
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

      <h1 className="text-3xl font-bold text-white mb-10">{t('contact.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">{t('contact.name')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#0B0E11] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder={t('contact.name')}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">{t('contact.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0B0E11] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">{t('contact.message')}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-[#0B0E11] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              placeholder={t('contact.message')}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-gradient-to-r from-[#0ECB81] to-[#089e64] text-black font-semibold rounded-lg text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '...' : t('contact.submit')}
          </button>
        </form>

        <div className="space-y-4">
          <a
            href="https://discord.gg/nxcd"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#161B22] border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                <MessageSquare size={22} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                  {t('contact.discord')}
                </h3>
                <p className="text-gray-400 text-sm">discord.gg/nxcd</p>
              </div>
            </div>
          </a>

          <a
            href="mailto:support@nxcduk.com"
            className="block bg-[#161B22] border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center shrink-0">
                <Mail size={22} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                  {t('contact.support')}
                </h3>
                <p className="text-gray-400 text-sm">support@nxcduk.com</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
