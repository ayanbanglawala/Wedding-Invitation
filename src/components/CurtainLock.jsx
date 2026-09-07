import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

  // --------------------------------------------------
  // GOLD DUST / PARTICLES
  // --------------------------------------------------
  useEffect(() => {
    const canvas = dustCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let raf
    let particles = []
    let w = 0
    let h = 0

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

        if (p.y < -4) {
          p.y = h + 4
          p.x = Math.random() * w
        }

        ctx.globalAlpha = p.o

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1

      raf = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // --------------------------------------------------
  // CHANDELIER ENTRANCE ANIMATION
  // --------------------------------------------------
  useEffect(() => {
    if (!chandelierRef.current) return

    gsap.fromTo(
      chandelierRef.current,
      {
        opacity: 0,
        y: -40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power2.out',
        delay: 0.3,
      }
    )
  }, [])

  // --------------------------------------------------
  // OPEN CURTAIN
  // --------------------------------------------------
  function handleOpen() {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.inOut',
      },

      onComplete: () => {
        if (onOpen) {
          onOpen()
        }
      },
    })

    // Fade out text/button
    tl.to(
      contentRef.current,
      {
        autoAlpha: 0,
        duration: 0.4,
      }
    )

      // Move chandelier upward
      .to(
        chandelierRef.current,
        {
          y: -30,
          marginBottom: 30,
          duration: 0.6,
          ease: 'power2.in',
        },
        '-=0.1'
      )

      // Open left curtain
      .to(
        leftRef.current,
        {
          xPercent: -100,
          skewY: -2.5,
          duration: 1.3,
        },
        0.1
      )

      // Open right curtain
      .to(
        rightRef.current,
        {
          xPercent: 100,
          skewY: 2.5,
          duration: 1.3,
        },
        '<'
      )

      // Fade chandelier
      .to(
        chandelierRef.current,
        {
          opacity: 0,
          duration: 0.4,
        },
        '-=0.5'
      )

      // Fade entire curtain screen
      .to(
        rootRef.current,
        {
          autoAlpha: 0,
          duration: 0.5,
        },
        '-=0.3'
      )

      // Refresh ScrollTrigger
      .add(() => {
        ScrollTrigger.refresh()
      })
  }

  // --------------------------------------------------
  // JSX
  // --------------------------------------------------
  return (
    <div ref={rootRef} className="curtain-root">

      {/* GOLD DUST */}
      <canvas
        ref={dustCanvasRef}
        className="curtain-dust"
        aria-hidden="true"
      />

      {/* LEFT CURTAIN */}
      <div
        ref={leftRef}
        className="curtain-panel curtain-left"
      >
        <svg
          viewBox="0 0 200 800"
          preserveAspectRatio="none"
        >
          <g
            stroke="#000"
            strokeWidth="4"
            opacity="0.25"
            fill="none"
          >
            <path d="M20 0 Q0 400 20 800" />
            <path d="M50 0 Q30 400 50 800" />
            <path d="M80 0 Q60 400 80 800" />
            <path d="M110 0 Q90 400 110 800" />
            <path d="M140 0 Q120 400 140 800" />
            <path d="M170 0 Q150 400 170 800" />
          </g>
        </svg>
      </div>

      {/* RIGHT CURTAIN */}
      <div
        ref={rightRef}
        className="curtain-panel curtain-right"
      >
        <svg
          viewBox="0 0 200 800"
          preserveAspectRatio="none"
        >
          <g
            stroke="#000"
            strokeWidth="4"
            opacity="0.25"
            fill="none"
          >
            <path d="M20 0 Q40 400 20 800" />
            <path d="M50 0 Q70 400 50 800" />
            <path d="M80 0 Q100 400 80 800" />
            <path d="M110 0 Q130 400 110 800" />
            <path d="M140 0 Q160 400 140 800" />
            <path d="M170 0 Q190 400 170 800" />
          </g>
        </svg>
      </div>

      {/* CHANDELIER IMAGE
          Put chandelier.png inside:
          public/chandelier.png
      */}
      <img
        ref={chandelierRef}
        src="/chandelier.png"
        alt=""
        className="curtain-chandelier"
      />

      {/* CENTER CONTENT */}
      <div
        ref={contentRef}
        className="curtain-content"
      >
        <p className="curtain-label" >
          The wedding of
        </p>

        <h1 className="script curtain-heading">
          {weddingData.couple.groomFirst}
          {' & '}
          {weddingData.couple.brideFirst}
        </h1>

        <button
          className="curtain-enter"
          onClick={handleOpen}
          aria-label="Open the invitation"
        >
          <span className="curtain-ring" />
          <span>◈</span>
        </button>

        <p className="curtain-tap">
          Tap To open
        </p>
      </div>
    </div>
  )
}