import Link from 'next/link'

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D1117] text-white gap-8">
      <h1 className="text-5xl font-bold tracking-tight">NX/CD</h1>
      <p className="text-lg text-gray-400">Stock Indicator Marketplace</p>
      <div className="flex gap-4">
        <Link
          href="/zh"
          className="px-8 py-3 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-lg font-medium"
        >
          中文
        </Link>
        <Link
          href="/en"
          className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-lg font-medium"
        >
          English
        </Link>
      </div>
    </div>
  )
}
