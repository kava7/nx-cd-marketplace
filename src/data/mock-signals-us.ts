import type { StockSignal } from '@/types';

export const usSignals: StockSignal[] = [
  ['AAPL', 'Apple', '12:30', '强', 178.3, 2.34],
  ['TSLA', 'Tesla', '12:15', '中', 245.1, 6.2],
  ['MSFT', 'Microsoft', '11:58', '强', 421.5, 1.87],
  ['NVDA', 'NVIDIA', '11:44', '强', 118.2, 3.45],
  ['AMD', 'AMD', '11:22', '中', 161.7, 2.01],
  ['GOOGL', 'Alphabet', '10:59', '低', 182.4, 0.88],
  ['AMZN', 'Amazon', '10:45', '中', 187.9, 1.24],
  ['META', 'Meta', '10:21', '强', 503.8, 2.67],
  ['NFLX', 'Netflix', '10:05', '低', 671.2, -0.44],
  ['JPM', 'JPMorgan', '09:58', '中', 203.5, 1.11],
  ['BAC', 'Bank of America', '09:43', '低', 39.6, 0.52],
  ['DIS', 'Disney', '09:31', '中', 102.8, 1.75],
  ['BA', 'Boeing', '09:20', '低', 188.6, -0.72],
  ['INTC', 'Intel', '09:12', '中', 31.4, 2.18],
  ['QQQ', 'Invesco QQQ', '09:02', '强', 477.2, 1.92],
].map(([symbol, name, signalTime, strength, price, changePercent], index) => ({
  symbol: String(symbol),
  name: String(name),
  signalTime: String(signalTime),
  signal: '抄底' as const,
  strength: strength as StockSignal['strength'],
  price: Number(price),
  changePercent: Number(changePercent),
  details: {
    rsi: 29 + index,
    macd: index % 2 === 0 ? 'Golden cross' : 'Stabilizing',
    kdj: index % 3 === 0 ? 'Oversold' : 'Turning up',
  },
}));
