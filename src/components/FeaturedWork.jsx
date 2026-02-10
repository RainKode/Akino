import React, { useState } from 'react'
import './FeaturedWork.css'

const reels = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=350&h=620&fit=crop',
    title: 'Brand Story — Buldak',
    platform: 'TikTok',
    views: '2.3M',
    likes: '89K',
    link: '#'
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=350&h=620&fit=crop',
    title: 'Product Launch — Chef\'s Table',
    platform: 'Instagram',
    views: '1.8M',
    likes: '56K',
    link: '#'
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=350&h=620&fit=crop',
    title: 'Social Campaign — Street Eats',
    platform: 'YouTube Shorts',
    views: '4.1M',
    likes: '120K',
    link: '#'
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=350&h=620&fit=crop',
    title: 'Viral Series — Day in Life',
    platform: 'TikTok',
    views: '6.7M',
    likes: '210K',
    link: '#'
  },
  {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=350&h=620&fit=crop',
    title: 'Documentary — Behind the Brand',
    platform: 'Instagram',
    views: '890K',
    likes: '34K',
    link: '#'
  },
  {
    id: 6,
    thumbnail: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=350&h=620&fit=crop',
    title: 'UGC Campaign — Taste Test',
    platform: 'TikTok',
    views: '3.2M',
    likes: '145K',
    link: '#'
  }
]

const FeaturedWork = () => {
  const [hoveredReel, setHoveredReel] = useState(null)
  const activeReel = hoveredReel !== null ? reels[hoveredReel] : null

  return (
    <section className="featured-work" id="featured-work">
      <div className="featured-work-inner">
        <div className="featured-header">
          <span className="section-tag">&lt; Featured Work &gt;</span>
          <h2 className="featured-title">Content that breaks the internet</h2>
        </div>

        {/* Live stats bar */}
        <div className="featured-stats-bar">
          <div className="featured-stat">
            <span className="featured-stat-number">{activeReel ? activeReel.views : '6.1M+'}</span>
            <span className="featured-stat-label">Views delivered</span>
          </div>
          <div className="featured-stat">
            <span className="featured-stat-number">{activeReel ? activeReel.likes : '22k+'}</span>
            <span className="featured-stat-label">Likes</span>
          </div>
          <div className="featured-stat">
            <span className="featured-stat-number">{activeReel ? activeReel.platform : 'Multi-platform'}</span>
            <span className="featured-stat-label">Platform</span>
          </div>
        </div>

        {/* Reels grid */}
        <div className="reels-grid">
          {reels.map((reel, index) => (
            <a
              key={reel.id}
              href={reel.link}
              className="reel-item"
              onMouseEnter={() => setHoveredReel(index)}
              onMouseLeave={() => setHoveredReel(null)}
            >
              <div className="reel-thumb">
                <img src={reel.thumbnail} alt={reel.title} />
                <div className="reel-play">
                  <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="reel-info-overlay">
                  <span className="reel-platform-tag">{reel.platform}</span>
                  <h4>{reel.title}</h4>
                  <div className="reel-mini-stats">
                    <span>👁 {reel.views}</span>
                    <span>❤️ {reel.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
