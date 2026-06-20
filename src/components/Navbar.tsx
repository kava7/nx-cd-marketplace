'use client'

import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/lib/useLocale'
import { LocaleLink } from '@/components/LocaleLink'

const links = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.shop', href: '/shop' },
  { key: 'nav.screener', href: '/screener' },
  { key: 'nav.alerts', href: '/alerts' },
  { key: 'nav.quant', href: '/quant' },
  { key: 'nav.contact', href: '/contact' },
] as const

export function Navbar() {
  const { locale, setLocale, t } = useLocale()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const normalizedPath = pathname.replace(/\/$/, '')
  const segments = normalizedPath.split('/')
  const currentRoute = segments[2] || '/'

  const isActive = (href: string) => {
    if (href === '/') return currentRoute === '/'
    return currentRoute === href.slice(1)
  }

  const toggleLanguage = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh'
    setLocale(newLocale)
    const rest = pathname.replace(/^\/[^/]+/, '') || '/'
    window.location.href = `/${newLocale}${rest}`
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <LocaleLink
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-[#0ECB81] to-[#089e64] bg-clip-text text-transparent"
          >
            NX/CD
          </LocaleLink>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <LocaleLink
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t(link.key)}
              </LocaleLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
            >
              {t('nav.language')}
            </button>

            <button className="text-gray-400 hover:text-white transition-colors relative" aria-label={t('nav.cart')}>
              <ShoppingCart size={20} />
            </button>

            <button
              className="md:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B0E11]">
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <LocaleLink
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </LocaleLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
