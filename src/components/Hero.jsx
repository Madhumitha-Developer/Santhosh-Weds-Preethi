import { FaHeart, FaLeaf, FaChevronDown } from 'react-icons/fa6'

export default function Hero() {
  return (
    <header className="relative min-h-[92vh] flex flex-col justify-between items-center text-center px-6 py-10 hero-bg overflow-hidden">
      {/* Top emblem */}
      <div className="pt-6 animate-fade-in">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 border border-gold/30 shadow-sm mb-2">
          <FaHeart className="text-lg text-rose-500" />
        </div>
        <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] text-slate-700 uppercase font-cinzel font-semibold">
          <span className="w-6 h-px bg-gold" />
          <span>Save The Date</span>
          <span className="w-6 h-px bg-gold" />
        </div>
      </div>

      {/* Names */}
      <div className="my-auto py-6 space-y-4 z-10">
        <p className="font-cinzel text-xs md:text-sm tracking-[0.2em] text-slate-800 uppercase font-medium">
          Together With Our Families
          <br />
          <span className="tracking-normal normal-case font-serif italic text-base md:text-xl text-slate-600">
            We cordially invite you to the wedding of
          </span>
        </p>

        <div className="py-2 space-y-1">
          <h1 className="font-script text-6xl md:text-8xl text-navy-900 drop-shadow-sm leading-tight">Santhosh P</h1>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-serif italic text-2xl md:text-3xl text-sunset-700 font-semibold">&amp;</span>
            <span className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h1 className="font-script text-6xl md:text-8xl text-navy-900 drop-shadow-sm leading-tight">Preethi R</h1>
        </div>

        <p className="font-serif italic text-base md:text-xl text-slate-700 max-w-xs md:max-w-md mx-auto leading-relaxed pt-2">
          “Two hearts, one faith,
          <br />a journey together with God’s blessings…”
        </p>

        <div className="pt-2 text-gold flex items-center justify-center gap-1">
          <FaLeaf className="text-sm rotate-45" />
          <span className="w-1 h-1 rounded-full bg-gold" />
          <FaLeaf className="text-sm -rotate-45" />
        </div>
      </div>

      <a
        href="#events"
        className="pb-4 z-10 animate-bounce text-slate-600 hover:text-sunset-700 text-xs tracking-widest uppercase font-cinzel flex flex-col items-center gap-1"
      >
        <span>Explore Details</span>
        <FaChevronDown className="text-sm" />
      </a>
    </header>
  )
}
