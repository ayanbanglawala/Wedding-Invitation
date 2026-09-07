import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import './festivities.css'

export default function Festivities() {
  return (
    <section id="festivities" className="fest-section">
      <Reveal as="p" className="eyebrow">The festivities</Reveal>
      <Reveal as="h2" delay={0.06} className="script fest-heading">Days filled with joy</Reveal>

      <div className="fest-grid">
        {weddingData.festivities.map((f, i) => (
          <Reveal as="div" key={i} delay={0.1 + i * 0.06} className="fest-card">
            <h3>{f.name}</h3>
            <p className="fest-when">{f.when}</p>
            <p className="fest-where">{f.where}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
