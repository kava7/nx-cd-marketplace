import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, render, screen } from '@testing-library/react'
import { useLocale } from '../useLocale'
import { LocaleProvider } from '../LocaleContext'
import { localizePath } from '../localizePath'
import { LocaleLink } from '../../components/LocaleLink'

describe('LocaleContext', () => {
  it('provides locale, setLocale, and t function', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })

    expect(result.current.locale).toBeDefined()
    expect(typeof result.current.setLocale).toBe('function')
    expect(typeof result.current.t).toBe('function')
  })

  it('defaults to Chinese locale', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })

    expect(result.current.locale).toBe('zh')
  })

  it('t() returns correct Chinese translation', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })

    expect(result.current.t('nav.home')).toBe('首页')
    expect(result.current.t('home.hero.title')).toBe('精准捕捉每一次抄底机会')
    expect(result.current.t('shop.title')).toBe('指标商城')
  })

  it('t() returns key when translation is missing', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })

    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key')
  })

  it('switches locale and updates translations', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })

    act(() => {
      result.current.setLocale('en')
    })

    expect(result.current.locale).toBe('en')
    expect(result.current.t('nav.home')).toBe('Home')
    expect(result.current.t('home.hero.title')).toBe('Catch Every Bottom-Fishing Opportunity')
  })

  it('persists locale to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })

    act(() => {
      result.current.setLocale('en')
    })

    expect(setItemSpy).toHaveBeenCalledWith('nxcd-locale', 'en')
    setItemSpy.mockRestore()
  })
})

describe('useLocale', () => {
  it('throws when used outside LocaleProvider', () => {
    expect(() => {
      renderHook(() => useLocale())
    }).toThrow('useLocale must be used within a LocaleProvider')
  })
})

describe('localizePath', () => {
  it('prepends locale to path', () => {
    expect(localizePath('/', 'zh')).toBe('/zh')
    expect(localizePath('/shop', 'en')).toBe('/en/shop')
    expect(localizePath('/store/nx-cd', 'zh')).toBe('/zh/store/nx-cd')
    expect(localizePath('/contact', 'en')).toBe('/en/contact')
  })
})

describe('LocaleLink', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders a link with locale-prefixed href', () => {
    render(
      <LocaleProvider>
        <LocaleLink href="/shop">Shop</LocaleLink>
      </LocaleProvider>,
    )

    const link = screen.getByRole('link', { name: 'Shop' })
    expect(link).toBeDefined()
    expect(link.getAttribute('href')).toBe('/zh/shop')
  })
})
