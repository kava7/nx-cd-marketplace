export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const title = locale === 'zh' ? '联系我们' : 'Contact Us'
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-white">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  )
}
