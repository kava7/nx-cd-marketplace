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

export interface StockSignal {
  symbol: string;
  name: string;
  signalTime: string;
  strength: SignalStrength;
  price: number;
  changePercent: number;
  details: {
    rsi: number;
    macd: string;
    kdj: string;
  };
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
