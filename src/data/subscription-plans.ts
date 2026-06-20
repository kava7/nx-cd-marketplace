import type { SubscriptionPlan } from '@/types'

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name_zh: '免费版',
    name_en: 'Free',
    price: 0,
    currency: 'USD',
    period: 'month',
    features: ['alerts.feat1', 'alerts.feat2', 'alerts.feat3'],
    color: 'slate',
  },
  {
    id: 'pro',
    name_zh: '专业版',
    name_en: 'Pro',
    price: 29.9,
    currency: 'USD',
    period: 'month',
    features: ['alerts.feat4', 'alerts.feat5', 'alerts.feat6', 'alerts.feat7'],
    color: 'cyan',
  },
  {
    id: 'ultimate',
    name_zh: '终极版',
    name_en: 'Ultimate',
    price: 79.9,
    currency: 'USD',
    period: 'month',
    features: ['alerts.feat8', 'alerts.feat9', 'alerts.feat10', 'alerts.feat11', 'alerts.feat12'],
    color: 'amber',
  },
]
