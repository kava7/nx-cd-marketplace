import type { StockSignal } from '@/types';
import { usSignals } from './mock-signals-us';

const symbols = ['0700.HK', '9988.HK', '3690.HK', '1810.HK', '0939.HK', '1299.HK', '2318.HK', '0388.HK', '9618.HK', '0005.HK', '1024.HK', '2382.HK', '0027.HK', '2269.HK', '0981.HK'];

export const hkSignals: StockSignal[] = usSignals.map((signal, index) => ({
  ...signal,
  symbol: symbols[index],
  name: `HK ${index + 1}`,
  price: Number((signal.price * 0.8).toFixed(1)),
}));
