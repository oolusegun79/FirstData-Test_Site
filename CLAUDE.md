# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **single-page marketing website** for FirstDATA — a digital growth agency offering AI Automation, Social Media Presence, and SQL Database / Data Engineering services. The entire site lives in one file (`index.html`) with all CSS written inline inside `<style>` tags. There is no build step, no package.json, and no framework.

## Commands

```bash
# Start the local dev server (port 3000) — run before any screenshot work
node serve.mjs

# Take a viewport screenshot of the live site
node screenshot.mjs http://localhost:3000

# Screenshot with a label (saves as screenshot-N-label.png)
node screenshot.mjs http://localhost:3000 hero

# Screenshot a specific section via anchor
node screenshot.mjs http://localhost:3000/#services services
```

Screenshots auto-increment (`screenshot-1.png`, `screenshot-2.png`, …) and are never overwritten. They save to `./temporary screenshots/`.

## Architecture

**Single file:** `index.html` — all HTML, CSS, and JS in one document. All styles are in a `<style>` block in `<head>`; there are no external stylesheets.

**Page sections (in order), each with a matching `id`:**

| ID | Content |
|---|---|
| `#hero` | Full-viewport hero with animated graphic and floating status cards |
| `#stats` | 4-cell stat strip with JS count-up animation |
| `#specializations` | 3 deep-dive cards for each service pillar |
| `#about` | Two-column about section with expertise list |
| `#services` | 3-column service card grid |
| `#process` | 4-step process timeline |
| `#case-studies` | 4 result cards with metrics |
| `#tech-stack` | Tool pills grouped by category |
| `#contact` | Centered contact card |

**CSS design token system** — all colours, surfaces, and borders are defined as CSS custom properties on `:root` and must be used instead of hard-coded values:

```
--green-deep / --green-mid / --green-bright / --green-mint / --green-glow
--amber / --amber-light
--blue-status / --teal-status
--bg-base → --bg-surface → --bg-elevated → --bg-float   (surface layering, dark → light)
--border / --border-light
--text-primary / --text-muted / --text-dim
```

**Typography:** `'Syne'` (headings, `letter-spacing: -0.03em`) + `'Inter'` (body, `line-height: 1.7`) — both loaded from Google Fonts.

**Spec card colour theming:** The three `.spec-card` variants (`.llm` = amber, `.rag` = blue, `.platform` = green) use their own colour-scoped CSS rules for icons, bullets, tags, and top-border gradients. Match this pattern when adding new spec cards.

**Count-up animation:** Stats in `#stats` use `data-count` and `data-suffix` attributes. The inline `<script>` at the bottom of `<body>` drives an `IntersectionObserver`-triggered easing animation.

## Brand Assets

Located in `brand_assets/`:
- `firstdatalogo.png` — primary logo (used in nav and footer)
- `ColorPalete.png` — visual reference for the brand palette

Primary: `#016839` · Secondary: `#D6FCEA` · Accent: `#FAA61A`

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at ` http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:\Users\segun\AppData\Roaming\npm\node_modules`. Chrome cache is at `C:\Users\segun\.cache\puppeteer\chrome`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
