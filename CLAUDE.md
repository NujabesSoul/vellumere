# CLAUDE.md — Vellumere

## What This Is

Vellumere is a collection of Renaissance thinking tools built by CK (Erick Allas). Each tool borrows a technique from history — a 13th-century combination wheel, a medieval reflection practice, a cross-domain pattern engine — and wires it to a modern AI to help people think differently.

This is NOT a portfolio site. This is NOT a SaaS product. This is a craftsman's workshop with the door open. The tools work. They have personality. They help people discover connections and ideas they wouldn't find on their own.

**The tagline:** "Renaissance thinking tools for the curious."

**The domain:** vellumere.io (or localhost during development)

---

## Who Built This

CK is a Renaissance Craftsman — a first-generation Filipino-American who reads Seneca, builds Linux infrastructure, learns classical drawing, 3D prints Dark Academia desk objects, and believes the best ideas come from connecting things that aren't supposed to be connected. He calls his approach "Renaissance thinking for the AI age."

His personal site is heyheyitsck.com. This platform is where his tools live.

---

## Technical Stack

- **Framework:** React 19+ with Vite
- **Routing:** React Router v7 (client-side routing, SPA)
- **Styling:** Plain CSS with CSS custom properties. NOT Tailwind, NOT CSS modules, NOT styled-components. One shared foundation stylesheet + per-tool stylesheets where needed.
- **AI:** Anthropic API (Claude claude-sonnet-4-20250514) called directly from the browser using a user-provided API key stored in localStorage
- **Hosting:** GitHub Pages (repo: `github.com/NujabesSoul/vellumere`)
- **Deployment:** GitHub Actions builds on push to main, deploys to gh-pages branch
- **Fonts:** Google Fonts — Crimson Pro, EB Garamond, JetBrains Mono
- **No backend.** No database. No authentication. No server. Static files only.

### Dependencies (keep minimal)

```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "react-router-dom": "^7"
  },
  "devDependencies": {
    "vite": "^6",
    "@vitejs/plugin-react": "^4"
  }
}
```

That's it. No component libraries. No state management libraries. No animation libraries. React, Router, Vite. The tools are simple enough that React state and props handle everything.

---

## Migration Note

The folder `./connessione-source/` contains the source code from the existing Connessione Engine prototype (built in the Bottega del Caos workshop). This is the ONLY tool that needs migration.

**Migration instructions:**
- Read all files in `./connessione-source/` to understand the existing components, styles, API calls, and system prompt
- Migrate these into the new `src/tools/connessione/` structure as specified below
- Adapt the tool to use the shared SiteNav, SiteFooter, ApiKeyModal, and `src/services/api.js` instead of its own nav, footer, API key handling, and direct API calls
- Extract the system prompt from the API service into `src/tools/connessione/prompt.js`
- Keep ALL existing functionality: the graph, connection cards, explore deeper, loading messages, comedy, Leonardo notes, Franklin's "So What?" sections
- The tool's CSS should be migrated to `src/tools/connessione/connessione.css`, adapted to use the shared Vellumere CSS variables from `foundation.css` instead of its own color definitions
- **Delete the `./connessione-source/` folder when migration is complete**

---

## Project Structure

