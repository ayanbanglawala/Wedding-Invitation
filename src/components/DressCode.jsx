import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import './dresscode.css'

export default function DressCode() {
  const { swatches, copy } = weddingData.dressCode
  return (
    <section id="dresscode" className="dress-section">
      <Reveal className="dress-swatches">
        {swatches.map((c, i) => (
          <span key={i} style={{ background: c }} />
        ))}
      </Reveal>
      <Reveal as="p" delay={0.08} className="dress-copy">{copy}</Reveal>
    </section>
  )
}
