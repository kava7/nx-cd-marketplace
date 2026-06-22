'use client';

import { Lock, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import { localizePath, switchLocalePath } from '@/lib/paths';
import type { Locale } from '@/types';

import { LocaleLink } from './LocaleLink';

const navItems = [
  ['/', 'nav.home'],
  ['/indicators', 'nav.indicators'],
  ['/screener', 'nav.screener'],
  ['/alerts', 'nav.alerts'],
  ['/sector-strength', 'nav.sectorStrength'],
  ['/contact', 'nav.contact'],
] as const;

export function Navbar(): JSX.Element {
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLocale = (nextLocale: Locale): void => {
    setLocale(nextLocale);
    router.push(switchLocalePath(pathname, nextLocale));
  };

  const content = (
    <>
      {navItems.map(([href, key]) => {
        const localized = localizePath(href, locale);
        const active = pathname === localized || (href !== '/' && pathname.startsWith(localized));
        return (
          <LocaleLink
            className={`relative rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${active ? 'text-white' : 'text-[#848E9C] hover:text-white'}`}
            href={href}
            key={href}
          >
            {t(key)}
            {active ? <span className="absolute inset-x-1 bottom-0 h-0.5 rounded bg-[#0ECB81]" /> : null}
          </LocaleLink>
        );
      })}
      <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg px-3 py-2 text-sm text-[#848E9C] opacity-50">
        <Lock className="h-4 w-4" />
        {t('nav.quant')}
        <span className="rounded bg-[#FFB800]/20 px-1.5 py-0.5 text-[10px] text-[#FFB800]">{t('nav.comingSoon')}</span>
      </span>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#2B3139] bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <LocaleLink className="font-mono text-xl font-bold text-[#00F0FF]" href="/">
          {t('nav.brand')}
        </LocaleLink>
        <nav className="hidden items-center gap-1 lg:flex">{content}</nav>
        <div className="hidden items-center gap-2 lg:flex">
          {(['zh', 'en'] as const).map((item) => (
            <button
              className={`rounded-lg border px-3 py-1 text-sm ${locale === item ? 'border-[#0ECB81] text-[#0ECB81]' : 'border-[#2B3139] text-[#848E9C]'}`}
              key={item}
              onClick={() => handleLocale(item)}
              type="button"
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
        <button aria-label="导航菜单" className="rounded-lg p-2 text-white lg:hidden" onClick={() => setOpen(!open)} type="button">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-[#2B3139] bg-[#0B0E11] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">{content}</nav>
          <div className="mt-4 flex gap-2">
            {(['zh', 'en'] as const).map((item) => (
              <button className="rounded-lg border border-[#2B3139] px-3 py-2 text-sm" key={item} onClick={() => handleLocale(item)} type="button">
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
