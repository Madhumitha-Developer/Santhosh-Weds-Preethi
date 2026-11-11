import { FaCircleCheck } from 'react-icons/fa6'

export default function Toast({ message }) {
  if (!message) return null
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] max-w-[90vw] flex items-center gap-2 bg-slate-900 text-white border border-gold/40 px-5 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-medium animate-fade-in"
    >
      <FaCircleCheck className="text-emerald-400 text-sm shrink-0" />
      <span>{message}</span>
    </div>
  )
}
