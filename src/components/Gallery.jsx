import { useEffect, useState } from 'react'
import SectionHeading from './SectionHeading'
import { GALLERY } from '../lib/config'

export default function Gallery() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="py-12 space-y-6">
      <SectionHeading eyebrow="Moments of Love" title="Photo Gallery" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {GALLERY.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpen(p)}
            className="relative rounded-xl overflow-hidden aspect-square border border-gold/30 shadow-md group"
            aria-label={`Open ${p.alt}`}
          >
            <img
              src={p.thumb}
              alt={p.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setOpen(null)}
        >
          <img src={open.full} alt={open.alt} className="max-w-full max-h-[88vh] rounded-lg shadow-2xl object-contain" />
        </div>
      )}
    </section>
  )
}
