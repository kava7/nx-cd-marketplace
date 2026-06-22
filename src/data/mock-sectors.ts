import type { SectorStrength } from '@/types';

export const usSectors: SectorStrength[] = [
  ['半导体', 'Semiconductors', 94, 3.2, ['NVDA', 'AMD']],
  ['AI 软件', 'AI Software', 88, 2.8, ['MSFT', 'GOOGL']],
  ['新能源', 'Clean Energy', 81, 1.5, ['TSLA', 'RIVN']],
  ['金融', 'Financials', 75, 1.1, ['JPM', 'BAC']],
  ['消费电子', 'Consumer Tech', 72, 0.9, ['AAPL', 'SONY']],
].map(([zh, en, strengthScore, changePercent, topStocks]) => ({
  sectorName: { zh: String(zh), en: String(en) },
  strengthScore: Number(strengthScore),
  changePercent: Number(changePercent),
  topStocks: topStocks as string[],
}));

export const hkSectors: SectorStrength[] = [
  ['互联网', 'Internet', 91, 2.9, ['0700.HK', '9988.HK']],
  ['电动车', 'EV', 83, 2.1, ['1211.HK', '9866.HK']],
  ['医药', 'Healthcare', 79, 1.7, ['2269.HK', '1093.HK']],
  ['地产', 'Property', 67, 0.8, ['0016.HK', '1109.HK']],
  ['交易所', 'Exchange', 64, 0.5, ['0388.HK']],
].map(([zh, en, strengthScore, changePercent, topStocks]) => ({
  sectorName: { zh: String(zh), en: String(en) },
  strengthScore: Number(strengthScore),
  changePercent: Number(changePercent),
  topStocks: topStocks as string[],
}));
