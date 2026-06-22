'use client';

import Image from 'next/image';
import { Loader2, Wallet, X } from 'lucide-react';
import { useState } from 'react';

import { getTranslation } from '@/contexts/LocaleContext';
import { formatPrice } from '@/lib/formatPrice';
import type { Locale } from '@/types';

export function PaymentModal({
  amount,
  isOpen,
  locale,
  productName,
  onClose,
  onConfirm,
}: {
  amount: number;
  isOpen: boolean;
  locale: Locale;
  productName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}): JSX.Element | null {
  const [isProcessing, setIsProcessing] = useState(false);
  if (!isOpen) {
    return null;
  }

  const handleConfirm = async (): Promise<void> => {
    setIsProcessing(true);
    await onConfirm();
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-[#2B3139] bg-[#1E2329] p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Wallet className="h-5 w-5 text-[#0ECB81]" />
            <h2 className="text-lg font-semibold">{getTranslation(locale, 'payment.title')}</h2>
          </div>
          <button aria-label="Close" className="rounded-lg p-2 text-[#848E9C] hover:bg-[#2B3139] hover:text-white" onClick={onClose} type="button">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-[#848E9C]">
          {productName} · {formatPrice(amount, locale)}
        </p>
        <p className="mt-2 text-sm text-[#848E9C]">{getTranslation(locale, 'payment.secure')}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {[
            ['/images/wechat-qr.png', 'common.wechat'],
            ['/images/paypal-qr.png', 'common.paypal'],
          ].map(([src, label]) => (
            <div className="flex flex-col items-center" key={src}>
              <Image alt={getTranslation(locale, label)} className="rounded-lg border border-[#2B3139]" height={144} src={src} width={144} />
              <span className="mt-2 text-sm text-[#848E9C]">{getTranslation(locale, label)}</span>
            </div>
          ))}
        </div>
        <button
          className="glow-button mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-6 py-3 font-medium text-white transition-all duration-200 disabled:opacity-60"
          disabled={isProcessing}
          onClick={handleConfirm}
          type="button"
        >
          {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isProcessing ? getTranslation(locale, 'payment.processing') : getTranslation(locale, 'payment.confirm')}
        </button>
      </div>
    </div>
  );
}
