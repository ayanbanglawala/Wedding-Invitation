import { useRef } from 'react'
import gsap from 'gsap'
import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import OrnamentFrame from './OrnamentFrame.jsx'
import Magnetic from './Magnetic.jsx'
import GeoPattern from './GeoPattern.jsx'
import './venue.css'

export default function Venue() {
  const { name, address, mapQuery } = weddingData.venue
  const cardRef = useRef(null)

  function handleMove(e) {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card, { rotateY: px * 8, rotateX: -py * 8, duration: 0.4, ease: 'power2.out', transformPerspective: 600 })
  }
  function handleLeave() {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <section id="venue" style={{ background: 'var(--cream-50)', position: 'relative', overflow: 'hidden' }}>
      <GeoPattern id="venue" color="#59101c" opacity={0.05} />
      <Reveal as="p" className="eyebrow">The venue</Reveal>
      <Reveal delay={0.08}>
        <div
          ref={cardRef}
          className="venue-card"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <OrnamentFrame>
            <h3 className="script venue-name">{name}</h3>
            <p className="venue-address">{address}</p>
            <Magnetic
              as="a"
              className="venue-btn"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </Magnetic>
          </OrnamentFrame>
        </div>
      </Reveal>
    </section>
  )
}
