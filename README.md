# ash.dev — Developer Portfolio

Built with Next.js 14, Tailwind CSS, deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new project

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
│   ├── Navbar.js
│   ├── Hero.js
│   ├── Projects.js
│   ├── ProjectCard.js
│   ├── About.js
│   └── StackContact.js
├── data/
│   └── projects.js       # ← edit this to add/update projects
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

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
