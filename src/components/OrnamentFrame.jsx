import './ornamentframe.css'

// Wraps a card/panel with four hand-drawn-feel corner flourishes — the
// signature framing device used on the hero medallion, venue card and
// RSVP panel, echoing traditional nikah-card border work without a
// literal illustration.
export default function OrnamentFrame({ children, className = '', tone = 'gold' }) {
  return (
    <div className={`ornament-frame ornament-${tone} ${className}`}>
      <Corner className="corner-tl" />
      <Corner className="corner-tr" />
      <Corner className="corner-bl" />
      <Corner className="corner-br" />
      <div className="ornament-inner">{children}</div>
    </div>
  )
}

function Corner({ className }) {
  return (
    <svg className={`ornament-corner ${className}`} viewBox="0 0 48 48" fill="none">
      <path d="M2 2 L2 20 M2 2 L20 2" strokeWidth="1.2" />
      <path d="M2 2 C 14 2, 14 14, 26 14" strokeWidth="1" />
      <circle cx="26" cy="14" r="2" />
    </svg>
  )
}
