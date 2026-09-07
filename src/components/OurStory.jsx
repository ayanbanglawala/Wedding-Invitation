import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import Divider from './Divider.jsx'
import GeoPattern from './GeoPattern.jsx'
import './ourstory.css'

export default function OurStory() {
  return (
    <section id="our-story" className="story-section">
      <GeoPattern id="story" color="#59101c" opacity={0.05} />
      <Reveal as="p" className="eyebrow">How it began</Reveal>
      <Reveal as="h2" delay={0.06} className="script story-heading">Our story</Reveal>
      <Divider />

      <div className="story-list">
        {weddingData.ourStory.map((s, i) => (
          <Reveal as="div" key={i} delay={i * 0.08} className={`story-row ${i % 2 === 1 ? 'reverse' : ''}`}>
            <span className="story-year script">{s.year}</span>
            <div className="story-copy">
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
