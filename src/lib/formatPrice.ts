import type { Locale } from '@/types';

export function formatPrice(price: number, locale: Locale): string {
  const normalized = Number.isInteger(price) ? price.toFixed(0) : price.toString();
  return locale === 'zh' ? `¥${normalized}` : `$${normalized}`;
}
