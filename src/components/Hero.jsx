import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import weddingData from '../weddingData.js'
import Divider from './Divider.jsx'
import './hero.css'

gsap.registerPlugin(ScrollTrigger)

// Splits text into individual <span> letters so GSAP can stagger them —
// used for the two names, the kinetic-typography "signature moment" of
// the page (see hero.css / heroTimeline for the choreography).
function KineticWord({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {[...text].map((ch, i) => (
        <span className="kinetic-letter" key={i} style={{ display: 'inline-block' }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero({ playIntro }) {
  const bgRef = useRef(null)
  const rootRef = useRef(null)
  const dustRef = useRef(null)

  useEffect(() => {
    gsap.to(bgRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, [])

  // ambient drifting gold flecks — echoes the curtain's dust, gives the
  // hero continuous quiet motion instead of a static gradient
  useEffect(() => {
    const canvas = dustRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h, particles = []

    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      particles = Array.from({ length: 34 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        s: Math.random() * 0.22 + 0.05,
        o: Math.random() * 0.4 + 0.1,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    function loop() {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#e6c988'
      particles.forEach((p) => {
        p.y -= p.s
        p.x += Math.sin(p.y * 0.015) * 0.12
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w }
        ctx.globalAlpha = p.o
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    if (!playIntro) return
    const letters = rootRef.current.querySelectorAll('.kinetic-letter')
    const rest = rootRef.current.querySelectorAll('.hero-fade')
    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo(letters,
      { opacity: 0, y: 22, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', stagger: 0.035 }
    ).fromTo(rest,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
      '-=0.3'
    )
  }, [playIntro])

  return (
    <section id="hero" ref={rootRef} className="hero">
      <div ref={bgRef} className="hero-bg">
        <svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="heroGlow" cx="50%" cy="25%" r="60%">
              <stop offset="0%" stopColor="#791522" />
              <stop offset="60%" stopColor="#3a0a12" />
              <stop offset="100%" stopColor="#170304" />
            </radialGradient>
          </defs>
          <rect width="400" height="800" fill="url(#heroGlow)" />
        </svg>
      </div>
      <canvas ref={dustRef} className="hero-dust" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-arabic hero-fade">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <Divider tone="dark" />
        <p className="hero-req hero-fade">
          We request the honour of your<br />presence at the Rukhsati and Walima day of
        </p>

        <h2 className="hero-name"><KineticWord text={weddingData.couple.brideFull} /></h2>
        <p className="hero-rel hero-fade">Daughter of</p>
        <p className="hero-parents hero-fade">{weddingData.couple.brideParents}</p>

        <p className="hero-amp script hero-fade">&amp;</p>

        <h2 className="hero-name"><KineticWord text={weddingData.couple.groomFull} /></h2>
        <p className="hero-rel hero-fade">Son of</p>
        <p className="hero-parents hero-fade">{weddingData.couple.groomParents}</p>

        <p className="hero-tagline hero-fade">As they begin their forever in faith and love.</p>
      </div>

      <div className="hero-scrollcue">
        <span className="hero-scrolltxt">Scroll</span>
        <span className="hero-scrollbar" />
      </div>
    </section>
  )
}
