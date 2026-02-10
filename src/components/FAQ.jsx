import React, { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './FAQ.css'

/* ── Accordion primitives ── */

function AccordionGroup({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue || null)

  const toggle = useCallback((value) => {
    setActive((prev) => (prev === value ? null : value))
  }, [])

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null
    const value = child.props.value
    const isActive = active === value
    return React.cloneElement(child, { isActive, onToggle: () => toggle(value) })
  })
}

function AccordionItem({ children, isActive, onToggle, value }) {
  return (
    <div className={`faq-item ${isActive ? 'faq-item--active' : ''}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isActive, onToggle })
          : child
      )}
    </div>
  )
}

function AccordionHeader({ children, isActive, onToggle }) {
  return (
    <button
      type="button"
      className={`faq-header ${isActive ? 'faq-header--active' : ''}`}
      aria-expanded={isActive}
      onClick={onToggle}
    >
      <span>{children}</span>
      <svg
        className={`faq-chevron ${isActive ? 'faq-chevron--open' : ''}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  )
}

function AccordionPanel({ children, isActive }) {
  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          className="faq-panel-wrapper"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
        >
          <motion.div
            className="faq-panel"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── FAQ data ── */

const faqLeft = [
  {
    id: 'item-1',
    question: 'What types of video content do you produce?',
    answer:
      'We produce a wide range of content — from brand films and social media shorts to full campaign videos, product launches, and documentary-style storytelling. Whatever the format, we tailor it to your goals.',
  },
  {
    id: 'item-2',
    question: 'How does the production process work?',
    answer:
      'We follow a streamlined 4-step process: Discovery & Strategy, Creative Development, Production & Filming, and Post-Production & Delivery. We keep you involved at every stage so there are no surprises.',
  },
  {
    id: 'item-3',
    question: 'What is your typical turnaround time?',
    answer:
      'Most projects are delivered within 2–4 weeks depending on complexity. Rush delivery is available for time-sensitive campaigns — just let us know your deadline.',
  },
]

const faqRight = [
  {
    id: 'item-4',
    question: 'Do you work with brands outside your city?',
    answer:
      "Absolutely. While we're based locally, we work with brands globally. We handle remote pre-production seamlessly and can travel for shoots when needed.",
  },
  {
    id: 'item-5',
    question: 'How much does a typical project cost?',
    answer:
      'Every project is unique, so pricing depends on scope, length, and deliverables. We offer transparent quotes after an initial discovery call — no hidden fees.',
  },
  {
    id: 'item-6',
    question: 'Can you handle our ongoing content needs?',
    answer:
      'Yes! Many of our clients work with us on retainer for ongoing social content, monthly video packages, or campaign rollouts. We scale to fit your needs.',
  },
]

/* ── FAQ Section ── */

const FAQ = () => {
  return (
    <section className="faq-section" id="faq">
      <div className="faq-section-inner">
        <div className="faq-section-header">
          <span className="faq-label">FAQ</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about working with us.
          </p>
        </div>

        <div className="faq-grid">
          {/* Left column */}
          <div className="faq-column">
            <AccordionGroup defaultValue="item-2">
              {faqLeft.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionHeader>{item.question}</AccordionHeader>
                  <AccordionPanel>{item.answer}</AccordionPanel>
                </AccordionItem>
              ))}
            </AccordionGroup>
          </div>

          {/* Right column */}
          <div className="faq-column">
            <AccordionGroup defaultValue="item-4">
              {faqRight.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionHeader>{item.question}</AccordionHeader>
                  <AccordionPanel>{item.answer}</AccordionPanel>
                </AccordionItem>
              ))}
            </AccordionGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
