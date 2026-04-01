import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Copy, Check } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import sanityClient from '../sanityClient'
import staticPosts from './blogData'
import Footer from './Footer'
import './Blog.css'

const SANITY_POST_QUERY = (slug) => `*[_type == "post" && slug.current == "${slug}" && scheduledPublishDate <= now()][0] {
  title,
  "slug": slug.current,
  excerpt,
  "cover": mainImage.asset->url,
  category,
  tags,
  author,
  readTime,
  "date": scheduledPublishDate,
  "updatedAt": _updatedAt,
  rawHtml,
  body,
  seoTitle,
  seoDescription,
  seoKeywords
}`

const SANITY_LATEST_QUERY = (currentSlug) => `*[_type == "post" && slug.current != "${currentSlug}" && scheduledPublishDate <= now()] | order(scheduledPublishDate desc)[0...4] {
  title,
  "slug": slug.current,
  excerpt,
  "cover": mainImage.asset->url,
  category,
  author,
  "date": scheduledPublishDate
}`

// Converts a Sanity image asset _ref to a CDN URL
// ref format: "image-{id}-{width}x{height}-{format}"
const sanityRefToUrl = (ref) => {
  const parts = ref.split('-')
  const format = parts[parts.length - 1]
  const dimensions = parts[parts.length - 2]
  const id = parts.slice(1, parts.length - 2).join('-')
  return `https://cdn.sanity.io/images/de8oo2go/production/${id}-${dimensions}.${format}`
}

// Portable Text components for rendering Sanity rich text
const portableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      const url = sanityRefToUrl(value.asset._ref)
      const alt = value.alt || ''
      return (
        <figure className="blog-post-inline-figure">
          <img src={url} alt={alt} className="blog-post-inline-img" loading="lazy" />
          {alt && <figcaption className="blog-post-inline-caption">{alt}</figcaption>}
        </figure>
      )
    },
  },
}

