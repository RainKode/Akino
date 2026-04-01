import React, { useCallback, useEffect, useRef, useState, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Navbar from './Navbar'
import Footer from './Footer'
import './ColourGrading.css'

/* ─── Capabilities slides — locked full-screen scroll section ─ */
const capSlides = [
  {
    id: 1,
    number: '01',
    tag: '< Creative Look >',
    title: 'Creative Look\nDevelopment',
    body: 'From golden-hour warmth to cool cinematic shadows, we craft a signature look built around your brand identity, staying consistent across every deliverable.',
    bg: '#0a0a0a',
    numberColor: 'rgba(3,166,175,0.12)',
    accentColor: 'var(--primary)',
    headingColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.55)',
  },
  {
    id: 2,
    number: '02',
    tag: '< Skin Tones >',
    title: 'Skin-Tone\nMastery',
    body: 'Skin looks perfect regardless of lighting conditions on set. We use targeted secondaries and qualifiers to preserve natural, flattering tones in every frame.',
    bg: '#03a6af',
    numberColor: 'rgba(255,255,255,0.1)',
    accentColor: 'rgba(255,255,255,0.7)',
    headingColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.75)',
  },
  {
    id: 3,
    number: '03',
    tag: '< Scene Matching >',
    title: 'Scene\nMatching',
    body: 'Multi-camera shoots and mixed lighting sources are seamlessly unified. Every cut feels intentional because every clip lives in the same visual world.',
    bg: '#fd5863',
    numberColor: 'rgba(255,255,255,0.1)',
    accentColor: 'rgba(255,255,255,0.7)',
    headingColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.75)',
  },
]

