'use client';

import { Mail, MessageCircle } from 'lucide-react';

import { ContactForm } from '@/components/ContactForm';
import { useLocale } from '@/contexts/LocaleContext';
import { sendDiscordWebhook } from '@/lib/discord';

export function ContactPageClient(): JSX.Element {
  const { locale, t } = useLocale();
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">{t('contact.title')}</h1>
      <p className="mt-3 text-[#848E9C]">{t('contact.subtitle')}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ContactForm
          locale={locale}
          onSubmit={(payload) => sendDiscordWebhook(`Contact: ${payload.name} <${payload.email}> ${payload.message}`).then(() => undefined)}
        />
        <aside className="space-y-6">
          <div className="rounded-xl border border-[#2B3139] bg-[#1E2329] p-6">
            <MessageCircle className="h-8 w-8 text-[#00F0FF]" />
            <h2 className="mt-4 text-xl font-semibold text-white">{t('contact.discord')}</h2>
            <p className="mt-2 text-[#848E9C]">{t('contact.discordCopy')}</p>
            <a className="mt-4 inline-block text-[#00F0FF]" href="https://discord.gg/nxcd">
              https://discord.gg/nxcd
            </a>
          </div>
          <div className="rounded-xl border border-[#2B3139] bg-[#1E2329] p-6">
            <Mail className="h-8 w-8 text-[#0ECB81]" />
            <p className="mt-4 text-white">support@nxcduk.com</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
