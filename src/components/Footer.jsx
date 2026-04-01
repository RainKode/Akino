import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'
import './Footer.css'



const Footer = () => {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const isInView = useInView(svgRef, { once: false, amount: 0.3 })
  const [newsletterStatus, setNewsletterStatus] = useState('idle') // idle | sending | success | error

  const handleNewsLetterData = async (e) => {
    e.preventDefault()
    const target = e.target
    const formData = new FormData(target)
    formData.append('access_key', 'fa79ee1b-0b70-4c39-a489-9a908d7669f5')
    formData.append('subject', 'New newsletter subscriber')
    formData.append('from_name', 'Akino Studio Website')
    setNewsletterStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (data.success) {
        setNewsletterStatus('success')
        target.reset()
        setTimeout(() => setNewsletterStatus('idle'), 3000)
      } else {
        setNewsletterStatus('error')
        setTimeout(() => setNewsletterStatus('idle'), 3000)
      }
    } catch {
      setNewsletterStatus('error')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
    }
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
                {newsletterStatus === 'success' && (
                  <div className="newsletter-popup">Thanks for subscribing!</div>
                )}
                {newsletterStatus === 'error' && (
                  <div className="newsletter-popup newsletter-popup--error">Something went wrong. Try again.</div>
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
              <Link to="/blog">Blog</Link>
              <Link to="/colour-grading">Colour Grading</Link>
            </div>
            <div className="footer-col">
              <h4>Social</h4>
              <a href="https://www.tiktok.com/@akinostudio" target="_blank" rel="noopener noreferrer" aria-label="Follow Akino Studio on TikTok">TikTok</a>
              <a href="https://instagram.com/studio.akino" target="_blank" rel="noopener noreferrer" aria-label="Follow Akino Studio on Instagram">Instagram</a>
              <a href="https://www.linkedin.com/company/akinostudio" target="_blank" rel="noopener noreferrer" aria-label="Follow Akino Studio on LinkedIn">LinkedIn</a>
              <a href="https://www.youtube.com/@AkinoStudio" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to Akino Studio on YouTube">YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-logo-section" ref={svgRef}>
          <motion.div
            className="footer-logo-img-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img src="/logo.svg" alt="Akino Studio — Video Production Agency" className="footer-logo-img" />
          </motion.div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 Akino Studio. All rights reserved.</span>
          <Link to="/privacy-policy" className="privacy-link">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
