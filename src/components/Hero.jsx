import React, { useEffect, useRef, useState } from 'react'
import './Hero.css'

const stackSlides = [
  {
    src: 'https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?w=600&auto=format&fit=crop',
    alt: 'Studio setup',
    bg: 'primary',
    line1: 'Your ideas.',
    line2: 'Our edits.',
  },
  {
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop',
    alt: 'Filming on location',
    bg: 'secondary',
    line1: 'Raw cuts.',
    line2: 'Sharp stories.',
  },
  {
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop',
    alt: 'Color grading',
    bg: 'primary',
    line1: 'Your words.',
    line2: 'Our craft.',
  },
  {
    src: 'https://images.unsplash.com/photo-1630797160666-38e8c5ba44c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Creative direction',
    bg: 'secondary',
    line1: 'Your vision.',
    line2: 'Akino Studio.'
  },
]

const Hero = () => {
  const stackRef = useRef(null)
  const [activeStack, setActiveStack] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!stackRef.current) return
      const rect = stackRef.current.getBoundingClientRect()
      const sectionHeight = stackRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const totalScroll = sectionHeight - windowHeight

      if (rect.top <= 0 && totalScroll > 0) {
        const progress = Math.min(Math.max(Math.abs(rect.top) / totalScroll, 0), 0.999)
        const index = Math.floor(progress * stackSlides.length)
        setActiveStack(Math.min(index, stackSlides.length - 1))
      } else if (rect.top > 0) {
        setActiveStack(0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentBg = stackSlides[activeStack].bg
  const isColoredBg = currentBg === 'primary' || currentBg === 'secondary'

  return (
    <div className="hero-wrapper" id="hero">
      {/* ── Section 1: White — giant "Akino" ── */}
      <section className="hero-slide hero-slide--white">
        <div className="hero-slide-content">
          <h1 className="sr-only">Akino Studio — Video Production Agency | Brand Films, Social Shorts & Campaign Videos</h1>
          <div className="hero-brand-logo">
            <img src="/logo.svg" alt="Akino Studio — Video Production Agency" className="hero-brand-logo-img" />
          </div>
        </div>
      </section>

      {/* ── Section 2: Red — white text, big statement ── */}
      <section className="hero-slide hero-slide--red hero-slide--rounded">
        <div className="hero-slide-content">
          <h2 className="hero-slide-heading hero-slide-heading--large">
            We create <strong>video content</strong> that<br />cuts through the noise.
          </h2>
        </div>
      </section>

      {/* ── Section 3: White — red text, bold statement ── */}
      <section className="hero-slide hero-slide--white hero-slide--rounded">
        <div className="hero-slide-content">
          <h2 className="hero-slide-heading hero-slide-heading--large hero-slide-heading--red">
            <strong>Brand films</strong>. <strong>Social shorts</strong>.<br /><strong>Campaign videos</strong>. All of it.
          </h2>
        </div>
      </section>

      {/* ── Section 4: Stacking images + sticky text with color cascade ── */}
      <section
        className={`hero-stack hero-stack--${currentBg}`}
        ref={stackRef}
      >
        <div className="hero-stack-grid">
          <div className="hero-stack-images">
            {stackSlides.map((slide, i) => (
              <figure
                key={i}
                className={`hero-stack-fig ${i === activeStack ? 'hero-stack-fig--active' : ''}`}
              >
                <img src={slide.src} alt={slide.alt} />
              </figure>
            ))}
          </div>
          <div className="hero-stack-sticky">
            <h2
              key={activeStack}
              className={`hero-stack-heading ${isColoredBg ? 'hero-stack-heading--light' : ''}`}
            >
              {stackSlides[activeStack].line1}<br />
              {stackSlides[activeStack].line2}
            </h2>
            <div className="hero-stack-dots">
              {stackSlides.map((_, i) => (
                <span
                  key={i}
                  className={`hero-stack-dot ${i === activeStack ? 'active' : ''} ${i < activeStack ? 'done' : ''} ${isColoredBg ? 'hero-stack-dot--light' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
