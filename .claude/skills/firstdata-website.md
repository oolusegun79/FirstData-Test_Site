---
name: firstdata-website
description: Use when making any changes to the FirstDATA consulting website at c:/GitHubRepo/FirstDATA/index.html — covers architecture, design tokens, section map, screenshot workflow, brand assets, and hard rules
---

# FirstDATA Website Changes

## Site Architecture

Single file: `c:/GitHubRepo/FirstDATA/index.html`
All HTML, CSS (in `<style>` block at top), and JS (inline `<script>` at end of `<body>`).
No build step. No package.json. No framework. Edit the file directly.

## Section Map

| ID | Content | Notes |
|---|---|---|
| `#hero` | Full-viewport hero, animated organic shape, floating status cards | 3 float cards; eyebrow, h1, description, badges, CTAs |
| `#stats` | 4-cell stat strip with count-up animation | `data-count` + `data-suffix` on `.stat-num` elements |
| `#specializations` | 2 spec cards in a 2-column grid | `.spec-card.llm` (amber) = AI Automation; `.spec-card.platform` (green) = SQL/Data Eng |
| `#about` | Two-column: headshot left, expertise list right | Headshot: `brand_assets/OluOlu1.jpeg` |
| `#services` | 2-column service card grid | AI Automation + SQL Database / Data Engineering only |
| `#process` | 4-step numbered timeline | Steps: Discovery → Custom Strategy → Build & Launch → Optimise & Scale |
| `#case-studies` | 3 result cards, auto-fill grid | AI Invoice Processing · Data Warehouse Rebuild · AI Content Pipeline |
| `#tech-stack` | Tool pills in 3 categories | AI & Automation · SQL & Data Engineering · Analytics & Growth |
| `#contact` | Centered card, email, phone, Calendly CTA | Calendly popup + email + phone |

## CSS Design Tokens — Always Use These, Never Hardcode Colors

```css
/* Greens */
--green-deep:    #016839
--green-mid:     #1a7a4a
--green-bright:  #2a9d5c
--green-mint:    #D6FCEA
--green-glow:    rgba(1,104,57,0.35)

/* Accent */
--amber:         #FAA61A
--amber-light:   #FEF2DD
--blue-status:   #64B5F3
--teal-status:   #68DBBA

/* Surface layering (darkest → lightest) */
--bg-base:       #0a1714
--bg-surface:    #152C29
--bg-elevated:   #1e3832
--bg-float:      #2a4a43

/* Borders */
--border:        rgba(1,104,57,0.22)
--border-light:  rgba(214,252,234,0.12)

/* Text */
--text-primary:  #EFF6F5
--text-muted:    #859693
--text-dim:      #5D716E
```

## Brand

- **Primary:** `#016839` · **Mint:** `#D6FCEA` · **Amber:** `#FAA61A`
- **Heading font:** `'Syne'` — `letter-spacing: -0.03em`, weights 400/600/700/800
- **Body font:** `'Inter'` — `line-height: 1.7`, weights 300/400/500/600
- **Logo:** `brand_assets/firstdatalogo.png` — used in nav and footer
- **Headshot:** `brand_assets/OluOlu1.jpeg` — About section, `object-fit:cover; object-position:top center`
- **Color palette reference:** `brand_assets/ColorPalete.png`

## Calendly Integration

Both CTAs use the same popup:
```html
onclick="Calendly.initPopupWidget({url:'https://calendly.com/oolusegun79/30min'});return false;"
```
Two places: nav "Book Consultation" button + contact section "Book a Free Strategy Call" button.
Scripts loaded in `<head>` from assets.calendly.com.

## Spec Card Theming Pattern

```css
.spec-card.llm     → amber theme  (AI Automation — card 01)
.spec-card.platform → green theme (SQL/Data Engineering — card 02)
```
Each variant has: icon background color, bullet color, tag color, top-border gradient.
Follow this pattern exactly when adding new spec cards. Numbers are `01`, `02`, etc.

## Count-Up Animation

Elements in `#stats` with `data-count="N"` and `data-suffix="+"` (or `×`, `%`) animate on scroll
via `IntersectionObserver` + `requestAnimationFrame` easing loop in the inline `<script>`.
To add a new stat: add a `.stat-num` element with `data-count` and `data-suffix` attributes.

## Screenshot Workflow

```bash
# 1. Start server (check if already running first — port 3000)
node serve.mjs

# 2. Screenshot viewport (1440×900), auto-increments filename
node screenshot.mjs http://localhost:3000
node screenshot.mjs http://localhost:3000 hero         # adds label → screenshot-N-hero.png
node screenshot.mjs http://localhost:3000/#about about # scrolls to section via hash

# 3. Read the PNG with the Read tool — Claude can analyse it visually
```

- Screenshots save to `./temporary screenshots/` and never overwrite
- Puppeteer: `C:\Users\segun\AppData\Roaming\npm\node_modules`
- Chrome: `C:\Users\segun\.cache\puppeteer\chrome`
- **Never screenshot a `file:///` URL — always use localhost**
- **Do at least 2 screenshot rounds**: first pass for layout correctness, second for spacing, font sizes, colors, border-radius, shadows, and grid gaps

## Contact Info (do not change without instruction)

- **Email:** oolusegun@firstdataconsultingllc.com
- **Phone:** +1 (214) 392-9530
- **Booking:** https://calendly.com/oolusegun79/30min

## Design Guardrails

- **Shadows:** Layered, color-tinted, low-opacity. Never flat `shadow-md`.
- **Gradients:** Layer multiple radial-gradients. Add SVG noise grain for depth.
- **Animations:** Only `transform` and `opacity`. Never `transition-all`.
- **Interactive states:** Every clickable needs `hover`, `focus-visible`, and `active` states.
- **Depth:** Use the surface layering system: `bg-base → bg-surface → bg-elevated → bg-float`.

## Hard Rules

1. Never add sections or content not explicitly requested
2. Never use `transition-all`
3. Never hardcode color values — always use CSS custom properties
4. Never use default Tailwind blue/indigo as a primary color
5. Do minimum 2 screenshot review rounds before declaring done
6. Never screenshot a `file:///` URL — always use localhost
7. Always read the PNG with the Read tool to visually verify changes
