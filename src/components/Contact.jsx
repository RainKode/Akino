import React, { useState } from 'react'
import './Contact.css'

const WEB3FORMS_KEY = '0cc0db32-df50-4683-8f2e-07c693fc7e15'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry from ${formData.name}`,
          from_name: 'Akino Studio Website',
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Not provided',
          message: formData.message,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
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
          {/* Honeypot spam prevention */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <input
            type="text"
            name="company"
            placeholder="Company / Brand"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
          />
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contact-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Get in touch'}
          </button>
          {status === 'success' && (
            <p className="contact-status contact-status--success">Thanks for reaching out! We'll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="contact-status contact-status--error">Something went wrong. Please try again or email us directly.</p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
