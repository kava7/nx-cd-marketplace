export function generateStaticParams() {
  return [{ id: 'placeholder' }]
}

export default function ProductDetailPage({ params: { locale, id } }: { params: { locale: string; id: string } }) {
  const title = locale === 'zh' ? '商品详情' : 'Product Details'
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-white">
      <h1 className="text-4xl font-bold">{title} — {id}</h1>
    </div>
  )
}