/* ── Share icon SVGs ── */
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [latestPosts, setLatestPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSanity, setIsSanity] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)
  const [newsletterStatus, setNewsletterStatus] = useState('idle')
  const carouselRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setNotFound(false)

    sanityClient
      .fetch(SANITY_POST_QUERY(slug))
      .then(async (data) => {
        if (data) {
          setPost(data)
          setIsSanity(true)
          // Fetch latest posts from Sanity
          const latest = await sanityClient.fetch(SANITY_LATEST_QUERY(slug))
          if (latest && latest.length > 0) {
            setLatestPosts(latest)
          } else {
            setLatestPosts(staticPosts.filter((p) => p.slug !== slug).slice(0, 4))
          }
        } else {
          loadStaticPost()
        }
      })
      .catch(() => {
        loadStaticPost()
      })
      .finally(() => setLoading(false))
  }, [slug])

  const loadStaticPost = () => {
    const found = staticPosts.find((p) => p.slug === slug)
    if (found) {
      setPost(found)
      setIsSanity(false)
      setLatestPosts(staticPosts.filter((p) => p.slug !== slug).slice(0, 4))
    } else {
      setNotFound(true)
    }
  }

  useEffect(() => {
    if (!post) return

    /* ── SEO: Title ── */
    document.title = post.seoTitle
      ? `${post.seoTitle} | Akino Studio`
      : `${post.title} | Akino Studio Blog`

    /* ── SEO: Meta tags ── */
    const metaDescription = post.seoDescription || post.excerpt || ''
    const metaKeywords = (post.seoKeywords || []).join(', ')
    const pageUrl = `https://akinostudio.com/blog/${post.slug}`
    const dateStr = post.date || ''

    const setMeta = (name, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(name.startsWith('og:') ? 'property' : 'name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    setMeta('description', metaDescription)
    if (metaKeywords) setMeta('keywords', metaKeywords)
    setMeta('og:title', post.seoTitle || post.title)
    setMeta('og:description', metaDescription)
    setMeta('og:image', post.cover || '')
    setMeta('og:url', pageUrl)
    setMeta('og:type', 'article')
    if (dateStr) setMeta('article:published_time', dateStr)
    setMeta('article:author', post.author || 'Akino Studio')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', post.seoTitle || post.title)
    setMeta('twitter:description', metaDescription)
    setMeta('twitter:image', post.cover || '')

    /* ── SEO: Canonical ── */
    const canonical = document.getElementById('canonical-tag')
    if (canonical) canonical.setAttribute('href', pageUrl)

    /* ── Structured Data (JSON-LD) ── */
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'blog-post-schema'
    const authorName = post.author || 'Akino Studio'
    const isOrgAuthor = authorName === 'Akino Studio'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: metaDescription,
      image: post.cover,
      datePublished: dateStr,
      ...(post.updatedAt && { dateModified: post.updatedAt }),
      author: {
        '@type': isOrgAuthor ? 'Organization' : 'Person',
        name: authorName,
        ...(isOrgAuthor && { url: 'https://akinostudio.com' }),
      },
      publisher: {
        '@type': 'Organization',
        name: 'Akino Studio',
        url: 'https://akinostudio.com',
        logo: 'https://akinostudio.com/logo.svg',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
      ...(metaKeywords && { keywords: metaKeywords }),
    })
    document.head.appendChild(script)

    return () => {
      document.title = 'Akino Studio — Video Production Agency | Brand Films, Social Shorts & Campaign Videos'
      const el = document.getElementById('blog-post-schema')
      if (el) el.remove()
      // Restore canonical to homepage
      const canonical = document.getElementById('canonical-tag')
      if (canonical) canonical.setAttribute('href', 'https://akinostudio.com/')
      // Clean up injected meta tags
      ;['description', 'keywords', 'og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'article:published_time', 'article:author', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'].forEach((n) => {
        const tag = document.querySelector(`meta[name="${n}"]`) || document.querySelector(`meta[property="${n}"]`)
        if (tag) tag.remove()
      })
    }
  }, [post])

  /* ── Extract TOC headings from HTML content ── */
  const tocHeadings = useMemo(() => {
    if (!post) return []
    const html = isSanity ? (post.rawHtml || '') : (post.content || '')
    const regex = /<h2[^>]*>(.*?)<\/h2>/gi
    const headings = []
    let match
    while ((match = regex.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '')
      headings.push({ text, id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })
    }
    return headings
  }, [post, isSanity])

  /* ── Inject IDs into h2s inside the body after render ── */
  useEffect(() => {
    if (!bodyRef.current || tocHeadings.length === 0) return
    const h2s = bodyRef.current.querySelectorAll('h2')
    h2s.forEach((h2, i) => {
      if (tocHeadings[i]) h2.id = tocHeadings[i].id
    })
  }, [post, tocHeadings])

  if (notFound) return <Navigate to="/blog" replace />

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const clean = dateStr.length === 10 ? dateStr + 'T00:00:00' : dateStr
    return new Date(clean).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const getPostUrl = () => `https://akinostudio.com/blog/${slug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPostUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnX = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(getPostUrl())}&text=${encodeURIComponent(post.title)}`, '_blank')
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getPostUrl())}`, '_blank')
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getPostUrl())}`, '_blank')

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    const target = e.target
    const formData = new FormData(target)
    formData.append('access_key', 'fa79ee1b-0b70-4c39-a489-9a908d7669f5')
    formData.append('subject', 'New newsletter subscriber')
    formData.append('from_name', 'Akino Studio Blog')
    setNewsletterStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
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

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return
    const amount = carouselRef.current.offsetWidth * 0.8
    carouselRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const dateStr = post?.date || ''
  const postAuthor = post?.author || 'Akino Studio'
  const postCategory = post?.category || ''

  if (loading) {
    return (
      <div className="blog-page">
        <header className="blog-header">
          <div className="blog-header-inner">
            <Link to="/blog" className="blog-back-link">
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
            <Link to="/" className="blog-logo">
              <img src="/logo.svg" alt="Akino Studio" className="blog-logo-img" />
            </Link>
          </div>
        </header>
        <main className="blog-content">
          <div className="blog-loading">Loading article...</div>
        </main>
      </div>
    )
  }

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="blog-page">
      <header className="blog-header">
        <div className="blog-header-inner">
          <Link to="/blog" className="blog-back-link">
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
          <Link to="/" className="blog-logo">
            <img src="/logo.svg" alt="Akino Studio" className="blog-logo-img" />
          </Link>
        </div>
      </header>

      <main className="blog-content">
        <div className="blog-content-inner">
          {/* ── Post Header ── */}
          <article className="blog-post">
            <div className="blog-post-header">
              <div className="blog-post-top-meta">
                <span className="blog-post-category-pill">{postCategory}</span>
                <span className="blog-post-read-time"><Clock size={14} /> {post.readTime}</span>
              </div>
              <h1 className="blog-post-title">{post.title}</h1>
              <p className="blog-post-excerpt">{post.excerpt}</p>
            </div>

            {/* ── Cover Image ── */}
            <div className="blog-post-cover">
              <img src={post.cover} alt={post.title} />
            </div>

            {/* ── Author / Date / Share Bar ── */}
            <div className="blog-post-info-bar">
              <div className="blog-post-info-left">
                <div className="blog-post-info-item">
                  <span className="blog-post-info-label">Written by</span>
                  <span className="blog-post-info-value">{postAuthor}</span>
                </div>
                <div className="blog-post-info-item">
                  <span className="blog-post-info-label">Published on</span>
                  <time className="blog-post-info-value" dateTime={dateStr}>{formatDate(dateStr)}</time>
                </div>
              </div>
              <div className="blog-post-share">
                <button className="blog-share-btn blog-share-btn--copy" onClick={handleCopyLink}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
                <button className="blog-share-btn" onClick={shareOnX} aria-label="Share on X">
                  <XIcon />
                </button>
                <button className="blog-share-btn" onClick={shareOnFacebook} aria-label="Share on Facebook">
                  <FacebookIcon />
                </button>
                <button className="blog-share-btn" onClick={shareOnLinkedIn} aria-label="Share on LinkedIn">
                  <LinkedInIcon />
                </button>
              </div>
            </div>

            {/* ── Body + Sidebar ── */}
            <div className="blog-post-layout">
              {/* Article body */}
              <div className="blog-post-body-col">
                {isSanity && post.rawHtml ? (
                  <div
                    ref={bodyRef}
                    className="blog-post-body"
                    dangerouslySetInnerHTML={{ __html: post.rawHtml }}
                  />
                ) : isSanity && post.body ? (
                  <div ref={bodyRef} className="blog-post-body">
                    <PortableText value={post.body} components={portableTextComponents} />
                  </div>
                ) : (
                  <div
                    ref={bodyRef}
                    className="blog-post-body"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}
              </div>

              {/* Sidebar */}
              <aside className="blog-post-sidebar">
                {/* Table of Contents */}
                {tocHeadings.length > 0 && (
                  <div className="blog-sidebar-section">
                    <h4 className="blog-sidebar-title">Table of contents</h4>
                    <nav className="blog-toc">
                      {tocHeadings.map((h) => (
                        <a key={h.id} href={`#${h.id}`} className="blog-toc-link" onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                        }}>
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Newsletter */}
                <div className="blog-sidebar-section">
                  <h4 className="blog-sidebar-title">Subscribe to our newsletter</h4>
                  <form className="blog-sidebar-newsletter" onSubmit={handleNewsletterSubmit}>
                    <input
                      type="email"
                      name="newsletter_email"
                      placeholder="Enter your email"
                      required
                      className="blog-sidebar-input"
                    />
                    <button type="submit" className="blog-sidebar-subscribe" disabled={newsletterStatus === 'sending'}>
                      {newsletterStatus === 'sending' ? 'Sending...' : 'Subscribe'}
                    </button>
                    {newsletterStatus === 'success' && <p className="blog-sidebar-msg blog-sidebar-msg--ok">Thanks for subscribing!</p>}
                    {newsletterStatus === 'error' && <p className="blog-sidebar-msg blog-sidebar-msg--err">Something went wrong. Try again.</p>}
                  </form>
                </div>

                {/* Share icons (bottom of sidebar) */}
                <div className="blog-sidebar-section blog-sidebar-share">
                  <button className="blog-share-icon" onClick={handleCopyLink} aria-label="Copy link">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                  <button className="blog-share-icon" onClick={shareOnX} aria-label="Share on X">
                    <XIcon />
                  </button>
                  <button className="blog-share-icon" onClick={shareOnFacebook} aria-label="Share on Facebook">
                    <FacebookIcon />
                  </button>
                  <button className="blog-share-icon" onClick={shareOnLinkedIn} aria-label="Share on LinkedIn">
                    <LinkedInIcon />
                  </button>
                </div>
              </aside>
            </div>
          </article>
        </div>

        {/* ═══ Latest Posts Carousel ═══ */}
        {latestPosts.length > 0 && (
          <section className="blog-latest-section">
            <div className="blog-latest-inner">
              <div className="blog-latest-header">
                <div>
                  <span className="blog-latest-label">Latest posts</span>
                  <h2 className="blog-latest-heading">From the blog</h2>
                  <p className="blog-latest-subtitle">Interviews, tips, guides, industry best practices, and news.</p>
                </div>
                <Link to="/blog" className="blog-latest-view-all">View all posts</Link>
              </div>

              <div className="blog-latest-carousel-wrap">
                <div className="blog-latest-carousel" ref={carouselRef}>
                  {latestPosts.map((p) => (
                    <Link to={`/blog/${p.slug}`} className="blog-latest-card" key={p.slug}>
                      <div className="blog-latest-card-img">
                        <img src={p.cover} alt={p.title} />
                        <div className="blog-latest-card-overlay">
                          <div className="blog-latest-card-overlay-left">
                            <span className="blog-latest-card-author">{p.author || 'Akino Studio'}</span>
                            <span className="blog-latest-card-date">{formatDate(p.date || '')}</span>
                          </div>
                          <span className="blog-latest-card-cat">{p.category}</span>
                        </div>
                      </div>
                      <h3 className="blog-latest-card-title">{p.title}</h3>
                      <p className="blog-latest-card-excerpt">{p.excerpt}</p>
                      <span className="blog-latest-card-link">Read post <ArrowUpRight size={16} /></span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="blog-latest-arrows">
                <button className="blog-latest-arrow" onClick={() => scrollCarousel(-1)} aria-label="Previous">
                  <ArrowLeft size={20} />
                </button>
                <button className="blog-latest-arrow" onClick={() => scrollCarousel(1)} aria-label="Next">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default BlogPost
