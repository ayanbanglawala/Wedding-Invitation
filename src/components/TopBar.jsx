import { useRef, useState } from 'react'
import './topbar.css'

const MUSIC_SRC = '/wedding.mp3'

export default function TopBar() {
  const [playing, setPlaying] = useState(true)
  const audioRef = useRef(null)

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="topbar">
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        autoPlay
        preload="auto"
      />

      <button
        className="mute-btn"
        aria-label={playing ? 'Pause music' : 'Play music'}
        onClick={toggle}
      >
        {playing ? '❚❚' : '♪'}
      </button>
    </div>
  )
}