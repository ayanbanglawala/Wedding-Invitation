import { useRef, useState } from 'react'
import './topbar.css'

// Put your audio file in the `public` folder (e.g. public/music.mp3) and
// point this at it with a leading slash — Vite serves public/ from the
// site root, so no import is needed.
const MUSIC_SRC = '/wedding.mp3'
export default function TopBar() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {
        // Autoplay/interaction restrictions can reject this in some
        // browsers — the button just stays in its current state.
      })
    }
    setPlaying((p) => !p)
  }

  return (
    <div className="topbar">
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" />
      <button
        className="mute-btn"
        aria-label="Toggle music"
        onClick={toggle}
      >
        {playing ? '❚❚' : '♪'}
      </button>
    </div>
  )
}