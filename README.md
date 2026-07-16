# NexaFlow — SaaS Landing Page + AI Assistant

<p align="center">
  <img src="client/public/favicon.svg" width="72" alt="NexaFlow logo" />
</p>

<p align="center">
  <strong>The operating system for high-performance teams.</strong><br/>
  A production-ready SaaS marketing site with a streaming AI chat assistant — free LLM provider included.
</p>

<p align="center">
  <a href="https://nexa-flow-fawn.vercel.app"><strong>Live demo</strong></a>
  ·
  <a href="https://www.behance.net/gallery/252848357/NexaFlow-Modern-SaaS-Platform-UIUX"><strong>Behance case study</strong></a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" />
  <img alt="Groq" src="https://img.shields.io/badge/Groq-Llama%203.3%2070B-F55036" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## Overview

NexaFlow is a dark-themed, animation-rich landing page for a fictional AI-powered team workspace, built as a real MVP:

- **Marketing site** — hero with typing animation, feature grid, animated stats, testimonials, pricing with monthly/yearly toggle, FAQ accordion, brand marquee, and CTA banner
- **Secondary pages** — About (timeline, values, team), Contact (validated form, offices map), Sign-in (social + email), and a custom 404
- **AI assistant** — floating chat widget that streams responses from any OpenAI-compatible LLM provider (Groq free tier by default) through a hardened Express proxy

## Features

| Area | Highlights |
|---|---|
| 🎨 UI | Framer Motion micro-interactions, floating cards, cursor glow, scroll progress bar |
| 🤖 AI chat | Server-Sent Events streaming, typing indicator, suggested prompts, graceful error states |
| 🧭 Routing | React Router 7, lazy-loaded routes, scroll restoration, hash-anchor navigation, 404 page |
| 🔍 SEO | Per-route titles/descriptions, Open Graph + Twitter cards, JSON-LD, sitemap, robots.txt |
| ♿ A11y | Keyboard-accessible FAQ & pricing toggle, focus-visible rings, `prefers-reduced-motion`, ARIA labels |
| 🔐 Security | CORS allowlist, input validation, rate limiting, capped history, no internal error leakage |
| ⚡ Performance | Route-level code splitting, vendor chunking, no CSS framework payload, font preconnect |

## Tech Stack

**Client:** React 19 · Vite 8 · SCSS (custom design system) · Framer Motion · React Router 7 · react-type-animation · react-countup · react-fast-marquee

**Server:** Node 18+ · Express 5 · native `fetch` to any OpenAI-compatible LLM API (Groq / OpenRouter / Gemini) · dotenv · cors

## Architecture

```
Landing Page - Nexa flows/
├── client/                     # React SPA (Vite)
│   ├── public/                 # favicon, robots.txt, sitemap.xml, manifest
│   └── src/
│       ├── animations/         # Shared Framer Motion variants
│       ├── components/         # One folder per component (JSX + SCSS partial)
│       ├── data/content.js     # All marketing copy in one place
│       ├── hooks/              # Scroll / mouse / intersection hooks
│       ├── layouts/            # App shell (nav, footer, chat widget, extras)
│       ├── pages/              # Home, About, Contact, SignIn, NotFound
│       ├── Routing/            # Routes + titles + scroll management
│       └── styles/             # Design tokens, mixins, global styles
└── server/                     # Express API proxy for the LLM provider
    ├── api.js                  # Chat (streaming + non-streaming), task & content generation
    └── .env.example            # Required environment variables
```

