import React, { useEffect, useRef, useState } from 'react'
import './Process.css'

const phases = [
  {
    number: '01',
    title: 'Kick off - Deep discovery',
    items: [
      'Understanding your business and goals thoroughly',
      'Establish creative and ideal viewer persona',
      'Determine casting (if any)',
    ],
  },
  {
    number: '02',
    title: 'Strategy & Scripting',
    items: [
      'Develop content strategy aligned with objectives',
      'Script writing and storyboarding',
      'Shot list creation and mood boards',
    ],
  },
  {
    number: '03',
    title: 'Production',
    items: [
      'Professional filming with industry-grade equipment',
      'Direction and talent management on set',
      'Capture multiple angles and B-roll footage',
    ],
  },
  {
    number: '04',
    title: 'Post-production & Delivery',
    items: [
      'Expert editing, color grading, and sound design',
      'Motion graphics and visual effects',
      'Platform-optimized formatting and delivery',
    ],
  },
  {
    number: '05',
    title: 'Launch & Growth',
    items: [
      'Strategic content publishing schedule',
      'Performance analytics and reporting',
      'Iterative optimization based on data',
    ],
  },
]

const MOBILE_BP = 968

/* Scroll-triggered card with IntersectionObserver */
const MobilePhaseCard = ({ phase, index }) => {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`process-mobile-card ${visible ? 'process-mobile-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="process-mobile-card-number">{phase.number}</div>
      <div className="process-mobile-card-body">
        <h3 className="process-mobile-card-title">{phase.title}</h3>
        <ul className="process-mobile-card-items">
          {phase.items.map((item, j) => (
            <li key={j}>
              <span className="process-bullet"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Process = () => {
  const sectionRef = useRef(null)
  const [activePhase, setActivePhase] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BP)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop: scroll-driven phase switching (unchanged)
  useEffect(() => {
    if (isMobile) return
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const totalScroll = sectionHeight - windowHeight

      if (rect.top <= 0 && totalScroll > 0) {
        const progress = Math.min(Math.max(Math.abs(rect.top) / totalScroll, 0), 0.999)
        const index = Math.floor(progress * phases.length)
        setActivePhase(Math.min(index, phases.length - 1))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  /* Desktop view — scroll-driven single phase */
  const renderDesktop = () => (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process-sticky">
        <div className="process-content">
          <div className="process-left-col">
            <div className="process-number-large" key={activePhase}>{phases[activePhase].number}</div>
            <div className="process-progress">
              {phases.map((_, i) => (
                <div
                  key={i}
                  className={`progress-dot ${i === activePhase ? 'active' : ''} ${i < activePhase ? 'done' : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="process-right-col" key={activePhase}>
            <span className="section-tag">&lt; Our Process &gt;</span>
            <h3 className="process-phase-title">{phases[activePhase].title}</h3>
            <ul className="process-items">
              {phases[activePhase].items.map((item, i) => (
                <li key={i} className="process-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="process-bullet"></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="process-counter">
              <span className="current">{phases[activePhase].number}</span>
              <span className="separator">/</span>
              <span className="total">0{phases.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  /* Mobile view — all phases with scroll-triggered animations */
  const renderMobile = () => (
    <section className="process process--mobile" id="process">
      <div className="process-mobile-header">
        <span className="section-tag">&lt; Our Process &gt;</span>
        <h2 className="process-mobile-title">How we work</h2>
      </div>
      {phases.map((phase, i) => (
        <MobilePhaseCard key={i} phase={phase} index={i} />
      ))}
    </section>
  )

  return isMobile ? renderMobile() : renderDesktop()
}

export default Process
