"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/data/projects";
import { ScrollSplitCard } from "./ui/scroll-split-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_TAGS = [
  { text: "Next.js", background: "#0e0e0e", color: "#f0ede6" },
  { text: "React", background: "#e6b800", color: "#0e0e0e" },
  { text: "Supabase", background: "#1a1aff", color: "#ffffff" },
  { text: "Tailwind", background: "#c8392b", color: "#ffffff" },
];

const cardColors = {
  red: { bg: "#c8392b", text: "#ffffff" },
  yellow: { bg: "#e6b800", text: "#0e0e0e" },
  blue: { bg: "#1a1aff", text: "#ffffff" },
};

// Use the featured projects (each with its own accent color) for the three
// flip panels for ScrollSplitCard, topping up with non-featured projects
// only if there aren't three featured ones to show.
function buildFeaturedCards(projects, scrollToSection) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const chosen = [...featured, ...rest].filter(Boolean).slice(0, 3);

  return chosen.map((project) => {
    const colors = cardColors[project.shadow] || cardColors.red;
    const href = project.liveUrl || project.githubUrl || null;
    return {
      title: project.title,
      description: project.description,
      tag: project.featured ? "Featured / " + project.type : project.type,
      bgColor: colors.bg,
      textColor: colors.text,
      href,
      onClick: href ? undefined : () => scrollToSection("#projects"),
    };
  });
}

// On-brand SVG banner (dot-grid + accent squares) used as the shared image
// behind the three flip panels — no external/stock image dependency.
// Note: no `url(...)`/`rgba(...)`-style values are used anywhere in this
// markup — encodeURIComponent doesn't escape parentheses, so any literal
// "(" / ")" here would prematurely close the CSS url() this gets embedded
// in later and silently blank out the background image.
function buildDotGrid() {
  const dots = [];
  for (let x = 30; x < 1600; x += 60) {
    for (let y = 30; y < 900; y += 60) {
      dots.push(`<circle cx="${x}" cy="${y}" r="1.5" fill="#ffffff" fill-opacity="0.08" />`);
    }
  }
  return dots.join("");
}

function buildBannerDataUri() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <rect width="1600" height="900" fill="#0e0e0e" />
      ${buildDotGrid()}
      <rect x="0" y="0" width="1600" height="10" fill="#c8392b" />
      <rect x="0" y="890" width="1600" height="10" fill="#e6b800" />
      <rect x="120" y="140" width="90" height="90" fill="#c8392b" opacity="0.85" />
      <rect x="1390" y="670" width="90" height="90" fill="#1a1aff" opacity="0.85" />
      <circle cx="1460" cy="180" r="46" fill="#e6b800" opacity="0.85" />
      <circle cx="150" cy="740" r="46" fill="#1a1aff" opacity="0.7" />
      <text x="800" y="480" text-anchor="middle" font-family="Syne, sans-serif" font-weight="800" font-size="120" fill="#f0ede6" letter-spacing="2">FEATURED</text>
      <text x="800" y="600" text-anchor="middle" font-family="Syne, sans-serif" font-weight="800" font-size="120" fill="#c8392b" letter-spacing="2">PROJECTS</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function scrollToSection(id) {
  if (typeof document !== "undefined") {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * HeroCinematic — kinetic intro headline, followed by a scroll-driven
 * ScrollSplitCard reveal (ported from Componentry, MIT licensed) that
 * splits into three panels and flips to show the featured projects,
 * leading straight into the real Projects section below.
 */
export default function HeroCinematic({
  topText = (
    <>
      Built to ship, <span className="text-[#e6b800]">not just to demo</span>
    </>
  ),
  headingWords = ["Products", "that", "feel", "considered,", "code", "that", "holds", "up."],
  tags = DEFAULT_TAGS,
  subText = "And the build log keeps going after the launch...",
  className = "",
}) {
  const benefitRef = useRef(null);
  const wordRefs = useRef([]);
  const tagRefs = useRef([]);

  useEffect(() => {
    const words = wordRefs.current.filter(Boolean);
    if (words.length > 0) {
      gsap.set(words, { opacity: 0, rotate: 8, yPercent: 30 });
    }

    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: benefitRef.current,
        start: "top 70%",
        end: "top -10%",
        scrub: 1.5,
      },
    });

    if (words.length > 0) {
      revealTl.to(words, {
        stagger: 0.2,
        opacity: 1,
        rotate: 0,
        yPercent: 0,
        ease: "power1.inOut",
      });
    }

    tagRefs.current.forEach((tagEl) => {
      if (tagEl) {
        revealTl.to(
          tagEl,
          {
            duration: 1,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
          },
          ">-0.4"
        );
      }
    });

    return () => {
      revealTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const featuredCards = buildFeaturedCards(projectsData, scrollToSection);
  const bannerSrc = buildBannerDataUri();

  return (
    <section
      className={`relative w-full bg-[#f0f0f0] dark:bg-[#0e0e0e] text-[#0e0e0e] dark:text-[#f0ede6] [overflow-x:clip] transition-colors duration-300 ${className}`}
    >
      <div className="hero-cinematic">
        {/* Intro line */}
        <div className="w-full flex justify-center items-center text-center px-6 sm:px-10 py-16 md:py-20">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-black/50 dark:text-white/50">
            {topText}
          </p>
        </div>

        {/* Kinetic headline + tags */}
        <div ref={benefitRef} className="relative w-full pb-4">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10 md:py-16 flex flex-col items-center text-center relative z-10">
            <div className="w-full mb-8 sm:mb-12">
              <p className="font-syne font-extrabold tracking-tight leading-[0.95] text-[clamp(2rem,6vw,5rem)] overflow-visible">
                {headingWords.map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className="inline-block origin-left mr-[0.25em] will-change-transform"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 max-w-4xl mx-auto mb-8 sm:mb-12">
              {tags.map((tag, idx) => (
                <div
                  key={tag.text}
                  ref={(el) => {
                    tagRefs.current[idx] = el;
                  }}
                  className="font-mono px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-base font-semibold tracking-tight opacity-0 shadow-2xl will-change-[clip-path,opacity]"
                  style={{
                    backgroundColor: tag.background,
                    color: tag.color,
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                >
                  {tag.text}
                </div>
              ))}
            </div>

            {subText && (
              <p className="font-mono text-xs sm:text-sm text-black/40 dark:text-white/40 max-w-xl px-4">
                {subText}
              </p>
            )}
          </div>
        </div>

        {/* Scroll-driven split-card reveal — separates, flips, and shows the featured projects */}
        <ScrollSplitCard
          imageSrc={bannerSrc}
          cards={featuredCards}
          startingLabel="Scroll to explore the work"
          endingText="Take a closer look, below ↓"
        />
      </div>
    </section>
  );
}
