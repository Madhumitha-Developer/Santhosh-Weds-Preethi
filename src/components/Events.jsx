import { FaRing, FaChampagneGlasses, FaRegCalendarCheck, FaLocationDot, FaDiamondTurnRight, FaRegCalendarPlus } from 'react-icons/fa6'
import SectionHeading from './SectionHeading'
import { EVENTS } from '../lib/config'
import { openGoogleCalendar } from '../lib/calendar'

const ICONS = { ring: FaRing, cheers: FaChampagneGlasses }

function EventCard({ event }) {
  const Icon = ICONS[event.icon]
  return (
    <article className={`glass-card rounded-2xl p-6 border-l-4 ${event.accent} flex flex-col gap-4`}>
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sunset-100 text-sunset-700 flex items-center justify-center text-lg">
            <Icon />
          </div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-navy-900">{event.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{event.subtitle}</p>
          </div>
        </div>
        <span className="bg-sunset-100 text-sunset-800 text-[11px] font-cinzel font-semibold px-2.5 py-1 rounded-full border border-sunset-200">
          {event.badge}
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-700 flex-1">
        <div className="flex items-start gap-3">
          <FaRegCalendarCheck className="text-sunset-600 mt-1 w-4 shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">{event.dateLabel}</p>
            <p className="text-slate-500">{event.timeLabel}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaLocationDot className="text-sunset-600 mt-1 w-4 shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">{event.venue}</p>
            <p className="text-slate-600 leading-relaxed">{event.address}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-navy-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95"
        >
          <FaDiamondTurnRight className="text-gold" />
          <span>Get Location</span>
        </a>
        <button
          type="button"
          onClick={() => openGoogleCalendar(event)}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-50 border border-gold/40 text-slate-800 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95"
        >
          <FaRegCalendarPlus className="text-sunset-700" />
          <span>Add Calendar</span>
        </button>
      </div>
    </article>
  )
}

export default function Events() {
  return (
    <section id="events" className="py-12 space-y-8 scroll-mt-4">
      <SectionHeading eyebrow="Celebration Details" title="Wedding Events" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {EVENTS.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  )
}
