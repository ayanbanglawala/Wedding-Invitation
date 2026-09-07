import { useRef } from 'react'
import gsap from 'gsap'

// Subtly pulls toward the cursor on fine-pointer devices; a no-op on touch,
// so it never gets in the way on mobile where most guests will open this.
export default function Magnetic({ as: Tag = 'a', className = '', style, children, ...rest }) {
  const ref = useRef(null)

  function move(e) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.25, y: y * 0.35, duration: 0.4, ease: 'power2.out' })
  }
  function leave() {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <Tag ref={ref} className={className} style={style} onMouseMove={move} onMouseLeave={leave} {...rest}>
      {children}
    </Tag>
  )
}