```
vellumere/
├── CLAUDE.md
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── public/
│   └── CNAME
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   │
│   ├── components/
│   │   ├── SiteNav.jsx
│   │   ├── SiteFooter.jsx
│   │   ├── ApiKeyModal.jsx
│   │   ├── ToolCard.jsx
│   │   └── HelpTooltip.jsx
│   │
│   ├── pages/
│   │   └── Landing.jsx
│   │
│   ├── tools/
│   │   ├── connessione/
│   │   │   ├── Connessione.jsx
│   │   │   ├── components/
│   │   │   │   ├── ConceptInput.jsx
│   │   │   │   ├── ConnectionGraph.jsx
│   │   │   │   ├── ConnectionCard.jsx
│   │   │   │   ├── NotebookPage.jsx
│   │   │   │   └── ResonanceLoader.jsx
│   │   │   ├── prompt.js
│   │   │   ├── connessione.css
│   │   │   └── utils/
│   │   │       └── graph-layout.js
│   │   │
│   │   ├── permission/
│   │   │   ├── Permission.jsx
│   │   │   ├── components/
│   │   │   ├── prompt.js
│   │   │   └── permission.css
│   │   │
│   │   ├── combinatoria/
│   │   │   ├── Combinatoria.jsx
│   │   │   ├── components/
│   │   │   ├── prompt.js
│   │   │   └── combinatoria.css
│   │   │
│   │   ├── decoder/
│   │   │   ├── Decoder.jsx
│   │   │   ├── components/
│   │   │   ├── prompt.js
│   │   │   └── decoder.css
│   │   │
│   │   └── examination/
│   │       ├── Examination.jsx
│   │       ├── components/
│   │       ├── prompt.js
│   │       └── examination.css
│   │
│   ├── services/
│   │   └── api.js
│   │
│   └── styles/
│       ├── foundation.css
│       ├── nav.css
│       ├── footer.css
│       ├── landing.css
│       └── shared.css
│
└── dist/
```

### File Organization Rules

- **Each tool is fully self-contained** in its folder under `src/tools/`. It has its own components, CSS, and system prompt. Deleting a tool folder shouldn't break anything else.
- **Shared components** live in `src/components/`. Used by every page.
- **One API service** at `src/services/api.js`. All tools call this.
- **Each tool's system prompt** lives in a `prompt.js` file in the tool folder.
- **CSS is separated by concern.** Foundation styles load globally. Tool styles only load with their tool.

---

## The Vellumere Color System

```css
:root {
  /* Foundation — the midnight study */
  --deepest: #1C1C1C;
  --charcoal: #282828;
  --mahogany: #3A2F2F;

  /* Parchment — aged materials */
  --cream: #F5E6D3;
  --parchment: #E8D5C4;
  --ivory: #FFF8F0;

  /* Warmth — red panda, Victorian velvet */
  --burgundy: #6B2C2C;
  --russet: #CD5C5C;
  --auburn: #BC544B;

  /* Scholar's green */
  --forest: #2F4538;
  --sage: #4A5F4F;
  --moss: #5C6F5C;

  /* Candlelight */
  --honey: #C9A961;
  --brass: #D4AF37;

  /* Tools */
  --slate: #708090;
  --steel: #536878;

  /* Typography */
  --font-header: 'Crimson Pro', Georgia, serif;
  --font-body: 'EB Garamond', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

### Usage Rules

- **Backgrounds:** `--deepest` primary, `--charcoal` for cards/surfaces
- **Text:** `--cream` primary, `--parchment` secondary, `--slate` for metadata
- **Headings:** `--ivory`
- **Links:** `--honey`, hover `--brass`
- **Accents/dividers:** `--auburn`
- **Active/success:** `--moss`
- **Borders:** `--mahogany`
- **Selection:** background `--auburn`, color `--ivory`

### Typography

- **Crimson Pro:** Nav, headings, tool titles, UI labels. The structured voice.
- **EB Garamond:** Body text, descriptions, long-form content. The literary voice.
- **JetBrains Mono:** Metadata, dates, technical labels. The maker voice.
- Body at 18px, line-height 1.7.

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap
```

### Texture

Subtle noise overlay on body:
```css
body::before {
  content: '';
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1000;
}
```

---

## Shared Components

### SiteNav

Fixed top nav. On landing page:
```
[Vellumere]                        [tools] [about] [⚙]
```

On tool pages:
```
[← tools]  [Vellumere]                          [⚙]
```

- "Vellumere" wordmark: Crimson Pro, weight 600, `--honey`. Links to `/`.
- Nav links: `--parchment`, lowercase, Crimson Pro, 0.95rem, letter-spacing 0.04em.
- Hover: underline animation with `--honey`.
- Gear icon: `--slate`, hover `--honey`. Opens ApiKeyModal.
- Background: `rgba(28,28,28,0.92)`, `backdrop-filter: blur(12px)`.
- Border-bottom: `1px solid var(--mahogany)`.
- Mobile: hamburger at 768px.

