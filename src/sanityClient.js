/* ═══════════════════════════════════════════════════════════════
   SANITY CLIENT CONFIGURATION
   
   To set up your Sanity project:
   1. Go to https://www.sanity.io/manage and create a free project
   2. Copy your Project ID and paste it below
   3. Under API → Tokens, create a read-only token (or use public dataset)
   4. Under API → CORS Origins, add your domains:
      - http://localhost:5173 (for dev)
      - https://akinostudio.com (for production)
   ═══════════════════════════════════════════════════════════════ */

import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: '15a0z2p7',
  dataset: 'production',
  apiVersion: '2026-02-26',
  useCdn: false, // `false` to use the live API directly — avoids CDN hangs during SPA navigation
})

export default sanityClient
