import React, { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import sanityClient from '../sanityClient'
import staticPosts from './blogData'
import './Blog.css'

const SANITY_POST_QUERY = (slug) => `*[_type == "post" && slug.current == "${slug}" && scheduledPublishDate <= now()][0] {
  title,
  "slug": slug.current,
  excerpt,
  "cover": mainImage.asset->url,
  category,
  readTime,
  "date": scheduledPublishDate,
  rawHtml,
  body
}`

const SANITY_ADJACENT_QUERY = (date) => `{
  "prev": *[_type == "post" && scheduledPublishDate < "${date}" && scheduledPublishDate <= now()] | order(scheduledPublishDate desc)[0] { title, "slug": slug.current },
  "next": *[_type == "post" && scheduledPublishDate > "${date}" && scheduledPublishDate <= now()] | order(scheduledPublishDate asc)[0] { title, "slug": slug.current }
}`

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
      return <img src={value.asset.url} alt="" className="blog-post-inline-img" />
    },
  },
}

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [prevPost, setPrevPost] = useState(null)
  const [nextPost, setNextPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSanity, setIsSanity] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setNotFound(false)

    // Try Sanity first, fall back to static data
    sanityClient
      .fetch(SANITY_POST_QUERY(slug))
      .then(async (data) => {
        if (data) {
          setPost(data)
          setIsSanity(true)

          // Fetch adjacent posts from Sanity
          if (data.date) {
            const adjacent = await sanityClient.fetch(SANITY_ADJACENT_QUERY(data.date))
            setPrevPost(adjacent.prev || null)
            setNextPost(adjacent.next || null)
          }
        } else {
          // Fall back to static posts
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
      const idx = staticPosts.findIndex((p) => p.slug === slug)
      setPrevPost(idx < staticPosts.length - 1 ? staticPosts[idx + 1] : null)
      setNextPost(idx > 0 ? staticPosts[idx - 1] : null)
    } else {
      setNotFound(true)
    }
  }

  useEffect(() => {
    if (!post) return

    document.title = `${post.title} | Akino Studio Blog`
    const dateStr = post.date || ''

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'blog-post-schema'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.cover,
      datePublished: dateStr,
      author: {
        '@type': 'Organization',
        name: 'Akino Studio',
        url: 'https://akinostudio.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Akino Studio',
        url: 'https://akinostudio.com',
        logo: 'https://akinostudio.com/logo.svg',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://akinostudio.com/blog/${post.slug}`,
      },
    })
    document.head.appendChild(script)

    return () => {
      document.title = 'Akino Studio — Video Production Agency | Brand Films, Social Shorts & Campaign Videos'
      const el = document.getElementById('blog-post-schema')
      if (el) el.remove()
    }
  }, [post])

  if (notFound) return <Navigate to="/blog" replace />

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const clean = dateStr.length === 10 ? dateStr + 'T00:00:00' : dateStr
    return new Date(clean).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const dateStr = post?.date || ''

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
        <article className="blog-post">
          <div className="blog-post-header">
            <div className="blog-post-meta">
              <span className="blog-post-category"><Tag size={14} /> {post.category}</span>
              <span className="blog-card-dot">&middot;</span>
              <time dateTime={dateStr}>{formatDate(dateStr)}</time>
              <span className="blog-card-dot">&middot;</span>
              <span><Clock size={14} /> {post.readTime}</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-excerpt">{post.excerpt}</p>
          </div>

          <div className="blog-post-cover">
            <img src={post.cover} alt={post.title} />
          </div>

          {/* Render content: rawHtml (priority) → Portable Text → static HTML fallback */}
          {isSanity && post.rawHtml ? (
            <div
              className="blog-post-body"
              dangerouslySetInnerHTML={{ __html: post.rawHtml }}
            />
          ) : isSanity && post.body ? (
            <div className="blog-post-body">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          ) : (
            <div
              className="blog-post-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Post navigation */}
          <nav className="blog-post-nav">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="blog-post-nav-link blog-post-nav-link--prev">
                <span className="blog-post-nav-label">Previous article</span>
                <span className="blog-post-nav-title">{prevPost.title}</span>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link to={`/blog/${nextPost.slug}`} className="blog-post-nav-link blog-post-nav-link--next">
                <span className="blog-post-nav-label">Next article</span>
                <span className="blog-post-nav-title">{nextPost.title}</span>
              </Link>
            ) : <div />}
          </nav>
        </article>
      </main>

      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <span>&copy; 2026 Akino Studio. All rights reserved.</span>
          <Link to="/" className="blog-home-link">Back to Home</Link>
        </div>
      </footer>
    </div>
  )
}

export default BlogPost
