import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import './countdown.css'

function getParts(target) {
  const left = Math.max(0, target - Date.now())
  return {
    d: Math.floor(left / 86400000),
    h: Math.floor((left % 86400000) / 3600000),
    m: Math.floor((left % 3600000) / 60000),
    s: Math.floor((left % 60000) / 1000),
  }
}

function Unit({ value, label, refEl }) {
  return (
    <div className="cd-unit">
      <span ref={refEl} className="cd-val">{String(value).padStart(2, '0')}</span>
      <span className="cd-name">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const target = new Date(weddingData.nikahDate).getTime()
  const [parts, setParts] = useState(getParts(target))
  const secRef = useRef(null)
  const lastS = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      const next = getParts(target)
      setParts(next)
      if (next.s !== lastS.current) {
        lastS.current = next.s
        gsap.fromTo(secRef.current, { scale: 1.18 }, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="countdown" className="cd-section">
      <Reveal as="p" className="cd-label">Until we say Qubool Hai</Reveal>
      <Reveal as="h2" delay={0.06} className="script cd-heading">Counting every heartbeat</Reveal>
      <Reveal delay={0.12} className="cd-units">
        <Unit value={parts.d} label="Days" />
        <Unit value={parts.h} label="Hours" />
        <Unit value={parts.m} label="Minutes" />
        <Unit value={parts.s} label="Seconds" refEl={secRef} />
      </Reveal>
    </section>
  )
}
