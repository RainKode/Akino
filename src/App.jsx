import React from 'react'
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
import './App.css'

function HomePage() {
  return (
    <ReactLenis root>
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
    </ReactLenis>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}

export default App
