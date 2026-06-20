import { describe, it, expect } from 'vitest'
import { formatPrice } from '../formatPrice'

describe('formatPrice', () => {
  it('formats USD in Chinese locale', () => {
    expect(formatPrice(49, 'zh')).toBe('¥353')
    expect(formatPrice(29.9, 'zh')).toBe('¥215')
    expect(formatPrice(0, 'zh')).toBe('¥0')
  })

  it('formats USD in English locale', () => {
    expect(formatPrice(49, 'en')).toBe('$49')
    expect(formatPrice(29.9, 'en')).toBe('$29.9')
    expect(formatPrice(0, 'en')).toBe('$0')
  })

  it('rounds CNY conversion to nearest integer', () => {
    expect(formatPrice(10, 'zh')).toBe('¥72')
    expect(formatPrice(1.5, 'zh')).toBe('¥11')
  })

  it('handles large numbers', () => {
    expect(formatPrice(999.99, 'en')).toBe('$999.99')
    expect(formatPrice(999.99, 'zh')).toBe('¥7200')
  })
})
