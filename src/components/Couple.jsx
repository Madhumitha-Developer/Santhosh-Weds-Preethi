import SectionHeading from './SectionHeading'
import { COUPLE } from '../lib/config'

function Card({ person }) {
  return (
    <div className="glass-card rounded-2xl p-6 text-center hover:border-gold/60 transition-all duration-300">
      <div className="w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-tr from-gold to-sunset-300 shadow-md mb-4">
        <img src={person.photo} alt={person.name} className="w-full h-full object-cover rounded-full" loading="lazy" />
      </div>
      <h3 className="font-cinzel text-lg md:text-xl font-bold text-navy-900">{person.name}</h3>
      <p className="text-sm text-sunset-700 font-serif italic mb-2">{person.role}</p>
      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{person.bio}</p>
    </div>
  )
}

export default function Couple() {
  return (
    <section className="py-14 space-y-8">
      <SectionHeading eyebrow="The Blessed Couple" title="Groom & Bride" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <Card person={COUPLE.groom} />
        <Card person={COUPLE.bride} />
      </div>
    </section>
  )
}
