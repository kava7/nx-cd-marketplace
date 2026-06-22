'use client';

import { useLocale } from '@/contexts/LocaleContext';

export function Footer(): JSX.Element {
  const { t } = useLocale();
  return (
    <footer className="mt-auto border-t border-[#2B3139] bg-[#1E2329]">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-[#848E9C]">
        © {new Date().getFullYear()} {t('footer.copyright')} ·{' '}
        <a className="text-[#00F0FF] hover:underline" href="https://discord.gg/nxcd">
          {t('footer.discord')}
        </a>{' '}
        ·{' '}
        <a className="text-[#00F0FF] hover:underline" href="mailto:support@nxcduk.com">
          support@nxcduk.com
        </a>
      </div>
    </footer>
  );
}
