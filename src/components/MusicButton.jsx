import { useEffect, useRef, useState } from 'react'
import { FaMusic, FaVolumeHigh, FaVolumeLow, FaVolumeXmark, FaPlus, FaMinus } from 'react-icons/fa6'

const INITIAL_VOLUME = 20 // 20%
const STEP = 10 // ±10%

export default function MusicButton({ onToast }) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(INITIAL_VOLUME)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = INITIAL_VOLUME / 100

    let started = false

    const removeListeners = () => {
      const events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown']
      events.forEach((ev) => {
        window.removeEventListener(ev, tryPlay, { capture: true })
        document.removeEventListener(ev, tryPlay, { capture: true })
      })
    }

    const tryPlay = () => {
      if (started) return
      if (!audio) return

      audio.volume = volume / 100
      const p = audio.play()
      if (p !== undefined) {
        p.then(() => {
          started = true
          setPlaying(true)
          removeListeners()
        }).catch(() => {
          // Autoplay blocked by browser policy; keep listeners active for first user tap/click
        })
      }
    }

    const events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown']
    events.forEach((ev) => {
      window.addEventListener(ev, tryPlay, { capture: true, passive: true })
      document.addEventListener(ev, tryPlay, { capture: true, passive: true })
    })

    // Attempt autoplay immediately on mount
    tryPlay()

    return () => {
      removeListeners()
    }
  }, [volume])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      onToast('Music paused')
    } else {
      audio.volume = volume / 100
      audio
        .play()
        .then(() => {
          setPlaying(true)
          onToast('Playing our song 🎵')
        })
        .catch(() => {
          onToast('Could not play music')
        })
    }
  }

  const changeVolume = (delta) => {
    const next = Math.min(100, Math.max(0, volume + delta))
    setVolume(next)
    if (audioRef.current) {
      audioRef.current.volume = next / 100
    }
    onToast(`Volume: ${next}%`)
  }

  const VolumeIcon =
    volume === 0 ? FaVolumeXmark : volume < 50 ? FaVolumeLow : FaVolumeHigh

  return (
    <>
      <audio
        ref={audioRef}
        src="/wedding-song.mp3"
        autoPlay
        playsInline
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Vertical control stack — fixed bottom-right */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-2">
        {/* Volume Up */}
        <button
          onClick={() => changeVolume(STEP)}
          aria-label="Increase volume"
          title="Increase volume"
          className="w-10 h-10 rounded-full bg-white/90 shadow-md border border-gold/40 text-sunset-700 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-sunset-100"
        >
          <FaPlus className="text-sm" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
          title={playing ? 'Pause music' : 'Play music'}
          className="w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gold/40 text-sunset-700 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {playing ? (
            <VolumeIcon className="text-lg animate-pulse text-sunset-600" />
          ) : (
            <FaMusic className="text-lg animate-bounce text-sunset-700" />
          )}
        </button>

        {/* Volume Down */}
        <button
          onClick={() => changeVolume(-STEP)}
          aria-label="Decrease volume"
          title="Decrease volume"
          className="w-10 h-10 rounded-full bg-white/90 shadow-md border border-gold/40 text-sunset-700 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-sunset-100"
        >
          <FaMinus className="text-sm" />
        </button>
      </div>
    </>
  )
}
