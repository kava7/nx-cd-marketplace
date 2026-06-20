import DetailClient from './detail-client'
import productsRaw from '@/data/products.json'
import type { Product } from '@/types'

const products = productsRaw as Product[]

export function generateStaticParams() {
  const ids = products.map((p) => p.id)
  const params: { locale: string; id: string }[] = []
  for (const id of ids) {
    params.push({ locale: 'zh', id })
    params.push({ locale: 'en', id })
  }
  return params
}

export default function Page() {
  return <DetailClient />
}
