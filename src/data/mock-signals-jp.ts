import type { StockSignal } from '@/types';
import { usSignals } from './mock-signals-us';

const symbols = ['9984.T', '6758.T', '6861.T', '7203.T', '8306.T', '9432.T', '8035.T', '6501.T', '4063.T', '6098.T', '4519.T', '7267.T', '8058.T', '2914.T', '7974.T'];

export const jpSignals: StockSignal[] = usSignals.map((signal, index) => ({
  ...signal,
  symbol: symbols[index],
  name: `JP ${index + 1}`,
  price: Number((signal.price * 120).toFixed(1)),
}));
