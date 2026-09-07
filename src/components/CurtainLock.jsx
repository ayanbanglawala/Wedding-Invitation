import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import weddingData from '../weddingData.js'
import './curtainlock.css'

gsap.registerPlugin(ScrollTrigger)

export default function CurtainLock({ onOpen }) {
  const rootRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const contentRef = useRef(null)
  const chandelierRef = useRef(null)
  const dustCanvasRef = useRef(null)

  // gold dust drifting behind the curtain — a quiet ambient detail while
  // the guest is looking at the lock screen, cheap enough to run on canvas
  useEffect(() => {
    const canvas = dustCanvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []
    let w, h

    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      particles = Array.from({ length: 46 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        s: Math.random() * 0.3 + 0.08,
        o: Math.random() * 0.5 + 0.15,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    function loop() {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#e6c988'
      particles.forEach((p) => {
        p.y -= p.s
        p.x += Math.sin(p.y * 0.02) * 0.15
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
    gsap.to(chandelierRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', delay: 0.3 })
  }, [])

  function handleOpen() {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => onOpen(),
    })
    tl.to(contentRef.current, { autoAlpha: 0, duration: 0.4 })
      .to(chandelierRef.current, { y: -24, duration: 0.6, ease: 'power2.in' }, '-=0.1')
      .to(leftRef.current, { xPercent: -100, skewY: -2.5, duration: 1.3 }, 0.1)
      .to(rightRef.current, { xPercent: 100, skewY: 2.5, duration: 1.3 }, '<')
      .to(chandelierRef.current, { opacity: 0, duration: 0.4 }, '-=0.5')
      .to(rootRef.current, { autoAlpha: 0, duration: 0.5 }, '-=0.3')
      .add(() => ScrollTrigger.refresh())
  }

  return (
    <div ref={rootRef} className="curtain-root">
      <canvas ref={dustCanvasRef} className="curtain-dust" aria-hidden="true" />

      <div ref={leftRef} className="curtain-panel curtain-left">
        <svg viewBox="0 0 200 800" preserveAspectRatio="none">
          <g stroke="#000" strokeWidth="4" opacity="0.25" fill="none">
            <path d="M20 0 Q0 400 20 800" /><path d="M50 0 Q30 400 50 800" />
            <path d="M80 0 Q60 400 80 800" /><path d="M110 0 Q90 400 110 800" />
            <path d="M140 0 Q120 400 140 800" /><path d="M170 0 Q150 400 170 800" />
          </g>
        </svg>
      </div>
      <div ref={rightRef} className="curtain-panel curtain-right">
        <svg viewBox="0 0 200 800" preserveAspectRatio="none">
          <g stroke="#000" strokeWidth="4" opacity="0.25" fill="none">
            <path d="M20 0 Q40 400 20 800" /><path d="M50 0 Q70 400 50 800" />
            <path d="M80 0 Q100 400 80 800" /><path d="M110 0 Q130 400 110 800" />
            <path d="M140 0 Q160 400 140 800" /><path d="M170 0 Q190 400 170 800" />
          </g>
        </svg>
      </div>

      <svg ref={chandelierRef} className="curtain-chandelier" viewBox="0 0 200 160" fill="none" stroke="#e6c988" strokeWidth="1.4">
        <line x1="100" y1="0" x2="100" y2="30" />
        <path d="M40 30 Q100 5 160 30" />
        <path d="M55 30 L55 70 M78 33 L78 85 M100 35 L100 95 M122 33 L122 85 M145 30 L145 70" />
        <circle cx="55" cy="70" r="5" fill="#e6c988" />
        <circle cx="78" cy="85" r="5" fill="#e6c988" />
        <circle cx="100" cy="95" r="6" fill="#e6c988" />
        <circle cx="122" cy="85" r="5" fill="#e6c988" />
        <circle cx="145" cy="70" r="5" fill="#e6c988" />
      </svg>

      <div ref={contentRef} className="curtain-content">
        <p className="curtain-label">The wedding of</p>
        <h1 className="script curtain-heading">
          {weddingData.couple.brideFirst} &amp; {weddingData.couple.groomFirst}
        </h1>
        <button className="curtain-enter" onClick={handleOpen} aria-label="Open the invitation">
          <span className="curtain-ring" />
          <span>◈</span>
        </button>
        <p className="curtain-tap">To open</p>
      </div>
    </div>
  )
}
