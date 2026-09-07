import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import './scratchcard.css'

export default function ScratchCard() {
  const canvasRef = useRef(null)
  const cardFaceRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const drawingRef = useRef(false)
  const revealedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function paint() {
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      g.addColorStop(0, '#e9d3a3'); g.addColorStop(0.5, '#c9a45c'); g.addColorStop(1, '#e9d3a3')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(90,60,10,0.15)'
      for (let i = 0; i < 24; i++) {
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, 0)
        ctx.lineTo(Math.random() * canvas.width, canvas.height)
        ctx.stroke()
      }
      ctx.fillStyle = '#59101c'
      ctx.font = "600 15px 'Cormorant Garamond', serif"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✦ SCRATCH TO REVEAL ✦', canvas.width / 2, canvas.height / 2)
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      if (!revealedRef.current) paint()
    }
    resize()
    window.addEventListener('resize', resize)

    function scratchAt(x, y) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 22, 0, Math.PI * 2)
      ctx.fill()
    }
    function pos(e) {
      const rect = canvas.getBoundingClientRect()
      const p = e.touches ? e.touches[0] : e
      return { x: p.clientX - rect.left, y: p.clientY - rect.top }
    }
    function checkCleared() {
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let clear = 0, total = 0
      for (let i = 3; i < data.length; i += 4 * 20) { total++; if (data[i] < 30) clear++ }
      if (clear / total > 0.45 && !revealedRef.current) {
        revealedRef.current = true
        setRevealed(true)
        gsap.to(canvas, { opacity: 0, duration: 0.6, onComplete: () => { canvas.style.display = 'none' } })
        gsap.fromTo(cardFaceRef.current, { scale: 0.97 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' })
        fireConfettiDust(canvas.parentElement)
      }
    }
    function down(e) { drawingRef.current = true; const { x, y } = pos(e); scratchAt(x, y) }
    function move(e) { if (!drawingRef.current) return; const { x, y } = pos(e); scratchAt(x, y) }
    function up() { if (drawingRef.current) checkCleared(); drawingRef.current = false }

    canvas.addEventListener('mousedown', down)
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseup', up)
    canvas.addEventListener('mouseleave', up)
    canvas.addEventListener('touchstart', down, { passive: true })
    canvas.addEventListener('touchmove', move, { passive: true })
    canvas.addEventListener('touchend', up)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousedown', down)
      canvas.removeEventListener('mousemove', move)
      canvas.removeEventListener('mouseup', up)
      canvas.removeEventListener('mouseleave', up)
      canvas.removeEventListener('touchstart', down)
      canvas.removeEventListener('touchmove', move)
      canvas.removeEventListener('touchend', up)
    }
  }, [])

  function fireConfettiDust(container) {
    const burst = document.createElement('div')
    burst.className = 'scratch-burst'
    container.appendChild(burst)
    const bits = Array.from({ length: 14 }, () => {
      const s = document.createElement('span')
      burst.appendChild(s)
      return s
    })
    gsap.set(bits, { position: 'absolute', left: '50%', top: '50%', width: 5, height: 5, borderRadius: '50%', background: '#e6c988' })
    gsap.to(bits, {
      x: () => gsap.utils.random(-90, 90),
      y: () => gsap.utils.random(-90, 90),
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      onComplete: () => burst.remove(),
    })
  }

  return (
    <section id="scratch" style={{ background: 'var(--cream-50)', textAlign: 'center', paddingTop: 0 }}>
      <Reveal as="p" className="eyebrow">A date to hold close</Reveal>
      <Reveal as="h2" delay={0.06} className="script" style={{ fontSize: 32, color: 'var(--maroon-800)', marginBottom: 26 }}>
        Scratch to reveal
      </Reveal>
      <Reveal delay={0.1} className="scratch-cardwrap">
        <div ref={cardFaceRef} className="scratch-face">
          <p className="scratch-lbl">{revealed ? 'Our forever begins' : "You're invited"}</p>
          <p className="scratch-date">{weddingData.nikahDateLabel}</p>
          <p className="scratch-time">{weddingData.nikahDayLabel}</p>
        </div>
        <canvas ref={canvasRef} className="scratch-canvas" />
      </Reveal>
      <Reveal as="p" delay={0.18} className="scratch-hint" style={{ opacity: revealed ? 0 : 1 }}>
        swipe your finger across the card
      </Reveal>
    </section>
  )
}
