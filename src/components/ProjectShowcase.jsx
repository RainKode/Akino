import React, { useState, useEffect, useRef } from 'react'
import './ProjectShowcase.css'

const projects = [
  {
    name: 'Doctor ER',
    videos: [
      { type: 'local', src: '/videos/doctor-er/resident-evil.webm', thumb: '/videos/doctor-er/resident-evil.jpg', title: 'Doctor ER — Resident Evil Reactions' },
      { type: 'local', src: '/videos/doctor-er/far-cry.webm', thumb: '/videos/doctor-er/far-cry.jpg', title: 'Doctor ER — Far Cry Reactions' },
      { type: 'local', src: '/videos/doctor-er/ishowspeed.webm', thumb: '/videos/doctor-er/ishowspeed.jpg', title: 'Doctor ER — IShowSpeed Injuries' },
    ],
  },
  {
    name: 'Jaydone History',
    videos: [
      { type: 'local', src: '/videos/jaydon/tragedies.webm', thumb: '/videos/jaydon/tragedies.jpg', title: 'Jaydone History — Devastating Tragedies' },
      { type: 'local', src: '/videos/jaydon/evil-orgs.webm', thumb: '/videos/jaydon/evil-orgs.jpg', title: 'Jaydone History — Evil Organizations' },
      { type: 'local', src: '/videos/jaydon/serial-killers.webm', thumb: '/videos/jaydon/serial-killers.jpg', title: 'Jaydone History — Notorious Serial Killers' },
    ],
  },
]

const LocalVideoCard = ({ video }) => {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (hovered && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    } else if (!hovered && videoRef.current) {
      videoRef.current.pause()
    }
  }, [hovered])

  return (
    <article
      className="expand-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video is always in the DOM and pre-buffered; thumbnail overlays it until hover */}
      <video
        ref={videoRef}
        className="expand-card-video"
        src={video.src}
        muted
        loop
        playsInline
        preload="auto"
      />
      <img
        className={`expand-card-thumb ${hovered ? 'expand-card-thumb--hidden' : ''}`}
        src={video.thumb}
        alt={video.title}
        loading="lazy"
      />
      <div className="expand-card-overlay">
        <span className="expand-card-title">{video.title}</span>
      </div>
    </article>
  )
}

const YouTubeVideoCard = ({ video }) => {
  const [hovered, setHovered] = useState(false)
  // Use mqdefault (320x180) for faster load, switch to maxresdefault on hover
  const thumb = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`

  return (
    <article
      className="expand-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <iframe
          className="expand-card-video"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&modestbranding=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media"
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <img
          className="expand-card-thumb"
          src={thumb}
          alt={video.title}
          loading="lazy"
        />
      )}
      <div className="expand-card-overlay">
        <span className="expand-card-title">{video.title}</span>
      </div>
    </article>
  )
}

const VideoCard = ({ video }) => {
  if (video.type === 'local') return <LocalVideoCard video={video} />
  return <YouTubeVideoCard video={video} />
}

const MOBILE_BP = 968

const ProjectShowcase = () => {
  const [activeProject, setActiveProject] = useState(0)
  const sectionRef = useRef(null)

  // Desktop only: scroll-driven project switching
  useEffect(() => {
    if (window.innerWidth <= MOBILE_BP) return
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const scrollStart = rect.top
      const totalScroll = sectionHeight - windowHeight

      if (scrollStart <= 0 && totalScroll > 0) {
        const progress = Math.min(Math.max(Math.abs(scrollStart) / totalScroll, 0), 0.999)
        const index = Math.floor(progress * projects.length)
        setActiveProject(Math.min(index, projects.length - 1))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentProject = projects[activeProject]

  return (
    <section className="project-showcase" id="projects" ref={sectionRef}>
      <div className="project-sticky-container">
        <div className="project-left">
          <span className="section-tag">&lt; Projects &gt;</span>
          <h2 className="project-heading">
            We're proud to<br />work with the best<br /> in the industry.
          </h2>
          <button
            className="project-cta"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in touch
          </button>

          <div className="project-names">
            {projects.map((project, index) => (
              <button
                key={project.name}
                className={`project-name-btn ${activeProject === index ? 'active' : ''}`}
                onClick={() => setActiveProject(index)}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>

        <div className="project-right">
          <div className="expand-cards-row" key={activeProject}>
            {currentProject.videos.map((video, i) => (
              <VideoCard key={`${activeProject}-${i}`} video={video} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcase
