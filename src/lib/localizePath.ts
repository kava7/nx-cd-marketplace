export function localizePath(path: string, locale: string): string {
  if (path === '/') return `/${locale}`
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean}`
}
