/**
 * Auto-generates public/sitemap.xml before every build.
 * Fetches all published blog post slugs + dates from Sanity,
 * then writes the complete sitemap including static pages.
 *
 * Run automatically via: npm run build
 */

import { createClient } from '@sanity/client'
import { writeFileSync } from 'fs'

const client = createClient({
  projectId: 'de8oo2go',
  dataset: 'production',
  apiVersion: '2026-02-26',
  useCdn: false,
})

const SITE_URL = 'https://akinostudio.com'

const staticPages = [
  { url: '/',               changefreq: 'weekly',  priority: '1.0', lastmod: null },
  { url: '/blog',           changefreq: 'weekly',  priority: '0.8', lastmod: null },
  { url: '/colour-grading', changefreq: 'monthly', priority: '0.7', lastmod: null },
  { url: '/privacy-policy', changefreq: 'yearly',  priority: '0.3', lastmod: null },
]

function today() {
  return new Date().toISOString().split('T')[0]
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

async function generateSitemap() {
  console.log('🗺  Generating sitemap...')

  // Fetch all published posts from Sanity
  let posts = []
  try {
    posts = await client.fetch(
      `*[_type == "post" && scheduledPublishDate <= now()] | order(scheduledPublishDate desc) {
        "slug": slug.current,
        "date": scheduledPublishDate
      }`
    )
    console.log(`   Found ${posts.length} published post(s) in Sanity.`)
  } catch (err) {
    console.warn('   ⚠ Could not reach Sanity — sitemap will include static pages only.')
    console.warn('  ', err.message)
  }

  const buildDate = today()

  const staticEntries = staticPages.map(({ url, changefreq, priority }) =>
    urlEntry({
      loc: `${SITE_URL}${url}`,
      lastmod: buildDate,
      changefreq,
      priority,
    })
  )

  const postEntries = posts.map(({ slug, date }) =>
    urlEntry({
      loc: `${SITE_URL}/blog/${slug}`,
      lastmod: date ? date.split('T')[0] : buildDate,
      changefreq: 'monthly',
      priority: '0.7',
    })
  )

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...postEntries,
    '</urlset>',
    '',
  ].join('\n')

  writeFileSync('public/sitemap.xml', sitemap, 'utf-8')
  console.log(`✅ Sitemap written — ${staticEntries.length + postEntries.length} URLs total.`)
}

generateSitemap()
