'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export function Toast({
  message,
  type,
  onClose,
  duration = 3000,
}: {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10)
    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [duration, onClose])

  const isSuccess = type === 'success'

  return (
    <div
      className={`fixed top-4 right-4 z-[200] flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${
        isSuccess
          ? 'bg-[#0ECB81]/10 border-[#0ECB81]/30 text-[#0ECB81]'
          : 'bg-[#F6465D]/10 border-[#F6465D]/30 text-[#F6465D]'
      }`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }} className="opacity-60 hover:opacity-100 transition-opacity" aria-label="Close">
        <X size={16} />
      </button>
    </div>
  )
}
