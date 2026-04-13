# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing website for **FirstDATA** — an AI & data solutions consultancy offering two services: **AI Automation** and **SQL Database / Data Engineering**. The entire site is one file (`index.html`) with all CSS inline in a `<style>` block. No build step, no package.json, no framework.

**Contact:** oolusegun@firstdataconsultingllc.com · +1 (214) 392-9530  
**Booking:** Calendly popup at `https://calendly.com/oolusegun79/30min` — wired to both the nav "Book Consultation" button and the contact section CTA.

## Commands

```bash
# Start local dev server on port 3000 (must be running before screenshots)
node serve.mjs

# Screenshot the live site (viewport only, 1440×900 — not full page)
node screenshot.mjs http://localhost:3000

# Screenshot with a label  →  screenshot-N-label.png
node screenshot.mjs http://localhost:3000 hero

# Screenshot scrolled to a specific section (uses hash URL to trigger scroll)
node screenshot.mjs http://localhost:3000/#about about
```

- Screenshots auto-increment and never overwrite. Saved to `./temporary screenshots/`.
- Puppeteer is at `C:\Users\segun\AppData\Roaming\npm\node_modules`; Chrome at `C:\Users\segun\.cache\puppeteer\chrome`.
- After screenshotting, use the Read tool on the PNG — Claude can see and analyse it directly.
- Never screenshot a `file:///` URL. Always use localhost.
- If the server is already running, do not start a second instance.

## Architecture

**Single file:** `index.html` — all HTML, CSS (in `<style>`), and JS (inline `<script>` at end of `<body>`).

**Page sections (in DOM order):**

| ID | Content |
|---|---|
| `#hero` | Full-viewport hero, animated organic shape graphic, floating status cards |
| `#stats` | 4-cell stat strip with count-up animation |
| `#specializations` | 2 deep-dive spec cards in a 2-column grid |
| `#about` | Two-column: real headshot left, expertise list right |
| `#services` | 2-column service card grid |
| `#process` | 4-step numbered timeline |
| `#case-studies` | 3 result cards with metrics |
| `#tech-stack` | Tool pills grouped by category (3 categories) |
| `#contact` | Centered card with email, phone, and Calendly CTA |

**CSS design token system** — use these custom properties; never hard-code colour values:

```
--green-deep / --green-mid / --green-bright / --green-mint / --green-glow
--amber / --amber-light
--blue-status / --teal-status
--bg-base → --bg-surface → --bg-elevated → --bg-float   (surface layering, darkest → lightest)
--border / --border-light
--text-primary / --text-muted / --text-dim
```

**Typography:** `'Syne'` (headings, `letter-spacing: -0.03em`) + `'Inter'` (body, `line-height: 1.7`) via Google Fonts.

**Spec card theming:** `.spec-card.llm` = amber (AI Automation, card 01), `.spec-card.platform` = green (SQL/Data Engineering, card 02). Each variant has scoped CSS for icon background, bullet colour, tag colour, and top-border gradient. Follow this pattern for any new spec cards.

**Count-up animation:** Elements with `data-count` and `data-suffix` in `#stats` are driven by an `IntersectionObserver` easing loop in the inline `<script>` at the bottom of `<body>`.

**Calendly integration:** Two script/link tags in `<head>` load the Calendly widget. Both "Book Consultation" (nav) and "Book a Free Strategy Call" (contact) use `onclick="Calendly.initPopupWidget({url:'https://calendly.com/oolusegun79/30min'});return false;"`.

## Brand Assets (`brand_assets/`)

| File | Use |
|---|---|
| `firstdatalogo.png` | Primary logo — nav and footer |
| `OluOlu1.jpeg` | Olusegun's headshot — About section (`object-fit:cover; object-position:top center`) |
| `ColorPalete.png` | Visual brand palette reference |

Brand colours: Primary `#016839` · Mint `#D6FCEA` · Amber `#FAA61A`

## Design Guardrails

- **Colours:** Never use default Tailwind palette (indigo-500, blue-600, etc.) — always derive from brand tokens.
- **Shadows:** Layered, colour-tinted, low-opacity. Never flat `shadow-md`.
- **Typography:** Tight tracking (`-0.03em`) on headings; generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients; add SVG noise grain for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Spring-style easing.
- **Interactive states:** Every clickable element must have hover, focus-visible, and active states.
- **Depth:** Use the surface layering system (`bg-base → bg-surface → bg-elevated → bg-float`).

## Hard Rules

- Do not add sections or content not explicitly requested.
- Do not stop after one screenshot pass — do at least 2 rounds, checking spacing/padding, font sizes, exact hex colours, border-radius, box-shadows, alignment, and grid gaps.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as a primary colour.
- Always serve on localhost before screenshotting.
