import { useEffect, useRef, useState } from 'react'
import { FaMusic, FaVolumeHigh, FaVolumeLow, FaVolumeXmark, FaPlus, FaMinus } from 'react-icons/fa6'
import { SONG_YOUTUBE_ID } from '../lib/config'

// Loads the YouTube IFrame API once and resolves with window.YT
let ytPromise
function loadYT() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!ytPromise) {
    ytPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        resolve(window.YT)
      }
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    })
  }
  return ytPromise
}

const INITIAL_VOLUME = 20   // start at 20 %
const STEP = 10             // ± 10 % per click

export default function MusicButton({ onToast }) {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [volume, setVolume] = useState(INITIAL_VOLUME)
  const hostRef = useRef(null)
  const playerRef = useRef(null)
  const wantPlay = useRef(false)

  useEffect(() => () => playerRef.current?.destroy?.(), [])

  const ensurePlayer = async () => {
    if (playerRef.current) return playerRef.current
    const YT = await loadYT()
    return new Promise((resolve) => {
      playerRef.current = new YT.Player(hostRef.current, {
        width: '1',
        height: '1',
        videoId: SONG_YOUTUBE_ID,
        playerVars: { playsinline: 1, controls: 0, loop: 1, playlist: SONG_YOUTUBE_ID, rel: 0 },
        events: {
          onReady: (e) => {
            e.target.setVolume(INITIAL_VOLUME)
            resolve(playerRef.current)
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true)
            if (e.data === YT.PlayerState.PAUSED) setPlaying(false)
          },
          onError: () => {
            setPlaying(false)
            onToast('Sorry, the song could not be played.')
          },
        },
      })
    })
  }

  const toggle = async () => {
    if (loading) return
    if (playing) {
      wantPlay.current = false
      playerRef.current?.pauseVideo()
      setPlaying(false)
      onToast('Music paused')
      return
    }
    setLoading(true)
    try {
      const player = await ensurePlayer()
      wantPlay.current = true
      player.setVolume(volume)
      player.playVideo()
      onToast('Playing our song 🎵')
    } catch {
      onToast('Could not load the music player.')
    } finally {
      setLoading(false)
    }
  }

  const changeVolume = (delta) => {
    const next = Math.min(100, Math.max(0, volume + delta))
    setVolume(next)
    playerRef.current?.setVolume(next)
    onToast(`Volume: ${next}%`)
  }

  // Pick the right icon based on volume level
  const VolumeIcon = volume === 0
    ? FaVolumeXmark
    : volume < 50
    ? FaVolumeLow
    : FaVolumeHigh

  return (
    <>
      {/* Hidden YouTube player (audio only) */}
      <div className="fixed bottom-0 left-0 w-px h-px overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
        <div ref={hostRef} />
      </div>

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
            <VolumeIcon className="text-lg animate-pulse" />
          ) : (
            <FaMusic className={`text-lg ${loading ? 'animate-pulse' : ''}`} />
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
