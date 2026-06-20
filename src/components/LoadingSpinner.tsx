'use client'

export function LoadingSpinner({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin" />
        <div className="absolute inset-2 border-2 border-transparent border-t-amber-400 rounded-full animate-spin animate-reverse" style={{ animationDirection: 'reverse', animationDuration: '0.6s' }} />
      </div>
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  )
}
