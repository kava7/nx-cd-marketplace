'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import { localizePath } from '@/lib/paths';

export function LocaleLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}): JSX.Element {
  const { locale } = useLocale();
  return (
    <Link className={className} href={localizePath(href, locale)}>
      {children}
    </Link>
  );
}
