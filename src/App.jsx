import React, { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatWeDo from './components/WhatWeDo'
import FeaturedWork from './components/FeaturedWork'
import ProjectShowcase from './components/ProjectShowcase'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import ColourGrading from './components/ColourGrading'
import './App.css'

/* Detect Android — Lenis smooth-scroll sets overflow:hidden on <html>
   which breaks position:sticky on Android Chrome. Disable it there. */
const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)

function HomePage() {
  const content = (
    <div className="app">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <ProjectShowcase />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )

  if (isAndroid) return content

  return <ReactLenis root>{content}</ReactLenis>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/colour-grading" element={<ColourGrading />} />
    </Routes>
  )
}

export default App
