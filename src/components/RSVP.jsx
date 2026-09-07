import { useState } from 'react'
import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import OrnamentFrame from './OrnamentFrame.jsx'
import Magnetic from './Magnetic.jsx'
import GeoPattern from './GeoPattern.jsx'
import './rsvp.css'

export default function RSVP() {
  const { heading, copy, deadline } = weddingData.rsvp
  const [attending, setAttending] = useState('yes')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Wire this up to your form backend of choice (Formspree, Google Sheets
    // via Apps Script, Airtable, etc.) — this just simulates a confirmation.
    setSent(true)
  }

  return (
    <section id="rsvp" className="rsvp-section">
      <GeoPattern id="rsvp" color="#e6c988" opacity={0.06} />
      <Reveal as="p" className="eyebrow" style={{ color: 'var(--gold-300)' }}>Kindly respond</Reveal>
      <Reveal as="h2" delay={0.06} className="script rsvp-heading">{heading}</Reveal>
      <Reveal as="p" delay={0.1} className="rsvp-copy">{copy}</Reveal>
      <Reveal as="p" delay={0.12} className="rsvp-deadline">{deadline}</Reveal>

      <Reveal delay={0.16}>
        <OrnamentFrame tone="light" className="rsvp-frame">
          {sent ? (
            <div className="rsvp-thanks">
              <p className="script rsvp-thanks-title">Shukran!</p>
              <p>Your response has been noted with love. We can&rsquo;t wait to celebrate with you.</p>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <label>
                <span>Full name</span>
                <input type="text" name="name" required placeholder="Your name" />
              </label>
              <label>
                <span>Number of guests</span>
                <input type="number" name="guests" min="1" max="6" defaultValue={1} required />
              </label>
              <fieldset className="rsvp-attend">
                <legend>Will you attend?</legend>
                <div className="rsvp-toggle">
                  <button
                    type="button"
                    className={attending === 'yes' ? 'active' : ''}
                    onClick={() => setAttending('yes')}
                  >
                    Joyfully accept
                  </button>
                  <button
                    type="button"
                    className={attending === 'no' ? 'active' : ''}
                    onClick={() => setAttending('no')}
                  >
                    Regretfully decline
                  </button>
                </div>
              </fieldset>
              <label>
                <span>A note for the couple (optional)</span>
                <textarea name="note" rows={3} placeholder="Your wishes, dietary notes, anything at all" />
              </label>
              <Magnetic as="button" type="submit" className="rsvp-submit">
                Send RSVP
              </Magnetic>
            </form>
          )}
        </OrnamentFrame>
      </Reveal>
    </section>
  )
}
