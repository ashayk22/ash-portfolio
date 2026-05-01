const projects = [
  {
    id: "tech-blog",
    title: "Tech Blog",
    type: "Personal · Blog",
    description:
      "A headless CMS-powered publication built in Next.js. Fast, opinionated, and written entirely in JavaScript — because sometimes you ship without TypeScript and it's fine.",
    tags: ["Next.js", "Headless CMS", "JavaScript", "SSG", "REST API"],
    liveUrl: "https://techverse-blog.netlify.app/",
    githubUrl: "https://github.com/ashayk22",
    featured: true,
    shadow: "red",
  },
  {
    id: "studydesk",
    title: "StudyDesk",
    type: "Full-Stack · SaaS",
    description:
      "Study & assignment tracker with auth, priority engine, and PWA support. Supabase-backed, offline-ready.",
    tags: ["Next.js", "Supabase", "Auth", "PWA"],
    liveUrl: null,
    githubUrl: "https://github.com/ashayk22",
    featured: false,
    shadow: "yellow",
    inProgress: true,
  },
  {
    id: "company-portfolio",
    title: "Company Portfolio",
    type: "Client Work · Frontend",
    description:
      "Frontend build for a client portfolio. Clean, performant, and designed for handoff. Deployment is part of the active build process.",
    tags: ["Frontend", "Client Work", "In Progress"],
    liveUrl: "https://apexsolutions22.netlify.app/",
    githubUrl: "https://github.com/ashayk22/techverse/",
    featured: false,
    shadow: "blue",
  },
  {
    id: "internguard",
    title: "InternGuard",
    type: "Tool · Web App",
    description:
      "Scans internship listings and flags potential scams before you apply. Paste an offer and get an instant legitimacy verdict — built to protect students from fake opportunities.",
    tags: ["Next.js", "React", "JavaScript", "HTML", "CSS"],
    liveUrl: "https://internguard.netlify.app/",
    githubUrl: "https://github.com/ashayk22",
    featured: false,
    shadow: "red",
  },
  {
  id: "heaven-by-people",
  title: "Heaven by People",
  type: "Cafe · Static Site",
  description: "A static site for a local cafe, built with Next.js. Showcases the menu, location, and story of the cafe with a clean, responsive design.",
  tags: ["Next.js", "React"],
  liveUrl: "https://haven-by-people.vercel.app/",
  githubUrl: "https://github.com/ashayk22/haven-by-people",
  featured: false,
  shadow: "blue",   // red, yellow, or blue
},
];

export default projects;
