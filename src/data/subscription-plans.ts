import type { SubscriptionPlan } from '@/types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: { zh: '免费', en: 'Free' },
    price: 0,
    features: { zh: ['基础警报', '每日 5 次'], en: ['Basic alerts', '5 checks per day'] },
  },
  {
    id: 'pro',
    name: { zh: '专业', en: 'Pro' },
    price: 29.9,
    features: { zh: ['实时警报', 'Discord 推送'], en: ['Real-time alerts', 'Discord delivery'] },
  },
  {
    id: 'ultimate',
    name: { zh: '旗舰', en: 'Ultimate' },
    price: 79.9,
    features: { zh: ['多市场扫描', '优先支持'], en: ['Multi-market scanning', 'Priority support'] },
  },
];
