# Copilot Instructions — Offrame Video Production Agency

## Project Overview

Single-page marketing site for "Offrame", a video production agency. React 19 + Vite 7, no routing — all content is rendered as sequential sections in `src/App.jsx` wrapped in a Lenis smooth-scroll provider. No backend, no tests, no CI — purely a static frontend.

## Architecture

- **Rendered section order** (as composed in `App.jsx`): `Navbar → Hero → WhatWeDo → ProjectShowcase → Process → Testimonials → FAQ → Contact → Footer`.
- **Co-located CSS**: Every component in `src/components/` has a paired `.css` file imported directly (e.g., `Hero.jsx` + `Hero.css`). No CSS modules, no Tailwind in `src/` — use plain CSS with BEM-like class names (e.g., `.hero-stack--red`, `.faq-item--active`, `.expand-card-overlay`).
- **CSS custom properties**: Global design tokens live in `src/index.css` under `:root` (e.g., `--orange`, `--dark`, `--radius`, `--transition`). Always reference these instead of hardcoding colors/values.
- **Fonts**: Inter (body) + Playfair Display (accent), loaded via Google Fonts in `index.html`.
- **Smooth scrolling**: Lenis (`lenis/react` → `<ReactLenis root>`) wraps the entire app. Navigation uses `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })` with section `id` attributes.

## Key Conventions

- **Component pattern**: Functional arrow-function components with default export. Data arrays (projects, testimonials, FAQ items, process phases, reels) are declared as `const` above the component — never inline in JSX.
- **Motion library** (package: `motion`, formerly Framer Motion):
  - For animated JSX elements, `AnimatePresence`, and `useInView`: import from **`motion/react`** — e.g., `import { motion, AnimatePresence } from 'motion/react'`.
  - For imperative scroll-linked animations: import `animate` and `scroll` from **`motion`** — e.g., `import { animate, scroll } from 'motion'` (see `WhatWeDo.jsx`).
  - **Never** import from `framer-motion`.
- **Icons**: `lucide-react` for standard icons. Inline SVGs are used for custom icons (hamburger, close, chevrons, arrows).
- **Section tags**: `<span className="section-tag">&lt; Label &gt;</span>` with HTML entities for angle brackets.
- **Scroll-driven state**: `Hero`, `Process`, and `ProjectShowcase` compute an active index from scroll position via `useRef` + `window.addEventListener('scroll', ...)` with `{ passive: true }`. Follow this pattern (not IntersectionObserver) for scroll-activated sections.
- **Scroll-linked horizontal animation**: `WhatWeDo` uses Motion's `scroll(animate(...), { target })` API to drive a horizontal track via vertical scroll. Use this pattern for similar horizontal-scroll-on-vertical-scroll effects.
- **Video cards**: `ProjectShowcase` renders hover-to-play video cards — thumbnail (`.jpg`) shown by default, `.webm` video plays on mouse enter. Local video assets live in `public/videos/<project-slug>/` with matching `.webm` + `.jpg` pairs.
- **No backend**: Contact form and newsletter use `alert()` / inline popup placeholders. No API calls exist.

## Unused / Orphaned Code

Do not import from these for new `src/` work:
- `components/uilayouts/accordion.jsx` and `lib/utils.js` (Tailwind Merge `cn()`) — root-level legacy files, unused by any `src/` component. FAQ has its own accordion in `FAQ.jsx`.
- `FeaturedWork.jsx` — imported in `App.jsx` but **not rendered** in the JSX tree. Treat as dormant.
- `EveryFrame.jsx` / `EveryFrame.css` — exist in `src/components/` but not imported or rendered anywhere.

## Development

```bash
npm run dev      # Vite dev server (HMR)
npm run build    # Production build
npm run preview  # Preview production build locally
```

No test runner or linter is configured.

## When Adding a New Section

1. Create `src/components/SectionName.jsx` + `src/components/SectionName.css`.
2. Import and place `<SectionName />` in `App.jsx` at the correct position in the section order.
3. Add a unique `id` attribute to the section's root element for scroll navigation.
4. If the section should appear in the nav menu, add an entry to the `navItems` array in `Navbar.jsx` (maps `label` → `target` section ID).
5. Use CSS custom properties from `src/index.css` for colors, radii, and transitions.