/* Locked full-screen capabilities section — same pattern as SplitPushSection */
const CapabilitiesSection = forwardRef(({ isActive, onComplete, onBack }, ref) => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [mounted, setMounted]           = useState(false)  // ensures CSS transition fires
  const numSlides  = capSlides.length
  const ANIM_TIME  = 1000
  const scrolling  = useRef(false)
  const slideRef   = useRef(1)

  /* One rAF after mount → active class transition fires reliably on all browsers */
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  useEffect(() => { slideRef.current = currentSlide }, [currentSlide])

  const isActiveRef   = useRef(isActive)
  const onCompleteRef = useRef(onComplete)
  const onBackRef     = useRef(onBack)
  useEffect(() => { isActiveRef.current   = isActive },   [isActive])
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => { onBackRef.current     = onBack },     [onBack])

  useEffect(() => {
    const go = (dir) => {
      if (scrolling.current) return
      if (dir === 'down') {
        if (slideRef.current < numSlides) {
          scrolling.current = true
          setCurrentSlide(p => p + 1)
          setTimeout(() => { scrolling.current = false }, ANIM_TIME)
        } else {
          onCompleteRef.current?.()
        }
      } else {
        if (slideRef.current > 1) {
          scrolling.current = true
          setCurrentSlide(p => p - 1)
          setTimeout(() => { scrolling.current = false }, ANIM_TIME)
        } else {
          onBackRef.current?.()
        }
      }
    }

    const handleWheel = (e) => {
      if (!isActiveRef.current) return
      e.preventDefault()
      go(e.deltaY > 0 ? 'down' : 'up')
    }
    const handleKeyDown = (e) => {
      if (!isActiveRef.current) return
      if (e.key === 'ArrowDown') go('down')
      if (e.key === 'ArrowUp')   go('up')
    }
    const touchStart = { y: 0 }
    const handleTouchStart = (e) => { touchStart.y = e.touches[0].clientY }
    const handleTouchEnd   = (e) => {
      if (!isActiveRef.current) return
      const delta = touchStart.y - e.changedTouches[0].clientY
      if (Math.abs(delta) < 40) return
      go(delta > 0 ? 'down' : 'up')
    }

    window.addEventListener('wheel',      handleWheel,      { passive: false })
    window.addEventListener('keydown',    handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend',   handleTouchEnd,   { passive: true })
    return () => {
      window.removeEventListener('wheel',      handleWheel)
      window.removeEventListener('keydown',    handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend',   handleTouchEnd)
    }
  }, [])

  return (
    <div ref={ref} className="cg-cap-section">
      {capSlides.map((slide, i) => {
        const idx           = i + 1
        const isSlideActive = currentSlide === idx
        const trans         = idx < currentSlide ? 'translateY(-100%)' : idx > currentSlide ? 'translateY(100%)' : 'translateY(0)'

        return (
          <div key={idx} className="cg-cap-slide" style={{ background: slide.bg, transform: trans }}>
            <div className={`cg-cap-slide-content${isSlideActive && mounted ? ' cg-cap-slide--active' : ''}`}>
              <div className="cg-cap-slide-num-col">
                <span className="cg-cap-slide-number" style={{ color: slide.numberColor }}>
                  {slide.number}
                </span>
              </div>
              <div className="cg-cap-slide-text">
                <span className="cg-cap-slide-tag" style={{ color: slide.accentColor }}>{slide.tag}</span>
                <h3 className="cg-cap-slide-heading" style={{ color: slide.headingColor }}>
                  {slide.title.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}
                </h3>
                <p className="cg-cap-slide-body" style={{ color: slide.bodyColor }}>{slide.body}</p>
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation dots */}
      <div className="cg-cap-dots">
        {capSlides.map((_, i) => (
          <button
            key={i}
            className={`cg-cap-dot${i + 1 === currentSlide ? ' cg-cap-dot--active' : ''}`}
            onClick={() => { if (!scrolling.current) setCurrentSlide(i + 1) }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
})

/* ════════════════════════════════════════════════════════════
   HERO — Scroll-expand video (no text on video)
   75% → 100vw / 100vh on wheel / touch
   After full expansion, body scroll unlocks
════════════════════════════════════════════════════════════ */

const ScrollExpandHero = ({ isActive, onComplete }) => {
  const [progress, setProgress] = useState(0)   // 0 → 1
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)
  const heroRef = useRef(null)
  const touchStartY = useRef(0)
  const progRef = useRef(0)
  const doneRef = useRef(false)  // prevent double-firing onComplete

  /* Auto-mute when hero scrolls out of view */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.muted = true
          setMuted(true)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onWheel = (e) => {
      if (!isActive) return
      e.preventDefault()
      const delta = e.deltaY * 0.0012
      const next = Math.min(Math.max(progRef.current + delta, 0), 1)
      progRef.current = next
      setProgress(next)
      if (next >= 1 && !doneRef.current) {
        doneRef.current = true
        onComplete()
      }
    }

    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY }
    const onTouchMove = (e) => {
      if (!isActive) return
      e.preventDefault()
      const dy = touchStartY.current - e.touches[0].clientY
      touchStartY.current = e.touches[0].clientY
      const next = Math.min(Math.max(progRef.current + dy * 0.007, 0), 1)
      progRef.current = next
      setProgress(next)
      if (next >= 1 && !doneRef.current) {
        doneRef.current = true
        onComplete()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [isActive, onComplete])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const minW = isMobile ? 82 : 75
  const minH = isMobile ? 56 : 72

  const widthPct  = minW  + progress * (100 - minW)
  const heightPct = minH  + progress * (100 - minH)
  const radius    = Math.max(20 - progress * 20, 0)
  const hintOpacity = Math.max(1 - progress * 5, 0)

  return (
    <div ref={heroRef} className="cg-expand-hero">
      <div
        className="cg-expand-video-wrap"
        style={{
          width: `${widthPct}vw`,
          height: `${heightPct}vh`,
          borderRadius: `${radius}px`,
        }}
      >
        <video
          ref={videoRef}
          className="cg-expand-video"
          src="/videos/colour-grading/showreel.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Colour grading showreel"
        />
        {/* Mute toggle — bottom-right corner of the video */}
        <button
          className="cg-sound-btn"
          onClick={() => {
            const v = videoRef.current
            if (!v) return
            v.muted = !v.muted
            setMuted(v.muted)
          }}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? (
            /* Sound off */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
              <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            /* Sound on */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Scroll hint — below video, never on top of it */}
      <div className="cg-expand-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <span>scroll to expand</span>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   SPLIT PUSH SECTION — left/right halves push in/out
   Tells the colour-grading story (the script)
════════════════════════════════════════════════════════════ */

/* Pages: leftBg / rightBg define each half's colour;
   textSide says which half holds the text copy. */
const splitPages = [
  {
    leftBg: '#0a0a0a',
    rightBg: '#fbfbfe',
    textSide: 'right',
    tag: '< What people think >',
    heading: 'Most people think\nTHIS is colour grading.',
    body: 'Adjusting sliders.\nIncreasing saturation.\nTweaking contrast.',
    textColor: '#1A1A1A',
    tagColor: 'var(--primary)',
  },
  {
    leftBg: '#03a6af',
    rightBg: '#0a0a0a',
    textSide: 'left',
    tag: '< The reality >',
    heading: "But that's NOT\ncolour grading.",
    body: "That's basic correction.\nReal grading starts\nwhere sliders end.",
    textColor: '#ffffff',
    tagColor: 'rgba(255,255,255,0.65)',
  },
  {
    leftBg: '#111',
    rightBg: '#fbfbfe',
    textSide: 'right',
    tag: '< True colour grading >',
    heading: 'Masking every element.\nIsolating. Sculpting.',
    body: 'Skin tones. Skies. Shadows. Objects.\nEvery layer has its own intention.',
    textColor: '#1A1A1A',
    tagColor: 'var(--primary)',
  },
  {
    leftBg: '#fd5863',
    rightBg: '#0a0a0a',
    textSide: 'left',
    tag: '< The result >',
    heading: 'Depth. Dimension.\nEvery frame — cinematic.',
    body: 'Adding what the camera alone\ncould never capture\non its own.',
    textColor: '#ffffff',
    tagColor: 'rgba(255,255,255,0.65)',
  },
  {
    leftBg: '#111',
    rightBg: '#1A1A1A',
    textSide: 'right',
    tag: '< Our standard >',
    heading: 'Professional colour grading.\nOn every project.',
    body: 'This is our process. This is our standard.\nNo shortcuts. No presets. Just precision.',
    textColor: '#ffffff',
    tagColor: 'var(--primary)',
    cta: true,
  },
]

/* Content rendered inside a split half — CSS animations keyed to --active class */
const SplitContent = ({ page, isActive }) => (
  <div className={`cg-split-content${isActive ? ' cg-split-content--active' : ''}`}>
    <span className="cg-split-tag" style={{ color: page.tagColor }}>
      {page.tag}
    </span>
    <h2 className="cg-split-heading" style={{ color: page.textColor }}>
      {page.heading.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
    </h2>
    <p className="cg-split-body" style={{ color: page.textColor }}>
      {page.body.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
    </p>
    {page.cta && (
      <Link to="/#contact" className="cg-split-cta-btn">
        Let's work together
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    )}
  </div>
)

/* ── Phase-orchestrated split section ──
   isActive = parent says this section owns the wheel.
   onComplete = called when user scrolls past last slide.
   onBack     = called when user scrolls before first slide. */
const SplitPushSection = forwardRef(({ isActive, onComplete, onBack }, ref) => {
  const [currentPage, setCurrentPage] = useState(1)
  const numOfPages = splitPages.length
  const ANIM_TIME  = 1000
  const scrolling  = useRef(false)
  const pageRef    = useRef(1)   // stable ref for handlers

  /* Sync pageRef whenever currentPage changes */
  useEffect(() => { pageRef.current = currentPage }, [currentPage])

  /* Register listeners ONCE — access live values via refs/props-refs */
  const isActiveRef   = useRef(isActive)
  const onCompleteRef = useRef(onComplete)
  const onBackRef     = useRef(onBack)
  useEffect(() => { isActiveRef.current = isActive },     [isActive])
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => { onBackRef.current = onBack },         [onBack])

  useEffect(() => {
    const go = (dir) => {
      if (scrolling.current) return
      if (dir === 'down') {
        if (pageRef.current < numOfPages) {
          scrolling.current = true
          setCurrentPage(p => p + 1)
          setTimeout(() => { scrolling.current = false }, ANIM_TIME)
        } else {
          onCompleteRef.current?.()
        }
      } else {
        if (pageRef.current > 1) {
          scrolling.current = true
          setCurrentPage(p => p - 1)
          setTimeout(() => { scrolling.current = false }, ANIM_TIME)
        } else {
          onBackRef.current?.()
        }
      }
    }

    const handleWheel = (e) => {
      if (!isActiveRef.current) return
      e.preventDefault()
      go(e.deltaY > 0 ? 'down' : 'up')
    }
    const handleKeyDown = (e) => {
      if (!isActiveRef.current) return
      if (e.key === 'ArrowDown') go('down')
      if (e.key === 'ArrowUp')   go('up')
    }
    const touchStart = { y: 0 }
    const handleTouchStart = (e) => { touchStart.y = e.touches[0].clientY }
    const handleTouchEnd   = (e) => {
      if (!isActiveRef.current) return
      const delta = touchStart.y - e.changedTouches[0].clientY
      if (Math.abs(delta) < 40) return
      go(delta > 0 ? 'down' : 'up')
    }

    window.addEventListener('wheel',      handleWheel,      { passive: false })
    window.addEventListener('keydown',    handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend',   handleTouchEnd,   { passive: true })
    return () => {
      window.removeEventListener('wheel',      handleWheel)
      window.removeEventListener('keydown',    handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend',   handleTouchEnd)
    }
  }, [])

  return (
    <div ref={ref} className="cg-split-section" aria-label="Colour grading story">
      {splitPages.map((page, i) => {
        const idx       = i + 1
        const slideActive = currentPage === idx
        const leftTrans  = slideActive ? 'translateY(0)' : 'translateY(100%)'
        const rightTrans = slideActive ? 'translateY(0)' : 'translateY(-100%)'

        return (
          <div key={idx} className="cg-split-page" data-textside={page.textSide}>
            <div className="cg-split-half cg-split-left"
              style={{ transform: leftTrans, background: page.leftBg }}>
              {page.textSide === 'left' && <SplitContent page={page} isActive={slideActive} />}
            </div>
            <div className="cg-split-half cg-split-right"
              style={{ transform: rightTrans, background: page.rightBg }}>
              {page.textSide === 'right' && <SplitContent page={page} isActive={slideActive} />}
            </div>
          </div>
        )
      })}

      {/* Navigation dots */}
      <div className="cg-split-dots">
        {splitPages.map((_, i) => (
          <button key={i}
            className={`cg-split-dot${i + 1 === currentPage ? ' cg-split-dot--active' : ''}`}
            onClick={() => { if (!scrolling.current) setCurrentPage(i + 1) }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow hints — fixed: inline navigate instead of undefined function refs */}
      {currentPage > 1 && (
        <button className="cg-split-arrow cg-split-arrow--up"
          onClick={() => {
            if (scrolling.current) return
            if (pageRef.current > 1) { scrolling.current = true; setCurrentPage(p => p - 1); setTimeout(() => { scrolling.current = false }, ANIM_TIME) }
            else onBackRef.current?.()
          }}
          aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {currentPage < numOfPages && (
        <button className="cg-split-arrow cg-split-arrow--down"
          onClick={() => {
            if (scrolling.current) return
            if (pageRef.current < numOfPages) { scrolling.current = true; setCurrentPage(p => p + 1); setTimeout(() => { scrolling.current = false }, ANIM_TIME) }
            else onCompleteRef.current?.()
          }}
          aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  )
})

/* ─── Reusable motion helpers ───────────────────────────────── */

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >{children}</motion.div>
  )
}

const SlideIn = ({ children, delay = 0, direction = 'left', className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: direction === 'left' ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >{children}</motion.div>
  )
}

const UncoverPanel = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] })
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  return (
    <motion.div ref={ref} className={className} style={{ clipPath }}>{children}</motion.div>
  )
}

const CoverPushBlock = ({ children, bgColor, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const coverY = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ['100%', '0%', '0%', '-100%'])
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ['30px', '0px', '-30px'])
  return (
    <div ref={ref} className={`cover-push-block ${className}`} style={{ position: 'relative' }}>
      <motion.div className="cover-push-panel" style={{ backgroundColor: bgColor, y: coverY }} aria-hidden="true" />
      <motion.div style={{ y: contentY }} className="cover-push-content">{children}</motion.div>
    </div>
  )
}

const CapabilityCard = ({ cap, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.article ref={ref} className="cg-cap-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
    >
      <span className="cg-cap-number">{cap.number}</span>
      <h3 className="cg-cap-title">{cap.title}</h3>
      <p className="cg-cap-body">{cap.body}</p>
    </motion.article>
  )
}
/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */

const ColourGrading = () => {
  // 'hero'         → hero owns the wheel, body locked
  // 'split'        → split section owns the wheel, body locked
  // 'capabilities' → capabilities section owns the wheel, body locked
  // 'free'         → normal page scroll
  const [phase, setPhase] = useState('hero')
  const splitRef      = useRef(null)
  const capSectionRef = useRef(null)
  const ctaRef        = useRef(null)

  /* ── Central body-scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = phase === 'free' ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [phase])

  /* ── Page title ── */
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Colour Grading | Akino Studio — Video Production Agency'
    return () => {
      document.title = 'Akino Studio — Video Production Agency | Brand Films, Social Shorts & Campaign Videos'
    }
  }, [])

  /* Hero finished → snap to split */
  const handleHeroComplete = useCallback(() => {
    if (splitRef.current) {
      window.scrollTo({ top: splitRef.current.offsetTop, behavior: 'instant' })
    }
    setPhase('split')
  }, [])

  /* Split scrolled back → go back to hero */
  const handleSplitBack = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPhase('hero')
  }, [])

  /* Split finished → snap to capabilities */
  const handleSplitComplete = useCallback(() => {
    if (capSectionRef.current) {
      window.scrollTo({ top: capSectionRef.current.offsetTop, behavior: 'instant' })
    }
    setPhase('capabilities')
  }, [])

  /* Capabilities scrolled back → snap to split */
  const handleCapabilitiesBack = useCallback(() => {
    if (splitRef.current) {
      window.scrollTo({ top: splitRef.current.offsetTop, behavior: 'instant' })
    }
    setPhase('split')
  }, [])

  /* Capabilities finished → free scroll, reveal CTA */
  const handleCapabilitiesComplete = useCallback(() => {
    setPhase('free')
    requestAnimationFrame(() => {
      ctaRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  return (
    <div className="cg-page">
      <Navbar />

      {/* 1 ── Scroll-expand hero */}
      <ScrollExpandHero
        isActive={phase === 'hero'}
        onComplete={handleHeroComplete}
      />

      {/* 2 ── Split push story */}
      <SplitPushSection
        ref={splitRef}
        isActive={phase === 'split'}
        onComplete={handleSplitComplete}
        onBack={handleSplitBack}
      />

      {/* 3 ── Full-screen locked capabilities slides */}
      <CapabilitiesSection
        ref={capSectionRef}
        isActive={phase === 'capabilities'}
        onComplete={handleCapabilitiesComplete}
        onBack={handleCapabilitiesBack}
      />

      {/* 4 ── CTA band */}
      <section ref={ctaRef} className="cg-cta-band">
        <div className="cg-container">
          <UncoverPanel className="cg-cta-inner">
            <FadeUp>
              <span className="section-tag">&lt; Let's talk &gt;</span>
              <h2 className="cg-cta-heading">
                Ready to give your footage<br />the look it deserves?
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link to="/#contact" className="cg-cta-btn">
                Get a free colour consult
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </FadeUp>
          </UncoverPanel>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ColourGrading
