import React, { useEffect, useRef } from 'react'
import { animate, scroll } from 'motion'
import './WhatWeDo.css'

const slides = [
  { word: 'EDITING', bg: '#1A1A1A' },
  { word: 'STORYTELLING', bg: '#E63946' },
  { word: 'SCRIPTING', bg: '#1A1A1A' },
  { word: '1000+ VIDEOS', bg: '#E63946' },
  { word: '3 YEARS', bg: '#1A1A1A' },
]

const WhatWeDo = () => {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current || !sectionRef.current) return

    const items = trackRef.current.querySelectorAll('.wwd-slide')
    const totalSlides = items.length

    // Horizontal scroll driven by vertical section scroll
    scroll(
      animate(trackRef.current, {
        transform: ['none', `translateX(-${(totalSlides - 1) * 100}vw)`],
      }),
      { target: sectionRef.current }
    )
  }, [])

  return (
    <section className="wwd-scroll" id="whatwedo" ref={sectionRef}>
      <ul className="wwd-track" ref={trackRef}>
        {slides.map((slide, i) => (
          <li
            key={i}
            className="wwd-slide"
            style={{ background: slide.bg }}
          >
            <h2 className="wwd-slide-word">{slide.word}</h2>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WhatWeDo
