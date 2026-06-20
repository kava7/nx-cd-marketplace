export function formatPrice(usd: number, locale: string): string {
  if (locale === 'zh') {
    const cny = Math.round(usd * 7.2)
    return `¥${cny}`
  }
  return `$${usd}`
}
