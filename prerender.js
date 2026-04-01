/**
 * Post-build pre-rendering script.
 * Renders the SPA in a headless browser (Puppeteer) and saves
 * fully-rendered HTML for every route, so crawlers receive real content
 * instead of an empty <div id="root"></div>.
 *
 * Fetches published blog slugs from Sanity so blog posts are
 * also prerendered. Run automatically via: npm run build
 */

import { createClient } from '@sanity/client'
import { mkdirSync, writeFileSync, readFileSync, statSync } from 'fs'
import { createServer } from 'http'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DIST_DIR = join(__dirname, 'dist')
const PORT = 4173

const sanity = createClient({
  projectId: '15a0z2p7',
  dataset: 'production',
  apiVersion: '2026-02-26',
  useCdn: false,
})

/* Routes that always exist */
const STATIC_ROUTES = ['/', '/blog', '/privacy-policy', '/colour-grading']

/* ── Tiny static-file server with SPA fallback ── */
const MIME = {
  '.html': 'text/html',      '.js': 'text/javascript',
  '.css': 'text/css',        '.json': 'application/json',
  '.png': 'image/png',       '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',     '.svg': 'image/svg+xml',
  '.webm': 'video/webm',     '.mp4': 'video/mp4',
  '.webp': 'image/webp',     '.gif': 'image/gif',
  '.woff': 'font/woff',      '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
}

function startServer() {
  const fallback = readFileSync(join(DIST_DIR, 'index.html'))

  const server = createServer((req, res) => {
    const urlPath = req.url.split('?')[0]
    const filePath = join(DIST_DIR, urlPath)

    try {
      const stat = statSync(filePath)
      if (stat.isFile()) {
        const ext = extname(filePath)
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
        res.end(readFileSync(filePath))
        return
      }
    } catch { /* not a file — fall through */ }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(fallback)
  })

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`   Server → http://localhost:${PORT}`)
      resolve(server)
    })
  })
}

/* ── Main ── */
async function prerender() {
  console.log('\n🖨  Pre-rendering pages for SEO …')

  /* 1. Collect routes */
  let blogRoutes = []
  try {
    const posts = await sanity.fetch(
      `*[_type == "post" && scheduledPublishDate <= now()] | order(scheduledPublishDate desc) {
        "slug": slug.current
      }`
    )
    blogRoutes = posts.map((p) => `/blog/${p.slug}`)
    console.log(`   ${blogRoutes.length} blog post(s) found in Sanity.`)
  } catch (err) {
    console.warn('   ⚠ Could not reach Sanity — only static routes will be prerendered.')
    console.warn('  ', err.message)
  }

  const routes = [...STATIC_ROUTES, ...blogRoutes]

  /* 2. Start local preview server */
  const server = await startServer()

  /* 3. Launch headless browser */
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',          // bypass CORS for Sanity API calls
      '--disable-features=IsolateOrigins',
    ],
  })

  let ok = 0

  for (const route of routes) {
    try {
      const page = await browser.newPage()

      /* Block video/media downloads — we only need the DOM HTML,
         and large .webm files cause navigation timeouts. */
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        if (req.resourceType() === 'media') {
          req.abort()
        } else {
          req.continue()
        }
      })

      /* networkidle0 waits until all network requests (including Sanity
         API calls) have finished. With media blocked, this won't stall
         on large video files. */
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      /* Extra time for React to re-render after async data arrives */
      await new Promise((r) => setTimeout(r, 2000))

      const html = await page.content()

      if (route === '/') {
        writeFileSync(join(DIST_DIR, 'index.html'), html)
      } else {
        const dir = join(DIST_DIR, route)
        mkdirSync(dir, { recursive: true })
        writeFileSync(join(dir, 'index.html'), html)
      }

      ok++
      console.log(`   ✓ ${route}`)
      await page.close()
    } catch (err) {
      console.error(`   ✗ ${route} — ${err.message}`)
    }
  }

  await browser.close()
  server.close()

  console.log(`\n   ✅ Pre-rendered ${ok}/${routes.length} page(s).\n`)
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
