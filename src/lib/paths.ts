import type { Locale } from '@/types';

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized === '/' ? '' : normalized}`;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return pathname.replace(/^\/(zh|en)/, `/${locale}`);
}
