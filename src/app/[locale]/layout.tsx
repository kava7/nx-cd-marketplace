import LocaleLayoutClient from './layout-client'

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return <LocaleLayoutClient locale={params.locale}>{children}</LocaleLayoutClient>
}
