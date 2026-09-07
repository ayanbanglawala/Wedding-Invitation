import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import './timeline.css'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const items = weddingData.timeline
  const pathRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: wrapRef.current, start: 'top 65%' },
    })
  }, [])

  return (
    <section id="nikah-day" style={{ background: 'var(--cream-50)' }}>
      <Reveal as="p" className="eyebrow">The celebration</Reveal>
      <Reveal as="h2" delay={0.06} className="script" style={{ textAlign: 'center', fontSize: 32, color: 'var(--maroon-800)', marginBottom: 34 }}>
        Our Rukhsati and Walima day
      </Reveal>
      <div ref={wrapRef} className="tl-wrap">
        <svg className="tl-svg" viewBox="0 0 20 400" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M10 0 C 4 40, 16 80, 10 120 S 4 200, 10 240 S 16 320, 10 400"
            stroke="var(--gold-400)"
            strokeWidth="1.4"
            fill="none"
            opacity="0.7"
          />
        </svg>
        {items.map((item, i) => (
          <Reveal as="div" key={i} delay={i * 0.06} className="tl-item">
            <span className="tl-dot" />
            <p className="tl-time">{item.time}</p>
            <p className="tl-title">{item.title}</p>
            {item.note && <p className="tl-note">{item.note}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
