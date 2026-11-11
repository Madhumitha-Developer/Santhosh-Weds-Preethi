import { useCountdown } from '../hooks/useCountdown'
import { WEDDING_DATE } from '../lib/config'

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown() {
  const left = useCountdown(WEDDING_DATE)

  const units = left
    ? [
        ['Days', left.days],
        ['Hours', left.hours],
        ['Mins', left.minutes],
        ['Secs', left.seconds],
      ]
    : []

  return (
    <section className="relative z-30 -mt-10 px-5">
      <div className="glass-card rounded-2xl p-6 text-center max-w-xl mx-auto">
        <h3 className="font-cinzel text-xs uppercase tracking-widest text-sunset-800 font-semibold mb-4">
          Counting Down To The Big Day
        </h3>
        {left ? (
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {units.map(([label, value]) => (
              <div key={label} className="bg-white/90 p-3 md:p-4 rounded-xl border border-gold/20 shadow-sm">
                <span className="font-cinzel text-2xl md:text-4xl font-bold text-navy-900 block tabular-nums">
                  {pad(value)}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="font-cinzel text-lg font-bold text-sunset-700">The Wedding Day is Here! 🎉</div>
        )}
      </div>
    </section>
  )
}
