import { useEffect, useState } from 'react'
import './sectionnav.css'

const SECTIONS = [
  { id: 'hero', label: 'Welcome' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'scratch', label: 'The Date' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'nikah-day', label: 'Schedule' },
  { id: 'venue', label: 'Venue' },
  { id: 'festivities', label: 'Festivities' },
  { id: 'rsvp', label: 'RSVP' },
]

export default function SectionNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="section-nav" aria-label="Page sections">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`section-nav-dot ${active === s.id ? 'active' : ''}`}
          aria-label={s.label}
        >
          <span className="section-nav-tip">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}
