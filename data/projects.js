const projects = [
  // --- Featured ---
  {
    id: "street-coffee",
    title: "It's Street Coffee",
    type: "Product · Cinematic Redesign",
    description:
      "A cinematic redesign proposal for a real Pune café chain — oversized editorial typography, animated menu reveals, and motion-driven storytelling built with Next.js 14 and Framer Motion.",
    tags: ["Next.js 14", "Framer Motion", "Design"],
    liveUrl: "https://street-coffee-five.vercel.app/",
    githubUrl: "https://github.com/ashayk22",
    featured: true,
    shadow: "red",
  },
  {
    id: "luvbirds",
    title: "Luvbirds",
    type: "Product · Web App",
    description:
      "A romantic page-sharing app for sending shareable, expiring notes — envelope-opening animations, countdown timers, and a Supabase backend, all in one crafted single-page experience.",
    tags: ["Supabase", "HTML/CSS/JS", "Realtime"],
    liveUrl: "https://luvbirds.netlify.app/",
    githubUrl: "https://github.com/ashayk22",
    featured: true,
    shadow: "yellow",
  },
  {
    id: "ami-cooked",
    title: "Ami Cooked",
    type: "Personal · Web App",
    description:
      "A personal build — description coming soon.",
    tags: ["Next.js", "React"],
    liveUrl: "https://ami-cooked.vercel.app/",
    githubUrl: "https://github.com/ashayk22",
    featured: true,
    shadow: "blue",
  },

  // --- Projects ---
  {
    id: "equisplit",
    title: "EquiSplit",
    type: "Tool · Expense Splitter",
    description:
      "A mobile-first expense-splitting app with a desktop companion shell — receipt-style expense breakdowns with hand-drawn zigzag edges, built in React, Vite, and TypeScript.",
    tags: ["React", "Vite", "TypeScript"],
    liveUrl: "https://equilsplit.netlify.app/",
    githubUrl: "https://github.com/ashayk22",
    featured: false,
    shadow: "red",
  },
  {
    id: "techverse-blog",
    title: "Techverse Blog",
    type: "Personal · Blog",
    description:
      "A headless CMS-powered tech blog. Fast, readable, and built for people who care about content over clutter.",
    tags: ["Next.js", "Headless CMS", "JavaScript"],
    liveUrl: "https://techverse-blog.netlify.app/",
    githubUrl: "https://github.com/ashayk22",
    featured: false,
    shadow: "blue",
  },
  {
    id: "haven-by-people",
    title: "Haven by People",
    type: "Cafe · Static Site",
    description:
      "A static site for a local café, showcasing the menu, location, and story of the cafe with a clean, responsive design.",
    tags: ["Next.js", "React"],
    liveUrl: "https://haven-by-people.vercel.app/",
    githubUrl: "https://github.com/ashayk22/haven-by-people",
    featured: false,
    shadow: "yellow",
  },

  // --- In progress ---
  {
    id: "nook",
    title: "Nook",
    type: "Full-Stack · Community App",
    description:
      "A full-stack café and restaurant discovery platform built for student communities — browse and rate local spots, with Supabase auth and a journal-inspired design system. Currently in active development.",
    tags: ["Next.js 14", "Supabase", "NextAuth", "Tailwind"],
    liveUrl: null,
    githubUrl: "https://github.com/ashayk22",
    featured: false,
    shadow: "red",
    inProgress: true,
  },
];

export default projects;