### SiteFooter

```
"Renaissance thinking tools for the curious."
Built by CK · heyheyitsck.com
```

- Tagline: EB Garamond italic, `--honey`.
- Attribution: JetBrains Mono, 0.72rem, `--slate`. "CK" links to heyheyitsck.com.
- Border-top: `1px solid var(--mahogany)`.
- Centered. Padding: 3rem 2rem.

### ApiKeyModal

- Overlay: `rgba(28,28,28,0.85)`, backdrop blur.
- Card: `--charcoal` background, `--mahogany` border, border-radius 8px.
- Title: "API Key" in Crimson Pro.
- Description: "Stored in your browser only. Never sent anywhere except directly to Anthropic." in EB Garamond, `--parchment`.
- Input: `--deepest` background, `--cream` text, `--mahogany` border. Placeholder: "sk-ant-..."
- Save button: `--auburn` background, `--ivory` text. Hover: `--russet`.
- If key exists, show masked (sk-ant-...xxxx) with clear option.
- Store as `localStorage.setItem('vellumere-api-key', key)`.

### HelpTooltip

Reusable "?" icon for explanatory text.

- Icon: "?" in small circle, `--slate`, hover `--honey`.
- Tooltip: `--charcoal` background, `--mahogany` border, max-width 400px.
- Text: EB Garamond, `--parchment`, ~0.9rem.
- Fade-in animation. Click to toggle on mobile, hover on desktop.

---

## Landing Page

### Hero (compact, NOT full-viewport)

```
Vellumere
Renaissance thinking tools for the curious.
```

- "Vellumere" in Crimson Pro, large (3rem+), `--ivory`, weight 300.
- Subtitle in EB Garamond italic, `--parchment`.
- Below, a brief paragraph in CK's voice:

"Each tool borrows a technique from history and wires it to a modern AI. A 13th-century combination wheel. A cross-domain pattern engine. A permission slip from Leonardo da Vinci. They're built to help you think differently — or at least think about why you're not."

### Tools Section (`#tools`)

Five tool cards. NOT an identical grid — vary visual treatment. Each card has:

1. **Tool name** (Crimson Pro, `--ivory`)
2. **One-line description** (EB Garamond, `--parchment`)
3. **Historical origin tag** (JetBrains Mono, `--auburn`, tiny)
4. **Link to tool page** (or "coming soon" badge)

| Tool | Route | Origin Tag | Status |
|------|-------|-----------|--------|
| The Connessione Engine | /connessione | Leonardo da Vinci · Connessione | Live |
| The Permission Machine | /permission | Renaissance autodidacts | Coming soon |
| The Ars Combinatoria | /combinatoria | Ramon Llull · 1305 | Coming soon |
| The Diplomatic Decoder | /decoder | Medieval translators | Coming soon |
| The Examination | /examination | Monastic examination of conscience | Coming soon |

"Coming soon" cards: slightly muted opacity, no hover effect, `--slate` badge. No link.

### About Section (`#about`)

Brief philosophy — NOT a CK bio. About the idea:

"Vellumere is named after vellum — the material scholars used to preserve knowledge for centuries. These tools are experiments in cross-domain thinking: the belief that the best ideas come from connecting things that aren't supposed to be connected.

They're built by CK, a Renaissance Craftsman who reads too much and builds too many things. Some of these tools use AI. None of them are trying to replace your thinking. They're trying to help you see what you weren't looking at."

Link: "More about CK → heyheyitsck.com"

---

## Shared API Service

`src/services/api.js`

```javascript
const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

export function getApiKey() {
  return localStorage.getItem('vellumere-api-key');
}

export function hasApiKey() {
  return !!getApiKey();
}

export async function query({ systemPrompt, userMessage, maxTokens = 4096 }) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('NO_API_KEY');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error('Empty response from API');
  return text;
}
```

Error handling pattern for tools:
- `NO_API_KEY` → show message with button that opens ApiKeyModal
- Other errors → comedy error message appropriate to the tool's personality

---

## Routing

SPA with React Router BrowserRouter.

