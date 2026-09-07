import { useState } from 'react'
import './topbar.css'

export default function TopBar() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="topbar">
      <button
        className="mute-btn"
        aria-label="Toggle music"
        onClick={() => setPlaying((p) => !p)}
      >
        {playing ? '❚❚' : '♪'}
      </button>
    </div>
  )
}
