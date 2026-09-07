import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import GeoPattern from './GeoPattern.jsx'

export default function BlessedBeginning() {
  const { heading, copy } = weddingData.blessedBeginning
  return (
    <section id="blessed" style={{ background: 'var(--cream-50)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <GeoPattern id="blessed" color="#cf9f52" opacity={0.06} />
      <Reveal as="h2" className="script" style={{ fontSize: 32, color: 'var(--maroon-800)', marginBottom: 22 }}>
        {heading}
      </Reveal>
      <Reveal as="p" delay={0.08} style={{ maxWidth: 360, margin: '0 auto 28px', fontSize: 16, lineHeight: 1.85 }}>
        {copy}
      </Reveal>
      <Reveal as="p" delay={0.16} className="script" style={{ color: 'var(--red-500)', fontSize: 30 }}>
        {weddingData.couple.groomFirst} &amp; {weddingData.couple.brideFirst}
      </Reveal>
    </section>
  )
}
