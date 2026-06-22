export type Locale = 'zh' | 'en';

export type Market = 'us' | 'jp' | 'hk';

export type SignalStrength = '强' | '中' | '低';

export interface Product {
  id: string;
  name: Record<Locale, string>;
  category: 'bottom' | 'volume' | 'classic';
  price: number;
  images: string[];
  markets: Market[];
  description: Record<Locale, string>;
  features: Record<Locale, string[]>;
}

export type SignalAction = '抄底' | '卖出';

const levelRank: Record<string, number> = { '季级别': 5, '月级别': 4, '周级别': 3, '日级别': 2, '4h级别': 1 };

export interface StockSignal {
  symbol: string;
  name: string;
  signalTime: string;
  signal: SignalAction;
  level: string;
  price: number;
}

export function sortByLevel(signals: StockSignal[]): StockSignal[] {
  return [...signals].sort((a, b) => (levelRank[b.level] ?? 0) - (levelRank[a.level] ?? 0));
}

export interface AlertItem {
  timestamp: string;
  symbol: string;
  alertType: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface Alert {
  id: string;
  symbol: string;
  name: string;
  signal: string;
  time: string;
  price: number;
}

export interface SectorStrength {
  sectorName: Record<Locale, string>;
  strengthScore: number;
  changePercent: number;
  topStocks: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: Record<Locale, string>;
  price: number;
  features: Record<Locale, string[]>;
}
