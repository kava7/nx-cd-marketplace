import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'nx-cd',
    name: { zh: 'NX/CD 指标', en: 'NX/CD Indicator' },
    category: 'bottom',
    price: 49,
    images: ['/images/placeholder.png'],
    markets: ['us', 'jp', 'hk'],
    description: {
      zh: '基于多周期趋势与动量分析，帮助识别买入和卖出时机。',
      en: 'A multi-timeframe trend and momentum indicator for clearer entries and exits.',
    },
    features: {
      zh: ['多周期趋势确认', '买卖点信号提示', '支撑阻力自动划线'],
      en: ['Multi-timeframe confirmation', 'Entry and exit signals', 'Automatic support and resistance'],
    },
  },
  {
    id: 'obv',
    name: { zh: 'OBV 指标', en: 'OBV Indicator' },
    category: 'volume',
    price: 39,
    images: ['/images/placeholder.png'],
    markets: ['us', 'jp', 'hk'],
    description: {
      zh: '通过成交量变化预判价格走势，捕捉量价背离。',
      en: 'Uses volume flow to spot price-volume divergence and trend confirmation.',
    },
    features: {
      zh: ['量价背离预警', '趋势方向确认', '关键突破提示'],
      en: ['Volume divergence alerts', 'Trend confirmation', 'Breakout prompts'],
    },
  },
  {
    id: 'accumulation',
    name: { zh: '吸筹派发指标', en: 'Accumulation/Distribution' },
    category: 'volume',
    price: 99,
    images: ['/images/placeholder.png'],
    markets: ['us', 'hk'],
    description: {
      zh: '识别资金吸筹与派发阶段，跟踪主力资金动向。',
      en: 'Tracks accumulation and distribution behavior to surface capital rotation.',
    },
    features: {
      zh: ['主力吸筹识别', '派发阶段预警', '资金流向统计'],
      en: ['Accumulation detection', 'Distribution warnings', 'Capital-flow summaries'],
    },
  },
  {
    id: 'macd',
    name: { zh: 'MACD 指标', en: 'MACD Indicator' },
    category: 'classic',
    price: 29,
    images: ['/images/placeholder.png'],
    markets: ['us', 'jp', 'hk'],
    description: {
      zh: '经典趋势跟踪指标，金叉死叉与背离信号一目了然。',
      en: 'Classic trend-following signals for crossovers, divergence, and bias.',
    },
    features: {
      zh: ['金叉死叉提醒', '柱状体背离识别', '零轴多空判断'],
      en: ['Crossover alerts', 'Histogram divergence', 'Zero-line bias'],
    },
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
