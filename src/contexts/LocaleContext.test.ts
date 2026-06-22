import { describe, expect, it } from 'vitest';

import { getTranslation } from './LocaleContext';

describe('getTranslation', () => {
  it('returns zh text by dot path', () => {
    expect(getTranslation('zh', 'nav.home')).toBe('首页');
  });

  it('returns en text by dot path', () => {
    expect(getTranslation('en', 'nav.home')).toBe('Home');
  });

  it('falls back to the key when the path is missing', () => {
    expect(getTranslation('en', 'missing.path')).toBe('missing.path');
  });
});
