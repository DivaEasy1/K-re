<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project
K-Ré — Kayak & Paddle presentation website
for Île de Ré, France. Franchise of Kayakomat.

## Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS + Shadcn/UI
- Framer Motion
- Leaflet.js (dynamic import only, no SSR)
- EmailJS (contact form)
- Static JSON files (no backend)

## Rules
- All text content in FRENCH
- No backend, no API routes, no database
- All data comes from /src/data/*.json
- "Book" buttons always link to kayakomat.com
- Leaflet always uses dynamic import
- Use next/image for all images
- Mobile first, then desktop

## Structure
src/
├── app/          → Pages (App Router)
├── components/   → UI components
├── data/         → JSON data files
├── types/        → TypeScript interfaces
└── lib/          → Utilities

## Commands
npm run dev       → Start development
npm run build     → Production build
npm run lint      → Run ESLint

## Phase 2 (later)
Admin dashboard
JSON files will be replaced by API calls.
Keep components clean and data-agnostic.
