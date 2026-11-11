import { FaHeart, FaWhatsapp, FaRegCopy } from 'react-icons/fa6'

export default function Footer({ onToast }) {
  const shareWhatsApp = () => {
    const url = window.location.href
    const text = encodeURIComponent(
`With the blessings of our families,
we invite you to celebrate our special day. ❤️

Santhosh ♥️ Preethi

Holy Marriage
Monday, 7 December 2026 | 10:30 AM onwards

Grand Reception
Friday, 11 December 2026 | 6:00 PM onwards

📍 Muthumani Mahal, Tiruchirappalli

Join us, bless us & celebrate with us!

Open our invitation & send us your wishes:
${url}`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      onToast('Invitation link copied to clipboard!')
    } catch {
      onToast('Could not copy — please copy the link from the address bar.')
    }
  }

  return (
    <footer className="px-6 py-12 text-center space-y-6 bg-slate-900 text-slate-300 border-t border-gold/30">
      <div className="space-y-2">
        <FaHeart className="text-gold text-xs mx-auto" />
        <p className="font-serif italic text-lg md:text-2xl text-sunset-200">“Your presence will make our day more special…”</p>
        <p className="font-cinzel text-xs tracking-widest text-gold uppercase pt-1">#SanthoshWedsPreethi</p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95"
        >
          <FaWhatsapp className="text-base" /> Share Invite
        </button>
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-medium transition-all active:scale-95"
        >
          <FaRegCopy className="text-base" /> Copy Link
        </button>
      </div>

      <p className="text-[10px] sm:text-xs text-slate-500 tracking-wide pt-4 border-t border-slate-800">
        With Warm Regards &amp; Best Compliments From Family &amp; Relatives
      </p>
    </footer>
  )
}
