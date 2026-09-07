import { useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import CurtainLock from './components/CurtainLock.jsx'
import TopBar from './components/TopBar.jsx'
import SectionNav from './components/SectionNav.jsx'
import Hero from './components/Hero.jsx'
import OurStory from './components/OurStory.jsx'
import BlessedBeginning from './components/BlessedBeginning.jsx'
import ScratchCard from './components/ScratchCard.jsx'
import Gallery from './components/Gallery.jsx'
import Countdown from './components/Countdown.jsx'
import Timeline from './components/Timeline.jsx'
import Venue from './components/Venue.jsx'
import DressCode from './components/DressCode.jsx'
import Festivities from './components/Festivities.jsx'
import RSVP from './components/RSVP.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [locked, setLocked] = useState(true)
  const [playIntro, setPlayIntro] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('locked', locked)
  }, [locked])

  function handleOpen() {
    setLocked(false)
    setPlayIntro(true)
  }

  return (
    <>
      {locked && <CurtainLock onOpen={handleOpen} />}
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />
      <SectionNav />
      <TopBar />
      <Hero playIntro={playIntro} />
      <OurStory />
      <BlessedBeginning />
      <ScratchCard />
      <Gallery />
      <Countdown />
      <Timeline />
      <Venue />
      <DressCode />
      <Festivities />
      <RSVP />
      <Footer />
    </>
  )
}

// A slim gold thread that fills up the left edge of the page as the guest
// scrolls through the invitation — a quiet wayfinding detail rather than
// a generic progress bar.
function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-thread')
    gsap.to(bar, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: true },
    })
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        zIndex: 45,
        background: 'rgba(207,159,82,0.12)',
        pointerEvents: 'none',
      }}
    >
      <div
        id="scroll-thread"
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, var(--gold-400), var(--red-500))',
          transform: 'scaleY(0)',
          transformOrigin: 'top',
        }}
      />
    </div>
  )
}
