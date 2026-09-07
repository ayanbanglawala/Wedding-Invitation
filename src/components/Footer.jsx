import weddingData from '../weddingData.js'
import Reveal from './Reveal.jsx'
import './footer.css'

export default function Footer() {
  const { label, heading, copy } = weddingData.footer
  return (
    <footer className="site-footer">
      <Reveal as="p" className="footer-label">{label}</Reveal>
      <Reveal as="h2" delay={0.06} className="script footer-heading">{heading}</Reveal>
      <Reveal as="p" delay={0.12} className="footer-copy">{copy}</Reveal>
      <Reveal as="p" delay={0.18} className="script footer-names">
        {weddingData.couple.brideFirst} &amp; {weddingData.couple.groomFirst}
      </Reveal>
    </footer>
  )
}
