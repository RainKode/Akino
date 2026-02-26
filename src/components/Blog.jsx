import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import sanityClient from '../sanityClient'
import staticPosts from './blogData'
import './Blog.css'

const SANITY_POSTS_QUERY = `*[_type == "post" && scheduledPublishDate <= now()] | order(scheduledPublishDate desc) {
  title,
  "slug": slug.current,
  excerpt,
  "cover": mainImage.asset->url,
  category,
  readTime,
  "date": scheduledPublishDate
}`

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Blog | Akino Studio — Video Production Insights & Tips'

    sanityClient
      .fetch(SANITY_POSTS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setPosts(data)
        } else {
          setPosts(staticPosts)
        }
      })
      .catch(() => {
        setPosts(staticPosts)
      })
      .finally(() => setLoading(false))

    return () => {
      document.title = 'Akino Studio — Video Production Agency | Brand Films, Social Shorts & Campaign Videos'
    }
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const clean = dateStr.length === 10 ? dateStr + 'T00:00:00' : dateStr
    return new Date(clean).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getDateString = (post) => {
    return post.date || post.publishedAt || ''
  }

  return (
    <div className="blog-page">
      <header className="blog-header">
        <div className="blog-header-inner">
          <Link to="/" className="blog-back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <Link to="/" className="blog-logo">
            <img src="/logo.svg" alt="Akino Studio" className="blog-logo-img" />
          </Link>
        </div>
      </header>

      <main className="blog-content">
        <div className="blog-content-inner">
          <div className="blog-hero">
            <span className="section-tag">&lt; Blog &gt;</span>
            <h1 className="blog-title">Insights & Ideas</h1>
            <p className="blog-subtitle">
              Thoughts on video production, creative strategy, and building brands through content.
            </p>
          </div>

          {loading ? (
            <div className="blog-loading">Loading posts...</div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
                  <div className="blog-card-image">
                    <img src={post.cover} alt={post.title} />
                    <span className="blog-card-category">{post.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <time dateTime={getDateString(post)}>{formatDate(getDateString(post))}</time>
                      <span className="blog-card-dot">&middot;</span>
                      <span><Clock size={14} /> {post.readTime}</span>
                    </div>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-card-link">
                      Read article <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
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

export default Blog
