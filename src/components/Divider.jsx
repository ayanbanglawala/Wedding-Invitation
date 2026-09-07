import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// A small paisley motif that draws itself in with a stroke animation the
// first time it scrolls into view — used as the signature recurring detail
// instead of a plain line-and-diamond rule.
export default function Divider({ tone = 'dark' }) {
  const ref = useRef(null)

  useEffect(() => {
    const path = ref.current.querySelector('path')
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: ref.current, start: 'top 90%' },
    })
  }, [])

  const stroke = tone === 'dark' ? 'var(--gold-400)' : 'var(--gold-300)'

  return (
    <div
      ref={ref}
      style={{ display: 'flex', justifyContent: 'center', margin: '22px auto' }}
      aria-hidden="true"
    >
      <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
        <path
          d="M2 10 C 25 10, 30 2, 42 2 C 52 2, 55 10, 60 10 C 65 10, 68 2, 78 2 C 90 2, 95 10, 118 10"
          stroke={stroke}
          strokeWidth="1.1"
        />
      </svg>
    </div>
  )
}
