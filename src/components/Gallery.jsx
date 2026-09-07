import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import Divider from './Divider.jsx'
import './gallery.css'

gsap.registerPlugin(ScrollTrigger)

const HEART_PATH = 'M50 74C20 54 8 38 8 24 8 12 18 4 28 4 38 4 46 10 50 18 54 10 62 4 72 4 82 4 92 12 92 24 92 38 80 54 50 74Z'

export default function Gallery() {
  const slides = weddingData.gallery
  const [index, setIndex] = useState(0)
  const slideRefs = useRef([])
  const wrapRef = useRef(null)
  const timerRef = useRef(null)
  const touchXRef = useRef(null)

  function goTo(next) {
    const target = (next + slides.length) % slides.length
    if (target === index) return
    const current = slideRefs.current[index]
    const incoming = slideRefs.current[target]
    const dir = target > index || (index === slides.length - 1 && target === 0) ? 1 : -1
    gsap.set(incoming, { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', opacity: 1, zIndex: 2 })
    gsap.set(current, { zIndex: 1 })
    gsap.to(incoming, { clipPath: 'inset(0 0% 0 0%)', duration: 0.7, ease: 'power3.inOut' })
    setIndex(target)
  }

  function stop() { clearInterval(timerRef.current) }
  function auto() { timerRef.current = setInterval(() => goTo(index + 1), 4200) }

  useEffect(() => {
    auto()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  useEffect(() => {
    const el = wrapRef.current
    gsap.set(el, { opacity: 0, y: 26 })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }),
    })
    return () => trigger.kill()
  }, [])

  return (
    <section id="gallery" style={{ background: 'var(--cream-50)', textAlign: 'center' }}>
      <Reveal as="h2" className="script" style={{ fontSize: 32, color: 'var(--maroon-800)', marginBottom: 4 }}>
        Moments, softly held
      </Reveal>
      <Divider />
      <div
        ref={wrapRef}
        className="gal-wrap"
        onTouchStart={(e) => { touchXRef.current = e.touches[0].clientX; stop() }}
        onTouchEnd={(e) => {
          if (touchXRef.current === null) return
          const dx = e.changedTouches[0].clientX - touchXRef.current
          if (dx < -40) goTo(index + 1)
          if (dx > 40) goTo(index - 1)
          touchXRef.current = null
          auto()
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className="gal-slide"
            style={{ clipPath: i === 0 ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', zIndex: i === 0 ? 2 : 1 }}
          >
            <div className="gal-frame" />
            <svg viewBox="0 0 100 100"><path d={HEART_PATH} fill="none" stroke="#e6c988" strokeWidth="2.5" /></svg>
            <p>{s.caption}</p>
          </div>
        ))}
      </div>
      <div className="gal-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === index ? 'active' : ''}
            onClick={() => { goTo(i); stop(); auto() }}
            aria-label={`Show photo ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
