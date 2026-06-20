export type Market = 'us' | 'jp' | 'hk'
export type SignalStrength = '强' | '中' | '低'

export interface Product {
  id: string
  name_zh: string
  name_en: string
  desc_zh: string
  desc_en: string
  price_usd: number
  category: string
  markets: Market[]
  images: string[]
}

export interface StockSignal {
  symbol: string
  name: string
  signal_time: string
  strength: SignalStrength
  price: number
  change_percent: number
}

export interface Alert {
  id: string
  symbol: string
  name: string
  signal: string
  time: string
  price: number
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface SubscriptionPlan {
  id: string
  name_zh: string
  name_en: string
  price: number
  currency: string
  period: string
  features: string[]
  color: string
}
