import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import sanityClient from '../sanityClient'
import staticPosts from './blogData'
import Footer from './Footer'
import './Blog.css'

const SANITY_POSTS_QUERY = `*[_type == "post" && scheduledPublishDate <= now()] | order(scheduledPublishDate desc) {
  title,
  "slug": slug.current,
  excerpt,
  "cover": mainImage.asset->url,
  category,
  tags,
  author,
  readTime,
  "date": scheduledPublishDate
}`

const POSTS_PER_PAGE = 6
const RECENT_COUNT = 3

const TAG_COLOR_MAP = {
  'Strategy': 'purple',
  'Marketing': 'pink',
  'Content': 'purple',
  'Behind the Scenes': 'gray',
  'Production': 'purple',
  'Education': 'pink',
  'Branding': 'purple',
  'Tips': 'pink',
  'Social Media': 'purple',
  'Storytelling': 'pink',
}

const getTagColor = (tag) => TAG_COLOR_MAP[tag] || 'gray'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Blog | Akino Studio — Video Production Insights & Tips'

    /* ── SEO: Canonical for /blog listing ── */
    const canonical = document.getElementById('canonical-tag')
    if (canonical) canonical.setAttribute('href', 'https://akinostudio.com/blog')

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
      const canonical = document.getElementById('canonical-tag')
      if (canonical) canonical.setAttribute('href', 'https://akinostudio.com/')
    }
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const clean = dateStr.length === 10 ? dateStr + 'T00:00:00' : dateStr
    return new Date(clean).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const getDateString = (post) => post.date || post.publishedAt || ''

  const getPostTags = (post) => {
    if (post.tags && post.tags.length > 0) return post.tags
    if (post.category) return [post.category]
    return []
  }

  const getPostAuthor = (post) => post.author || 'Akino Studio'

  const recentPosts = posts.slice(0, RECENT_COUNT)
  const allPosts = posts.slice(RECENT_COUNT)
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE))
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    document.getElementById('blog-all')?.scrollIntoView({ behavior: 'smooth' })
  }

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1, 2, 3, 4, 5)
      pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const renderTags = (tags) => {
    if (!tags || tags.length === 0) return null
    return (
      <div className="blog-tags">
        {tags.map((tag) => (
          <span key={tag} className={`blog-tag blog-tag--${getTagColor(tag)}`}>
            {tag}
          </span>
        ))}
      </div>
    )
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
          {loading ? (
            <div className="blog-loading">Loading posts...</div>
          ) : (
            <>
              {/* ── Recent Blog Posts ── */}
              {recentPosts.length > 0 && (
                <section className="blog-recent">
                  <h2 className="blog-section-title">Recent blog posts</h2>
                  <div className="blog-recent-grid">
                    {/* Featured post (large, left) */}
                    {recentPosts[0] && (
                      <Link to={`/blog/${recentPosts[0].slug}`} className="blog-featured-card">
                        <div className="blog-featured-image">
                          <img src={recentPosts[0].cover} alt={recentPosts[0].title} />
                        </div>
                        <div className="blog-featured-info">
                          <p className="blog-card-meta">
                            <span className="blog-author">{getPostAuthor(recentPosts[0])}</span>
                            <span className="blog-meta-dot">•</span>
                            <span>{formatDate(getDateString(recentPosts[0]))}</span>
                          </p>
                          <h3 className="blog-card-title">
                            {recentPosts[0].title}
                            <ArrowUpRight size={20} className="blog-card-arrow" />
                          </h3>
                          <p className="blog-card-excerpt">{recentPosts[0].excerpt}</p>
                          {renderTags(getPostTags(recentPosts[0]))}
                        </div>
                      </Link>
                    )}

                    {/* Stacked side posts (right) */}
                    <div className="blog-recent-side">
                      {recentPosts.slice(1, 3).map((post) => (
                        <Link to={`/blog/${post.slug}`} className="blog-side-card" key={post.slug}>
                          <div className="blog-side-image">
                            <img src={post.cover} alt={post.title} />
                          </div>
                          <div className="blog-side-info">
                            <p className="blog-card-meta">
                              <span className="blog-author">{getPostAuthor(post)}</span>
                              <span className="blog-meta-dot">•</span>
                              <span>{formatDate(getDateString(post))}</span>
                            </p>
                            <h3 className="blog-card-title">{post.title}</h3>
                            <p className="blog-card-excerpt">{post.excerpt}</p>
                            {renderTags(getPostTags(post))}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── Divider ── */}
              {allPosts.length > 0 && <hr className="blog-divider" />}

              {/* ── All Blog Posts ── */}
              {allPosts.length > 0 && (
                <section className="blog-all" id="blog-all">
                  <h2 className="blog-section-title">All blog posts</h2>
                  <div className="blog-all-grid">
                    {paginatedPosts.map((post) => (
                      <Link to={`/blog/${post.slug}`} className="blog-grid-card" key={post.slug}>
                        <div className="blog-grid-card-image">
                          <img src={post.cover} alt={post.title} />
                        </div>
                        <div className="blog-grid-card-info">
                          <p className="blog-card-meta">
                            <span className="blog-author">{getPostAuthor(post)}</span>
                            <span className="blog-meta-dot">•</span>
                            <span>{formatDate(getDateString(post))}</span>
                          </p>
                          <h3 className="blog-card-title">
                            {post.title}
                            <ArrowUpRight size={20} className="blog-card-arrow" />
                          </h3>
                          <p className="blog-card-excerpt">{post.excerpt}</p>
                          {renderTags(getPostTags(post))}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="blog-pagination">
                      <button
                        className="blog-pagination-btn blog-pagination-prev"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ArrowLeft size={16} />
                        Previous
                      </button>

                      <div className="blog-pagination-numbers">
                        {getPageNumbers().map((page, i) =>
                          page === '...' ? (
                            <span key={`dots-${i}`} className="blog-pagination-dots">...</span>
                          ) : (
                            <button
                              key={page}
                              className={`blog-pagination-num ${page === currentPage ? 'blog-pagination-num--active' : ''}`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          )
                        )}
                      </div>

                      <button
                        className="blog-pagination-btn blog-pagination-next"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ArrowRight size={16} />
                      </button>
                    </nav>
                  )}
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Blog
