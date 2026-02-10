import React, { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import './Footer.css'

const logoLetters = ['o', 'f', 'f', 'r', 'a', 'm', 'e']

const Footer = () => {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const isInView = useInView(svgRef, { once: false, amount: 0.3 })
  const [openPopup, setOpenPopUp] = useState(false)

  const letterVariants = {
    visible: (i) => ({
      translateY: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.4,
        delay: i * 0.06,
      },
    }),
    hidden: {
      translateY: 80,
      opacity: 0,
    },
  }

  const handleNewsLetterData = (e) => {
    e.preventDefault()
    const target = e.target
    const formData = new FormData(target)
    const clientEmail = formData.get('newsletter_email')
    setOpenPopUp(true)
    target.reset()
    setTimeout(() => {
      setOpenPopUp(false)
    }, 2000)
  }

  return (
    <footer className="footer" ref={containerRef}>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-cta">
            <h2 className="footer-heading">
              Let&rsquo;s do great work together
            </h2>
            <div className="footer-newsletter">
              <p className="newsletter-label">Sign up for our newsletter*</p>
              <div className="newsletter-form-wrapper">
                <form onSubmit={handleNewsLetterData} className="newsletter-form">
                  <input
                    type="email"
                    name="newsletter_email"
                    className="newsletter-input"
                    placeholder="Your Email *"
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </form>
                {openPopup && (
                  <div className="newsletter-popup">Thanks for subscribing!</div>
                )}
              </div>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Sitemap</h4>
              <a href="#hero">Home</a>
              <a href="#featured-work">Work</a>
              <a href="#projects">Case Studies</a>
              <a href="#process">Process</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Social</h4>
              <a href="#" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-logo-section" ref={svgRef}>
          <motion.div
            className="footer-logo-letters"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {logoLetters.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                className="footer-logo-letter"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 Offrame. All rights reserved.</span>
          <a href="#" className="privacy-link">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
