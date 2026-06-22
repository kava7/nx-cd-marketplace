'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import type { Alert } from '@/types';

const usSymbols = ['AAPL', 'TSLA', 'NVDA', 'AMD', 'MSFT', 'GOOGL', 'META', 'AMZN', 'COIN', 'PYPL', 'NFLX', 'DIS', 'BA', 'JPM', 'BAC'];
const usNames: Record<string, string> = {
  AAPL: 'Apple Inc.', TSLA: 'Tesla Inc.', NVDA: 'NVIDIA Corp.',
  AMD: 'AMD Inc.', MSFT: 'Microsoft Corp.', GOOGL: 'Alphabet Inc.',
  META: 'Meta Platforms Inc.', AMZN: 'Amazon.com Inc.',
  COIN: 'Coinbase Global Inc.', PYPL: 'PayPal Holdings Inc.',
  NFLX: 'Netflix Inc.', DIS: 'Disney Inc.', BA: 'Boeing Inc.',
  JPM: 'JPMorgan Inc.', BAC: 'Bank of America Inc.',
};

const hkSymbols = ['0700.HK', '9988.HK', '3690.HK', '1810.HK', '2318.HK', '1299.HK', '0005.HK', '0883.HK', '0939.HK', '0388.HK', '0001.HK', '0066.HK', '0267.HK', '2899.HK', '1109.HK'];
const hkNames: Record<string, string> = {
  '0700.HK': '腾讯控股', '9988.HK': '阿里巴巴', '3690.HK': '美团',
  '1810.HK': '小米集团', '2318.HK': '中国平安', '1299.HK': '友邦保险',
  '0005.HK': '汇丰控股', '0883.HK': '中国海洋石油', '0939.HK': '建设银行',
  '0388.HK': '香港交易所', '0001.HK': '长和', '0066.HK': '港铁公司',
  '0267.HK': '中信股份', '2899.HK': '紫金矿业', '1109.HK': '华润置地',
};

const alertMessages = [
  '日级别抄底信号',
  '周级别抄底信号',
  '月级别抄底信号',
  '季级别抄底信号',
  '日级别支撑+1h抄底信号',
  '日级别支撑+15m抄底信号',
  '周级别支撑+4h抄底信号',
  '周级别支撑+30m抄底信号',
  '月级别支撑+5m抄底信号',
  '集体抄底55个',
  '4321集体抄底共振',
];

function createIndividualQueue(tab: string): Alert[] {
  const isHk = tab === 'hk';
  const syms = isHk ? hkSymbols : usSymbols;
  const names = isHk ? hkNames : usNames;
  const individualSignals = alertMessages.filter((s) => s !== '集体抄底55个');

  const queue: Alert[] = [];
  let idx = 0;
  for (const sym of syms) {
    for (const signal of individualSignals) {
      queue.push({
        id: String(idx++),
        symbol: sym,
        name: names[sym] || sym,
        signal,
        time: new Date().toLocaleTimeString(),
        price: isHk ? +(Math.random() * 200 + 10).toFixed(2) : +(Math.random() * 500 + 20).toFixed(2),
      });
    }
  }

  // Fisher-Yates shuffle
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  return queue;
}

interface AlertLogProps {
  tab?: string;
}

export function AlertLog({ tab = 'us' }: AlertLogProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const queueRef = useRef<Alert[]>([]);
  const idxRef = useRef(0);
  const collectiveCountRef = useRef(0);
  const nextCollectiveRef = useRef(8);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newQueue = createIndividualQueue(tab);
    queueRef.current = newQueue;
    idxRef.current = 0;
    collectiveCountRef.current = 0;
    nextCollectiveRef.current = Math.floor(Math.random() * 8) + 8;
    setAlerts(newQueue.slice(0, 5));
    idxRef.current = 5;
  }, [tab]);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextAlert: Alert;

      if (collectiveCountRef.current >= nextCollectiveRef.current) {
        nextAlert = {
          id: `collective-${Date.now()}`,
          symbol: '',
          name: '',
          signal: '集体抄底55个',
          time: new Date().toLocaleTimeString(),
          price: 0,
        };
        collectiveCountRef.current = 0;
        nextCollectiveRef.current = Math.floor(Math.random() * 8) + 8;
      } else {
        if (idxRef.current >= queueRef.current.length) {
          queueRef.current = createIndividualQueue(tab);
          idxRef.current = 0;
        }
        nextAlert = queueRef.current[idxRef.current];
        idxRef.current++;
        collectiveCountRef.current++;
      }

      setAlerts((prev) => [...prev.slice(-99), { ...nextAlert, time: new Date().toLocaleTimeString() }]);
    }, 3000);
    return () => clearInterval(timer);
  }, [tab]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [alerts.length]);

  return (
    <div className="rounded-xl border border-white/10 bg-[#161B22] max-h-80 overflow-y-auto">
      {alerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Bell className="w-8 h-8 mb-2" />
          <p className="text-sm">等待实时信号...</p>
        </div>
      )}
      {alerts.map((a) => {
        const isCollective = a.signal === '集体抄底55个';
        return (
          <div key={a.id} className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
            <span className="text-xs font-mono text-cyan-400 shrink-0">{a.time}</span>
            {isCollective ? (
              <span className="text-sm font-semibold text-amber-400">{a.signal}</span>
            ) : (
              <>
                <span className="text-sm font-semibold text-white font-mono shrink-0">{a.symbol}</span>
                <span className="text-xs text-gray-400 truncate">{a.signal}</span>
                <span className="text-xs font-mono text-gray-400 ml-auto">
                  {tab === 'hk' ? `HK$${a.price}` : `$${a.price}`}
                </span>
              </>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
