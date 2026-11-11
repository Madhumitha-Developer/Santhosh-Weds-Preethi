import { useState } from 'react'
import { FaEnvelopeOpen, FaHeart } from 'react-icons/fa6'

export default function BeachIntro({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const [closed, setClosed] = useState(false)

  const handleOpen = () => {
    if (opening || closed) return
    setOpening(true)
    onOpen?.()
    setTimeout(() => {
      setClosed(true)
    }, 1000)
  }

  if (closed) return null

  return (
    <div
      role="dialog"
      aria-label="Wedding invitation cover"
      aria-modal="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-1000 ease-out ${
        opening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: `
          radial-gradient(circle at center, rgba(14, 30, 48, 0.45) 0%, rgba(10, 20, 32, 0.85) 100%),
          url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85') center/cover no-repeat
        `,
      }}
    >
      {/* Gentle beach shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-amber-900/30 pointer-events-none" />

      {/* Invitation Card */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center px-6 py-10 md:py-12 rounded-3xl bg-white/85 backdrop-blur-md border border-gold/40 shadow-2xl shadow-navy-900/50 flex flex-col items-center">
        {/* Subtle decorative top motif */}
        <div className="inline-flex items-center justify-center gap-2 mb-3 text-gold">
          <span className="w-8 h-px bg-gold/60" />
          <FaHeart className="text-sm text-rose-500 animate-pulse" />
          <span className="w-8 h-px bg-gold/60" />
        </div>

        <p className="font-cinzel text-xs md:text-sm tracking-[0.25em] text-slate-700 uppercase font-semibold">
          Wedding Invitation
        </p>

        {/* Couple Names */}
        <div className="my-5">
          <h1 className="font-script text-5xl md:text-6xl text-navy-900 leading-tight">
            Santhosh
          </h1>
          <div className="flex items-center justify-center gap-3 my-1">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-serif italic text-2xl text-sunset-700 font-bold">&amp;</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h1 className="font-script text-5xl md:text-6xl text-navy-900 leading-tight">
            Preethi
          </h1>
        </div>

        <p className="font-serif italic text-sm md:text-base text-slate-600 mb-8 max-w-xs">
          “Together with our families, we joyfully invite you to celebrate our special day.”
        </p>

        {/* Tap to Open Seal Button with glowing pulse effect */}
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Tap to open invitation"
          className="group relative flex flex-col items-center gap-3 cursor-pointer outline-none select-none transition-transform active:scale-95"
        >
          {/* Animated pulse rings */}
          <div className="relative w-20 h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border-2 border-gold/60 animate-ping opacity-60" />
            <span className="absolute -inset-1 rounded-full border border-gold/40 animate-pulse" />

            <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-tr from-amber-600 via-gold to-amber-400 text-white shadow-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 border-2 border-white/60">
              <FaEnvelopeOpen className="text-2xl md:text-3xl drop-shadow" />
            </div>
          </div>

          <span className="block font-cinzel text-xs tracking-[0.2em] uppercase font-bold text-navy-900 group-hover:text-sunset-700 transition-colors">
            Tap To Open
          </span>
        </button>
      </div>
    </div>
  )
}
