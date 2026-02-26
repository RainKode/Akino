import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './Navbar.css'

const navItems = [
  { label: 'Home', target: 'hero' },
  { label: 'Work', target: 'featured-work' },
  { label: 'Case Studies', target: 'projects' },
  { label: 'Process', target: 'process' },
  { label: 'Testimonials', target: 'testimonials' },
  { label: 'Contact', target: 'contact' },
]

const previewCards = [
  { id: 1, gradient: 'linear-gradient(to left, #03a6af, #028a92)' },
  { id: 2, gradient: 'linear-gradient(to right, #fd5863, #e04550)' },
  { id: 3, gradient: 'linear-gradient(to top left, #03a6af, #fd5863)' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const scrollTo = useCallback((id) => {
    setDrawerOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }, [])

  return (
    <>
      {/* ── Fixed header bar ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="navbar-logo" onClick={() => scrollTo('hero')} role="button" tabIndex={0} aria-label="Go to homepage">
            <img src="/logo.svg" alt="Akino Studio" className="navbar-logo-img" />
          </div>
          <button
            className="navbar-menu-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            {/* Hamburger icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Full-screen drawer overlay ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel — slides from top */}
            <motion.div
              className="drawer-panel"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Drawer header */}
              <div className="drawer-header">
                <button
                  className="drawer-close-btn"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  {/* X icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <span className="drawer-brand">AKINO</span>
              </div>

              {/* Drawer body */}
              <div className="drawer-body">
                <nav className="drawer-nav">
                  <ul className="drawer-nav-list">
                    {navItems.map((item) => (
                      <li key={item.target}>
                        <button
                          className="drawer-nav-link"
                          onClick={() => scrollTo(item.target)}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Preview cards — desktop only */}
                <div className="drawer-preview-cards">
                  {previewCards.map((card) => (
                    <div
                      key={card.id}
                      className="drawer-card"
                      style={{ background: card.gradient }}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile drag handle */}
              <div className="drawer-handle-wrapper">
                <div className="drawer-handle" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
