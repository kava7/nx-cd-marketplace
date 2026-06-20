export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
