import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thanks for reaching out! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <span className="section-tag">&lt; Let's talk &gt;</span>
          <h2 className="contact-title">Ready to create content that matters?</h2>
          <p className="contact-desc">
            We'd love to hear about your project. Drop us a line and let's make something remarkable together.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="company"
            placeholder="Company / Brand"
            value={formData.company}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contact-submit">
            Get in touch
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
