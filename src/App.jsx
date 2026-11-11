import { useCallback, useEffect, useRef, useState } from 'react'
import PetalCanvas from './components/PetalCanvas'
import MusicButton from './components/MusicButton'
import Toast from './components/Toast'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Couple from './components/Couple'
import Events from './components/Events'
import Gallery from './components/Gallery'
import RsvpWishes from './components/RsvpWishes'
import Footer from './components/Footer'

export default function App() {
  const [toast, setToast] = useState('')
  const timer = useRef(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 4000)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <div className="min-h-screen bg-sunset-50 relative">
      <PetalCanvas />
      <MusicButton onToast={showToast} />
      <Toast message={toast} />

      <Hero />
      <Countdown />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-5 md:px-8">
        <Couple />
        <Events />
        <Gallery />
        <RsvpWishes onToast={showToast} />
      </main>

      <Footer onToast={showToast} />
    </div>
  )
}
