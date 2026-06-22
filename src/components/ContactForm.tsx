'use client';

import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';

import { getTranslation } from '@/contexts/LocaleContext';
import type { Locale } from '@/types';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export function ContactForm({
  locale,
  onSubmit,
}: {
  locale: Locale;
  onSubmit: (payload: ContactPayload) => Promise<void>;
}): JSX.Element {
  const [form, setForm] = useState<ContactPayload>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const isValid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    setStatus('sending');
    await onSubmit(form);
    setStatus('sent');
  };

  return (
    <form className="space-y-4 rounded-xl border border-[#2B3139] bg-[#1E2329] p-6" onSubmit={handleSubmit}>
      {(['name', 'email', 'message'] as const).map((field) => (
        <div key={field}>
          <label className="mb-2 block text-sm text-[#EAECEF]" htmlFor={field}>
            {getTranslation(locale, `common.${field}`)}
          </label>
          {field === 'message' ? (
            <textarea
              className="min-h-32 w-full rounded-lg border border-[#2B3139] bg-[#0B0E11] px-3 py-2 text-white outline-none transition-all duration-200 focus:border-[#0ECB81] focus:ring-1 focus:ring-[#0ECB81]"
              id={field}
              onChange={(event) => setForm({ ...form, [field]: event.target.value })}
              required
              value={form[field]}
            />
          ) : (
            <input
              className="w-full rounded-lg border border-[#2B3139] bg-[#0B0E11] px-3 py-2 text-white outline-none transition-all duration-200 focus:border-[#0ECB81] focus:ring-1 focus:ring-[#0ECB81]"
              id={field}
              onChange={(event) => setForm({ ...form, [field]: event.target.value })}
              required
              type={field === 'email' ? 'email' : 'text'}
              value={form[field]}
            />
          )}
        </div>
      ))}
      <button
        className="glow-button flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0ECB81] to-[#00C896] px-5 py-3 font-medium text-white disabled:opacity-60"
        disabled={status === 'sending'}
        type="submit"
      >
        {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === 'sending' ? getTranslation(locale, 'common.sending') : getTranslation(locale, 'common.send')}
      </button>
      {status === 'sent' ? <p className="text-sm text-[#0ECB81]">{getTranslation(locale, 'contact.success')}</p> : null}
    </form>
  );
}
