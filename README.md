# ash.dev — Developer Portfolio

Built with Next.js 14, Tailwind CSS, deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new project

**Option A — in the browser (no code):** click **"+ Manage projects"** in the
bottom-right corner of the live site's Projects section. Add, edit, or delete
projects there — they save to `localStorage` and show up instantly. Since this
is a static site with no database, those additions are only visible in that
browser. When you're happy with the list, use **"Copy data/projects.js"** in
the same panel to copy the merged list as code, then paste it over the file
below and redeploy to make it permanent for everyone.

**Option B — edit the file directly:**

Open `data/projects.js` and add a new object to the array:

```js
{
  id: "my-new-project",         // unique slug
  title: "Project Name",
  type: "Full-Stack · SaaS",    // shown above the title
  description: "One or two sentences about the project.",
  tags: ["Next.js", "Supabase"],
  liveUrl: "https://...",       // or null if not live yet
  githubUrl: "https://github.com/ashayk22/...",
  featured: false,              // true = left column hero card
  shadow: "blue",               // red | yellow | blue
  inProgress: false,            // true = shows the status bar
},
```

Then `git push` to main — Vercel auto-deploys in ~30 seconds.

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework preset: **Next.js** (auto-detected)
4. Click Deploy — done.

## Project structure

```
ash-dev/
├── app/
│   ├── globals.css       # fonts, base styles, animations
│   ├── layout.js         # root layout + metadata
│   └── page.js           # assembles all sections
├── components/
│   ├── Navbar.js         # animated floating dock nav (framer-motion)
│   ├── ui/
│   │   └── dock-two.js   # dock primitive (Dock, DockIconButton)
│   ├── Hero.js
│   ├── HeroCinematic.js  # scroll-pinned video reveal (GSAP), sits after Hero
│   ├── Projects.js
│   ├── ProjectCard.js
│   ├── ProjectsAdmin.js  # in-browser "add/edit/delete project" panel
│   ├── About.js
│   └── StackContact.js
├── lib/
│   ├── useProjects.js    # merges data/projects.js with locally-added projects
│   └── utils.js          # cn() classname helper
├── data/
│   └── projects.js       # ← edit this to add/update projects
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## Notes on the redesign

- **Navbar** is now a sticky, animated nav: it slides/fades in on load, and the
  desktop link cluster is a floating "dock" (hover-lift icons with mono
  tooltips, a gentle idle float, smooth-scroll to each section) built with
  `framer-motion`. The mobile menu animates open/closed instead of just
  toggling visibility. The dock component (`components/ui/dock-two.js`) is
  ported from a TypeScript/shadcn reference — this repo has neither, so it
  was rewritten as plain JS with a tiny local `cn()` helper in `lib/utils.js`
  instead of pulling in shadcn's CLI/theme tokens, and restyled to the site's
  hard-edged palette (square corners, 2px borders, offset shadow block)
  instead of the default rounded/glassmorphic look. `framer-motion` and
  `lucide-react` were added to `package.json` as the only new dependencies.

- **HeroCinematic** is a new full-bleed scroll section: the headline splits
  into words that fade/rotate in as you scroll, skill tags clip-reveal, and a
  background video pins and iris-opens to fill the screen before releasing
  into the next section. It uses GSAP + ScrollTrigger (the only new
  dependency — `gsap` was added to `package.json`). The reference version of
  this component assumed a TypeScript + shadcn/ui project; since this repo is
  plain JS with its own component structure (no shadcn), it was ported
  in-place as `components/HeroCinematic.js` using the site's existing design
  tokens instead. The premium `SplitText` plugin was swapped for a manual
  word-split, and the optional Lenis smooth-scroll dependency was dropped, so
  no extra paid or unused packages were introduced.
- Swap the video by passing a `videoSrc` prop to `<HeroCinematic />` in
  `app/page.js`.
- `next@14.2.3` has a known security advisory; consider bumping to a patched
  14.x release when convenient (not part of this redesign).

## Design system

| Token | Value |
|-------|-------|
| Paper | `#f5f2eb` |
| Ink | `#0e0e0e` |
| Red | `#e84c2b` |
| Yellow | `#f5c518` |
| Blue | `#1a1aff` |
| Headline font | Syne 800 |
| Mono font | DM Mono |
| Body font | Bricolage Grotesque |
