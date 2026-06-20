'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { useLocale } from '@/lib/useLocale'
import { SubscriptionPlanCard } from '@/components/SubscriptionPlanCard'
import { SubscribeModal } from '@/components/SubscribeModal'
import { AlertLog } from '@/components/AlertLog'
import { Toast } from '@/components/Toast'
import { subscriptionPlans } from '@/data/subscription-plans'
import type { SubscriptionPlan } from '@/types'

export default function AlertsPage() {
  const { t } = useLocale()
  const [modalPlan, setModalPlan] = useState<SubscriptionPlan | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [alertTab, setAlertTab] = useState<'us' | 'hk'>('us')

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setModalPlan(plan)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleModalSubmit = (email: string, webhookUrl: string) => {
    const planName = modalPlan ? (t(`alerts.${modalPlan.id}`) || modalPlan.name_en) : ''
    setModalPlan(null)
    setToast({ message: `Subscribed to ${planName} with ${email}`, type: 'success' })
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

      <div className="flex items-center gap-3 mb-2">
        <Bell size={28} className="text-amber-400" />
        <h1 className="text-3xl font-bold text-white">{t('alerts.title')}</h1>
      </div>
      <p className="text-gray-400 mb-10">{t('alerts.desc')}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {subscriptionPlans.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setAlertTab('us')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            alertTab === 'us'
              ? 'bg-cyan-400 text-black'
              : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          {t('alerts.us')}
        </button>
        <button
          onClick={() => setAlertTab('hk')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            alertTab === 'hk'
              ? 'bg-cyan-400 text-black'
              : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          {t('alerts.hk')}
        </button>
      </div>

      <AlertLog />

      {modalPlan && (
        <SubscribeModal
          planName={t(`alerts.${modalPlan.id}`) || modalPlan.name_en}
          onClose={() => setModalPlan(null)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  )
}
