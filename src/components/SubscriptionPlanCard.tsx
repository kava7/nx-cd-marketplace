'use client'

import { Check } from 'lucide-react'
import type { SubscriptionPlan } from '@/types'
import { useLocale } from '@/lib/useLocale'
import { formatPrice } from '@/lib/formatPrice'

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  slate: { border: 'border-gray-500/30', bg: 'bg-gray-500/10', text: 'text-gray-300', badge: 'bg-gray-500/20 text-gray-300' },
  cyan: { border: 'border-cyan-400/30', bg: 'bg-cyan-400/10', text: 'text-cyan-400', badge: 'bg-cyan-400/20 text-cyan-400' },
  amber: { border: 'border-amber-400/30', bg: 'bg-amber-400/10', text: 'text-amber-400', badge: 'bg-amber-400/20 text-amber-400' },
}

export function SubscriptionPlanCard({
  plan,
  onSubscribe,
}: {
  plan: SubscriptionPlan
  onSubscribe: (plan: SubscriptionPlan) => void
}) {
  const { locale, t } = useLocale()
  const colors = colorMap[plan.color] ?? colorMap.slate
  const name = locale === 'zh' ? plan.name_zh : plan.name_en

  return (
    <div className={`bg-[#161B22] border ${colors.border} rounded-lg p-6 flex flex-col`}>
      <div className="mb-4">
        <h3 className={`text-lg font-bold ${colors.text}`}>{name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">
            {formatPrice(plan.price, locale)}
          </span>
          <span className="text-gray-400 text-sm">/{plan.period === 'month' ? (locale === 'zh' ? '月' : 'mo') : plan.period}</span>
        </div>
      </div>

      <ul className="space-y-2.5 flex-1 mb-6">
        {plan.features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <Check size={16} className="text-[#0ECB81] mt-0.5 shrink-0" />
            <span>{t(feat)}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSubscribe(plan)}
        className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${colors.bg} ${colors.text} border ${colors.border} hover:brightness-125`}
      >
        {t('alerts.subscribe')}
      </button>
    </div>
  )
}
