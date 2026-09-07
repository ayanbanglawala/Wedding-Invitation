# Velvet — Ayan & Arna's Invitation (React)

A React + Vite rebuild of the single-file invitation, split into components
with real GSAP-driven animation (curtain intro, kinetic-type hero reveal,
scroll reveals, parallax, drawn dividers/timeline, tilt on the venue card,
a swipeable gallery, and a scratch-to-reveal date card).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # preview the production build
```

## Edit your details

Everything text-based — names, parents, date, venue, festivities, dress
code copy, gallery captions — lives in one file:

```
src/weddingData.js
```

Change values there and every section updates automatically.

## Structure

```
src/
  App.jsx              orchestrates the page + curtain lock state
  weddingData.js        <- all editable content
  components/
    CurtainLock.jsx      opening curtain + gold dust particles
    TopBar.jsx           fixed mute toggle
    SectionNav.jsx        right-edge chapter dots (desktop, auto-highlights)
    Hero.jsx             kinetic-type name reveal + parallax bg + drifting gold flecks
    OurStory.jsx          alternating relationship timeline (new)
    BlessedBeginning.jsx
    ScratchCard.jsx       canvas scratch-to-reveal + confetti burst
    Gallery.jsx           swipeable carousel with clip-path wipe transitions
    Countdown.jsx         live countdown to the Nikah
    Timeline.jsx          nikah-day schedule with a drawn path
    Venue.jsx             pointer-tilt venue card, framed + magnetic button
    DressCode.jsx
    Festivities.jsx       responsive card grid (stacks on mobile, row on desktop)
    RSVP.jsx              styled RSVP form (new — wire up your own backend)
    Footer.jsx
    Divider.jsx           reusable drawn paisley motif
    Reveal.jsx            reusable scroll-reveal wrapper
    OrnamentFrame.jsx      reusable corner-flourish frame (new)
    GeoPattern.jsx         reusable Islamic 8-point star texture (new)
    Magnetic.jsx           reusable magnetic-hover wrapper for buttons (new)
```

## What's new in this pass

Researched current wedding-site and Awwwards conventions and used them to
push the design further:

- **Islamic geometric pattern texture** (`GeoPattern.jsx`) — a very low-opacity
  8-point star tessellation behind several sections, instead of flat colour.
- **Ornamental corner frames** (`OrnamentFrame.jsx`) on the venue card and
  RSVP panel, echoing traditional nikah card border work.
- **A proper desktop layout** — sections widen, type scales up, festivity
  cards move into a row, and "Our Story" becomes an alternating two-column
  timeline above 720px, instead of staying phone-width on a full screen.
- **"Our Story" section** — a relationship timeline most invitation sites
  include and this one was missing.
- **RSVP section** with a styled form (name, guest count, attending
  toggle, note) — currently simulates a confirmation; wire the `onSubmit`
  in `RSVP.jsx` to Formspree/Sheets/Airtable/your backend of choice.
- **Section nav dots** on the right edge (desktop only) that track scroll
  position via `IntersectionObserver` and jump to any chapter.
- **Gallery transitions** upgraded from opacity fades to directional
  clip-path wipes.
- **Magnetic buttons** (`Magnetic.jsx`) that pull gently toward the cursor
  on desktop, inert on touch.
- **Film-grain overlay** for a less flat, more editorial surface.


## Notes

- The mute button is visual only — wire up an `<audio>` element in
  `TopBar.jsx` if you want background music.
- Animations respect `prefers-reduced-motion`.
- Swap `Tangerine` / `Marcellus` / `Cormorant Garamond` in `index.html`
  and `src/index.css` if you'd like different type.
