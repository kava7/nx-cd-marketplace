import { describe, expect, it } from 'vitest';

import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formats Chinese prices with yuan symbol', () => {
    expect(formatPrice(49, 'zh')).toBe('¥49');
  });

  it('formats English prices with dollar symbol', () => {
    expect(formatPrice(49, 'en')).toBe('$49');
  });

  it('keeps decimal subscription prices readable', () => {
    expect(formatPrice(9.9, 'en')).toBe('$9.9');
  });
});
