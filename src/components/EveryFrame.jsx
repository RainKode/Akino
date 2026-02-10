import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './EveryFrame.css'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=600&fit=crop',
    text: 'Every frame,\nintentional.',
    bg: 'white',
  },
  {
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=600&fit=crop',
    text: 'Every cut,\npurposeful.',
    bg: 'red',
  },
  {
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=600&fit=crop',
    text: 'Every story,\nunforgettable.',
    bg: 'white',
  },
  {
    image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=600&h=600&fit=crop',
    text: 'Every detail,\ncrafted.',
    bg: 'red',
  },
  {
    image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=600&fit=crop',
    text: 'Every vision,\nrealized.',
    bg: 'white',
  },
]

const EveryFrame = () => {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const totalScroll = sectionHeight - windowHeight

      if (rect.top <= 0 && totalScroll > 0) {
        const progress = Math.min(
          Math.max(Math.abs(rect.top) / totalScroll, 0),
          0.999
        )
        const index = Math.floor(progress * slides.length)
        setActiveIndex(Math.min(index, slides.length - 1))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentSlide = slides[activeIndex]
  const isRed = currentSlide.bg === 'red'

  return (
    <section className="everyframe" id="everyframe" ref={sectionRef}>
      <div className="everyframe-sticky">
        {/* Background color layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.bg + activeIndex}
            className={`everyframe-bg ${isRed ? 'everyframe-bg--red' : 'everyframe-bg--white'}`}
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </AnimatePresence>

        <div className="everyframe-content">
          {/* Image side */}
          <div className="everyframe-image-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="everyframe-image-container"
                initial={{ y: 120, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -120, opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <img
                  src={currentSlide.image}
                  alt=""
                  className="everyframe-image"
                />
              </motion.div>
            </AnimatePresence>

            {/* Stacked image shadow layers for depth */}
            <div className="everyframe-image-stack everyframe-image-stack--1" />
            <div className="everyframe-image-stack everyframe-image-stack--2" />
          </div>

          {/* Text side */}
          <div className="everyframe-text-wrapper">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeIndex}
                className={`everyframe-heading ${isRed ? 'everyframe-heading--light' : ''}`}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              >
                {currentSlide.text.split('\n').map((line, i) => (
                  <span key={i} className="everyframe-heading-line">
                    {line}
                  </span>
                ))}
              </motion.h2>
            </AnimatePresence>

            {/* Slide indicator */}
            <div className="everyframe-indicators">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`everyframe-dot ${i === activeIndex ? 'active' : ''} ${i < activeIndex ? 'done' : ''} ${isRed ? 'everyframe-dot--light' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EveryFrame
