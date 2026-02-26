import React from 'react'
import { ArrowRight } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  {
    type: 'image',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
  },
  {
    type: 'quote',
    name: 'John Hu',
    role: 'Founder, Stan Store',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    text: 'The very first video I posted got 2.5M views on LinkedIn and 600K views on TikTok! They helped us build rapport...',
  },
  {
    type: 'image',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face',
  },
  {
    type: 'quote',
    name: 'Ari (조아라)',
    role: 'Marketing Manager, Buldak',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    text: "We've hit 1 million followers on TikTok! Thank you so much for all your hard work! It's all thanks to your efforts. I'm...",
  },
  {
    type: 'image',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
  },
  {
    type: 'highlight',
    title: 'You give us a vision',
    subtitle: 'We give you results',
    text: 'From concept to viral — every project is a partnership built on trust and creative ambition.',
  },
  {
    type: 'quote',
    name: 'Matt Rice',
    role: 'Growth',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    text: 'Akino Studio took over our social strategy, slapped their magic on it, and boom - videos that go viral without getting lucky...',
  },
  {
    type: 'quote',
    name: 'Alex Lin',
    role: 'Growth at Replit',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
    text: 'Akino Studio moves fast and produces really high quality content, filling in the gap that we didn\'t know possible, the firs...',
  },
]

const Testimonials = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">
        <p className="testimonials-subtitle">Partners in innovation</p>
        <h2 className="testimonials-title">Trusted by brands that move fast</h2>

        <div className="bento-grid">
          {testimonials.map((item, index) => {
            if (item.type === 'image') {
              return (
                <div key={index} className="bento-item bento-image">
                  <img src={item.image} alt="Client work" />
                </div>
              )
            }

            if (item.type === 'highlight') {
              return (
                <div key={index} className="bento-item bento-highlight">
                  <strong className="bento-highlight-title">{item.title}</strong>
                  <strong className="bento-highlight-subtitle">{item.subtitle}</strong>
                  <p className="bento-highlight-text">{item.text}</p>
                </div>
              )
            }

            return (
              <div key={index} className="bento-item bento-quote">
                <div className="bento-quote-header">
                  <div className="bento-avatar">
                    <img src={item.avatar} alt={item.name} />
                  </div>
                  <div>
                    <strong className="bento-name">{item.name}</strong>
                    <span className="bento-role">{item.role}</span>
                  </div>
                </div>
                <p className="bento-text">{item.text}</p>
              </div>
            )
          })}
        </div>

        <div className="testimonials-cta">
          <button className="testimonials-cta-btn" onClick={scrollToContact}>
            <span className="cta-btn-label">Get in touch</span>
            <div className="cta-btn-hover-content">
              <span>Get in touch</span>
              <ArrowRight size={18} />
            </div>
            <div className="cta-btn-circle"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
