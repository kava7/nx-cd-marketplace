export interface MockAlert {
  id: string;
  symbol: string;
  name: string;
  alertType: string;
  time: string;
  price: number;
}

const alertTypes = [
  '日大级别抄底',
  '周大级别抄底',
  '月大级别抄底',
  '季大级别实时抄底',
  '支撑+抄底',
  '多周期抄底共振',
  '集体共振',
];

const alertTypesEn = [
  'Daily Bottom',
  'Weekly Bottom',
  'Monthly Bottom',
  'Quarterly Bottom',
  'Support+Bottom',
  'Multi-Period Resonance',
  'Collective Resonance',
];

const symbols = ['AAPL', 'TSLA', 'NVDA', 'AMD', 'MSFT', 'GOOGL', 'META', 'AMZN', 'COIN', 'PYPL', 'NFLX', 'DIS', 'BA', 'JPM', 'BAC'];
const names: Record<string, string> = {
  AAPL: 'Apple', TSLA: 'Tesla', NVDA: 'NVIDIA', AMD: 'AMD', MSFT: 'Microsoft',
  GOOGL: 'Alphabet', META: 'Meta', AMZN: 'Amazon', COIN: 'Coinbase', PYPL: 'PayPal',
  NFLX: 'Netflix', DIS: 'Disney', BA: 'Boeing', JPM: 'JPMorgan', BAC: 'Bank of America',
};

function randomTime(): string {
  const h = Math.floor(Math.random() * 6 + 9);
  const m = Math.floor(Math.random() * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function generateMockAlerts(count = 50): MockAlert[] {
  return Array.from({ length: count }, (_, i) => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    const typeIdx = Math.floor(Math.random() * alertTypes.length);
    return {
      id: String(i),
      symbol: sym,
      name: names[sym] || sym,
      alertType: alertTypes[typeIdx],
      time: randomTime(),
      price: +(Math.random() * 500 + 20).toFixed(2),
    };
  });
}

export const mockAlertTypes = alertTypes;
export const mockAlertTypesEn = alertTypesEn;