```jsx
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/connessione" element={<Connessione />} />
  {/* Phase 2+ routes added as tools are built */}
</Routes>
```

Vite config must handle SPA fallback for GitHub Pages. The GitHub Actions workflow copies index.html to 404.html.

---

## GitHub Actions

`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: cp dist/index.html dist/404.html
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

---

## Build Phases

### Phase 1: Shell + Connessione Migration (THIS SESSION)

Use plan mode. Create a detailed plan before writing code.

**Build order:**

1. Initialize Vite + React + React Router project
2. Install dependencies (react, react-dom, react-router-dom, vite, @vitejs/plugin-react)
3. Create `src/styles/foundation.css` with full Vellumere color system, reset, base styles, noise texture, font imports
4. Create `src/styles/nav.css`, `footer.css`, `landing.css`, `shared.css`
5. Build shared components: SiteNav (with mobile hamburger), SiteFooter, ApiKeyModal, HelpTooltip, ToolCard
6. Create `src/services/api.js` shared API service
7. Build Landing page (`src/pages/Landing.jsx`) with hero, tools section (cards for all 5 tools), and about section
8. Migrate Connessione Engine from `./connessione-source/` into `src/tools/connessione/`:
   - Move components into `src/tools/connessione/components/`
   - Extract system prompt into `src/tools/connessione/prompt.js`
   - Adapt to use shared API service (`src/services/api.js`) instead of its own
   - Remove tool's own nav, footer, and API key handling — use shared components
   - Move tool CSS into `src/tools/connessione/connessione.css`, using shared variables
   - Keep ALL functionality: graph, cards, explore deeper, loading, comedy, Leonardo notes, Franklin "So What?"
9. Set up React Router in App.jsx with `/` and `/connessione` routes
10. Create `.github/workflows/deploy.yml`
11. Create SPA 404.html fallback (copy in build step)
12. Set `vite.config.js` with `base: '/'`
13. Delete `./connessione-source/` folder
14. Verify: `npm run dev` — landing loads, tool cards display, clicking Connessione navigates to tool, tool works with API key, mobile nav works, back navigation works

### Phase 2: Permission Machine + Ars Combinatoria (FUTURE SESSION)
### Phase 3: Diplomatic Decoder + The Examination (FUTURE SESSION)
### Phase 4: Domain + Polish + PWA (FUTURE SESSION)

---

## Code Style

### Variable names tell stories
```css
/* YES */ --honey: #C9A961;
/* NO  */ --color-accent-warning-light: #C9A961;
```

### Comments explain WHY, not WHAT
```css
/* YES — 18px body feels right for long-form reading on EB Garamond */
body { font-size: 18px; }

/* NO — Sets the font size to 18px */
body { font-size: 18px; }
```

### Class names read like English
```html
<!-- YES --> <div class="tool-card active">
<!-- NO  --> <div class="tools-section__card-wrapper--is-active">
```

### Function names are verbs that make sense
```javascript
// YES
function toggleMobileMenu() {}
function openApiKeyModal() {}

// NO
function handleClick() {}
function processData() {}
```

### The test
Before finalizing any file: "If CK opens this in VSCode six months from now at midnight, will he understand what's happening and why?"

---

## Voice & Personality

- CK's voice: conversational, warm, slightly self-deprecating, honest
- Each tool can have its own personality in error/loading/empty states
- NEVER use: "leverage," "optimize," "unlock," "empower," startup language
- Don't explain what AI is
- No testimonials, pricing, sign-up forms, stock photos
- Make it feel like a workshop with the door open, not a product

---

## Mobile

- Hamburger at 768px
- All tools must work on mobile
- Touch targets: minimum 44px
- Test at 375px, 390px, 768px

---

## What This Site Is NOT

- NOT a SaaS product
- NOT a portfolio (that's heyheyitsck.com)
- NOT a startup
- NOT trying to look like every other dark-mode dev tool site
- It's a Victorian scholar's workshop that learned JavaScript

---

*"The noblest pleasure is the joy of understanding." — Leonardo da Vinci*
*"But does the website load in under 3 seconds?" — Benjamin Franklin, probably*
