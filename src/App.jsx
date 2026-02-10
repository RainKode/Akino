import React from 'react'
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
import './App.css'

function App() {
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

export default App