The API key never reaches the browser: the client talks only to the Express server, which validates and rate-limits requests before forwarding them to the LLM provider.

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A free [Groq API key](https://console.groq.com/keys) (only needed for the chat assistant — no credit card required)

### 1. Server

```bash
cd server
npm install
cp .env.example .env      # then paste your LLM_API_KEY (free Groq key)
npm run dev               # http://localhost:3000
```

### 2. Client

```bash
cd client
npm install
cp .env.example .env      # optional — defaults to http://localhost:3000
npm run dev               # http://localhost:5173
```

### Environment Variables

<details>
<summary><strong>server/.env</strong></summary>

| Variable | Required | Default | Description |
|---|---|---|---|
| `LLM_API_KEY` | ✅ | — | Provider API key (free Groq key works) |
| `LLM_BASE_URL` | — | `https://api.groq.com/openai/v1` | Any OpenAI-compatible endpoint (Groq, OpenRouter, Gemini, …) |
| `LLM_MODEL` | — | `llama-3.3-70b-versatile` | Model ID at that provider |
| `PORT` | — | `3000` | API port |
| `CLIENT_ORIGIN` | — | `http://localhost:5173` | Allowed CORS origin(s), comma-separated |
| `NODE_ENV` | — | `development` | Set `production` to hide error details |

</details>

<details>
<summary><strong>client/.env</strong></summary>

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_URL` | — | `http://localhost:3000` | Base URL of the API server |

</details>

## Scripts

| Location | Command | Description |
|---|---|---|
| `client` | `npm run dev` | Vite dev server with HMR |
| `client` | `npm run build` | Production build to `dist/` |
| `client` | `npm run preview` | Preview the production build |
| `client` | `npm run lint` | ESLint |
| `server` | `npm start` | Run the API |
| `server` | `npm run dev` | Run with auto-reload (`node --watch`) |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/chat` | Single-shot chat completion |
| `POST` | `/api/chat-stream` | Streaming chat (SSE) — used by the widget |
| `POST` | `/api/generate-tasks` | Break a project description into structured tasks |
| `POST` | `/api/generate-content` | Draft emails, proposals, summaries, reports |
| `GET` | `/api/health` | Health check |

## Deployment

The marketing site is live at **[nexa-flow-fawn.vercel.app](https://nexa-flow-fawn.vercel.app)**, deployed from `client/` on Vercel.

### Client (Vercel)

Point the Vercel project at the `client/` directory as its root — the Vite preset picks up the build (`npm run build` → `dist/`) automatically. [`client/vercel.json`](client/vercel.json) supplies the SPA fallback that rewrites every non-asset path to `index.html`; without it, deep links like `/about` return a Vercel `NOT_FOUND` instead of loading the app.

Set `VITE_API_URL` to your deployed API's URL in **Project → Settings → Environment Variables**, then redeploy. Vite inlines env vars at build time, so changing this value only takes effect on a new build.

> **Note:** the AI chat widget needs the `server/` API running somewhere reachable. With only the client deployed, `VITE_API_URL` falls back to `http://localhost:3000` and the widget will fail in production — the rest of the site works fine.

### Server

Any Node host (Railway, Render, Fly.io). Set `LLM_API_KEY`, `CLIENT_ORIGIN` (your site's origin — `https://nexa-flow-fawn.vercel.app`), and `NODE_ENV=production`. `CLIENT_ORIGIN` must match the deployed site exactly or the browser will block the chat requests via CORS.

### Forking this project

The canonical URL, Open Graph tags, and JSON-LD in [`client/index.html`](client/index.html), plus [`robots.txt`](client/public/robots.txt) and [`sitemap.xml`](client/public/sitemap.xml), are hardcoded to `https://nexa-flow-fawn.vercel.app`. Replace that host with your own domain before deploying, or your social previews and sitemap will credit this deployment instead of yours.

## Customization

- **Copy & content** — everything lives in [`client/src/data/content.js`](client/src/data/content.js)
- **Design tokens** — colors, fonts, radii, breakpoints in [`client/src/styles/_variables.scss`](client/src/styles/_variables.scss)
- **AI persona** — the assistant's system prompt is in [`server/api.js`](server/api.js)

## Accessibility

Keyboard-operable interactive elements (FAQ, pricing toggle, chat), `aria-expanded`/`aria-controls` on disclosures, ARIA labels on icon-only buttons, visible `:focus-visible` outlines, and full `prefers-reduced-motion` support.

## Roadmap

- [ ] Real authentication + sign-up flow
- [ ] Contact form backend (email/CRM integration)
- [ ] Newsletter provider integration
- [ ] Legal pages (Privacy, Terms, Cookies)
- [ ] Blog / changelog
- [ ] Analytics + cookie consent
- [ ] Light theme

## License

MIT — free to use as a template for your own product.

## Credits

Design & development by **Hi Webinator**. AI assistant powered by [Groq](https://groq.com) (Llama 3.3 70B) — swappable for any OpenAI-compatible provider.

| | |
|---|---|
| 🖥️ Live site | [nexa-flow-fawn.vercel.app](https://nexa-flow-fawn.vercel.app) |
| 🎨 Behance case study | [Design process & visual breakdown](https://www.behance.net/gallery/252848357/NexaFlow-Modern-SaaS-Platform-UIUX) |
