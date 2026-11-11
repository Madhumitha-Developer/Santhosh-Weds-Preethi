import { useRef, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa6'
import { useWishes } from '../hooks/useWishes'
import { isSupabaseConfigured } from '../lib/supabase'

const EMPTY = { name: '', message: '' }
const COOLDOWN_MS = 15000

export default function RsvpWishes({ onToast }) {
  const { wishes, loading, error, addWish } = useWishes()
  const [form, setForm] = useState(EMPTY)
  const [sending, setSending] = useState(false)
  const [honeypot, setHoneypot] = useState('') // bots fill this, humans never see it
  const lastSent = useRef(0)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (honeypot) return
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      onToast('Please wait a few seconds before sending another wish.')
      return
    }
    setSending(true)
    const res = await addWish(form)
    setSending(false)
    if (res.ok) {
      lastSent.current = Date.now()
      setForm(EMPTY)
      onToast('Thank you! Your blessings have been sent to Santhosh & Preethi ❤️')
    } else {
      console.error(res.error)
      onToast('Sorry, something went wrong. Please try again.')
    }
  }

  return (
    <section className="py-12">
      <div className="glass-card rounded-2xl p-6 md:p-10 border border-gold/30">
        <div className="text-center space-y-1 mb-8">
          <span className="section-eyebrow">Join The Joy</span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy-900">Send Your Blessings</h2>
          <p className="text-xs md:text-sm text-slate-600">Your warm presence &amp; wishes mean the world to us!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Form */}
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="field-label" htmlFor="guestName">Your Full Name</label>
              <input
                id="guestName"
                required
                maxLength={80}
                value={form.name}
                onChange={set('name')}
                placeholder="e.g. Anand Kumar"
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="message">Warm Wishes / Message</label>
              <textarea
                id="message"
                required
                rows={4}
                maxLength={500}
                value={form.message}
                onChange={set('message')}
                placeholder="Write your blessings for Santhosh & Preethi..."
                className="field-input"
              />
              <p className="text-[10px] text-slate-400 text-right mt-0.5">{form.message.length}/500</p>
            </div>

            {/* honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] opacity-0 h-0 w-0"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-gradient-to-r from-sunset-700 to-sunset-800 hover:from-sunset-800 hover:to-sunset-900 disabled:opacity-60 text-white font-cinzel font-semibold text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <FaPaperPlane />
              {sending ? 'Sending…' : 'Send Blessings'}
            </button>

            {!isSupabaseConfigured && (
              <p className="text-[11px] text-amber-700 text-center">
                Preview mode — Supabase isn’t configured, so wishes aren’t saved.
              </p>
            )}
          </form>

          {/* Wishes list */}
          <div>
            <h4 className="font-cinzel text-xs uppercase font-semibold text-slate-700 mb-3 text-center md:text-left">
              Recent Warm Wishes
            </h4>
            <div className="space-y-2.5 max-h-80 md:max-h-[26rem] overflow-y-auto pr-1">
              {loading && <p className="text-xs text-slate-500 text-center py-6">Loading wishes…</p>}
              {error && <p className="text-xs text-rose-600 text-center py-6">{error}</p>}
              {!loading && !error && wishes.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-6">Be the first to send your blessings 💛</p>
              )}
              {wishes.map((w) => (
                <div key={w.id} className="p-3 rounded-xl bg-white/80 border border-gold/20 text-sm space-y-1 animate-fade-in">
                  <div className="flex justify-between items-center gap-2 font-semibold text-navy-900">
                    <span className="truncate">{w.name}</span>
                  </div>
                  <p className="text-slate-600 italic break-words whitespace-pre-line">“{w.message}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
