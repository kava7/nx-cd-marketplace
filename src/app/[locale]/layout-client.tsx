'use client'

import { useEffect, type ReactNode } from 'react'
import { useLocale } from '@/lib/useLocale'
import { Navbar } from '@/components/Navbar'

export default function LocaleLayoutClient({
  children,
  locale,
}: {
  children: ReactNode
  locale: string
}) {
  const { setLocale } = useLocale()

  useEffect(() => {
    setLocale(locale as 'zh' | 'en')
  }, [locale, setLocale])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        <p>© 2024 NX/CD Marketplace. All rights reserved.</p>
      </footer>
    </>
  )
}
