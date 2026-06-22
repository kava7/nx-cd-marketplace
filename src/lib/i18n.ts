import en from '@/locales/en.json';
import zh from '@/locales/zh.json';
import type { Locale } from '@/types';

type Dictionary = typeof zh;

const dictionaries: Record<Locale, Dictionary> = { zh, en };

function readPath(source: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((current, part) => {
    if (current && typeof current === 'object' && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, source);
}

export function getTranslation(locale: Locale, key: string): string {
  const value = readPath(dictionaries[locale], key);
  return typeof value === 'string' ? value : key;
}
