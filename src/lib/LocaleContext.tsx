'use client'

import { createContext, useState, useCallback, type ReactNode } from 'react'
import zh from '../../locales/zh.json'
import en from '../../locales/en.json'

export type Locale = 'zh' | 'en'
export type LocaleDictionary = Record<string, string>

const dictionaries: Record<Locale, LocaleDictionary> = { zh, en }

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nxcd-locale')
      if (stored === 'zh' || stored === 'en') return stored
    }
    return 'zh'
  })

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('nxcd-locale', l)
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      return dictionaries[locale]?.[key] ?? key
    },
    [locale],
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}
