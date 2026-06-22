import type { StockSignal } from '@/types';

export const usSignals: StockSignal[] = [
  ['AAPL', 'Apple', '12:30', '4h级别', 178.3],
  ['TSLA', 'Tesla', '12:15', '日级别', 245.1],
  ['MSFT', 'Microsoft', '11:58', '日级别', 421.5],
  ['NVDA', 'NVIDIA', '11:44', '周级别', 118.2],
  ['AMD', 'AMD', '11:22', '4h级别', 161.7],
  ['GOOGL', 'Alphabet', '10:59', '周级别', 182.4],
  ['AMZN', 'Amazon', '10:45', '日级别', 187.9],
  ['META', 'Meta', '10:21', '周级别', 503.8],
  ['NFLX', 'Netflix', '10:05', '4h级别', 671.2],
  ['JPM', 'JPMorgan', '09:58', '日级别', 203.5],
  ['BAC', 'Bank of America', '09:43', '4h级别', 39.6],
  ['DIS', 'Disney', '09:31', '日级别', 102.8],
  ['BA', 'Boeing', '09:20', '日级别', 188.6],
  ['INTC', 'Intel', '09:12', '4h级别', 31.4],
  ['QQQ', 'Invesco QQQ', '09:02', '周级别', 477.2],
].map(([symbol, name, signalTime, level, price]) => ({
  symbol: String(symbol),
  name: String(name),
  signalTime: String(signalTime),
  signal: '抄底' as const,
  level: String(level),
  price: Number(price),
}));
