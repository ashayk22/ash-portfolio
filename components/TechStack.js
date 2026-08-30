"use client";

import { useEffect, useRef } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiFramer,
  SiVercel,
} from "react-icons/si";

const techs = [
  { name: "HTML5", Icon: SiHtml5, bg: "#E34F26", fg: "#ffffff" },
  { name: "CSS3", Icon: SiCss, bg: "#1572B6", fg: "#ffffff" },
  { name: "JavaScript", Icon: SiJavascript, bg: "#F7DF1E", fg: "#0e0e0e" },
  { name: "React", Icon: SiReact, bg: "#0e0e0e", fg: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, bg: "#000000", fg: "#ffffff" },
  { name: "Tailwind", Icon: SiTailwindcss, bg: "#06B6D4", fg: "#ffffff" },
  { name: "Supabase", Icon: SiSupabase, bg: "#3FCF8E", fg: "#0e0e0e" },
  { name: "Git", Icon: SiGit, bg: "#F05033", fg: "#ffffff" },
  { name: "GitHub", Icon: SiGithub, bg: "#171515", fg: "#ffffff" },
  { name: "Node.js", Icon: SiNodedotjs, bg: "#339933", fg: "#ffffff" },
  { name: "Framer", Icon: SiFramer, bg: "#0055FF", fg: "#ffffff" },
  { name: "Vercel", Icon: SiVercel, bg: "#000000", fg: "#ffffff" },
];

export default function TechStack() {
  const wrapRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const gridRef = useRef(null);
  const targetP = useRef(0);
  const currentP = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const computeProgress = () => {
      const el = wrapRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element's top is at the bottom of the viewport,
      // 1 once it has travelled ~65% of the viewport height upward
      const raw = (vh - rect.top) / (vh * 0.75);
      return Math.min(1, Math.max(0, raw));
    };

    const onScroll = () => {
      targetP.current = computeProgress();
    };

    const tick = () => {
      currentP.current += (targetP.current - currentP.current) * 0.12;
      if (Math.abs(targetP.current - currentP.current) < 0.001) {
        currentP.current = targetP.current;
      }
      if (wrapRef.current) {
        wrapRef.current.style.setProperty("--p", currentP.current.toFixed(4));
      }
      rafId.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    rafId.current = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("echo-play");
          } else {
            entry.target.classList.remove("echo-play");
          }
        });
      },
      { threshold: 0.5 }
    );
    if (rightRef.current) observer.observe(rightRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="stack"
      className="bg-[#f0f0f0] dark:bg-[#0e0e0e] transition-colors duration-300 [overflow-x:clip]"
    >
      <div className="px-6 md:px-10 py-16 md:py-20">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">
          // tech stack
        </p>
        <div className="flex items-baseline gap-5 border-t-2 border-[#0e0e0e] dark:border-[#f0ede6] pt-4 mb-12 md:mb-16">
          <h2 className="font-syne font-extrabold text-[13px] tracking-[0.12em] uppercase text-[#0e0e0e] dark:text-[#f0ede6]">
            Tech Stack
          </h2>
          <span className="font-mono text-[11px] text-black/30 dark:text-white/30">
            {String(techs.length).padStart(2, "0")} tools
          </span>
        </div>

        {/* Elevator-style split heading, scroll-linked */}
        <div ref={wrapRef} className="elevator-wrap mb-16 md:mb-20 select-none">
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <div
              ref={leftRef}
              className="elevator-left min-w-0 break-words font-syne font-extrabold tracking-tight text-[9.5vw] md:text-[5.2vw] leading-[0.95] text-right text-[#0e0e0e] dark:text-[#f0ede6]"
            >
              RUN ON
            </div>
            <div
              ref={rightRef}
              className="elevator-right echo-target min-w-0 break-words font-syne font-extrabold tracking-tight text-[9.5vw] md:text-[5.2vw] leading-[0.95] text-[#c8392b]"
            >
              THIS STACK
            </div>
          </div>
        </div>

        {/* Icon grid */}
        <div
          ref={gridRef}
          className="tech-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 md:gap-7"
        >
          {techs.map((tech, i) => (
            <div
              key={tech.name}
              className="tech-item group flex flex-col items-center gap-3"
              style={{ transitionDelay: `${i * 45}ms` }}
            >
              <div
                className="relative w-16 h-16 md:w-[76px] md:h-[76px] flex items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 shadow-sm transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:shadow-lg"
                style={{ backgroundColor: tech.bg }}
              >
                <tech.Icon className="w-8 h-8 md:w-9 md:h-9" style={{ color: tech.fg }} />
              </div>
              <span className="font-mono text-[10px] tracking-wide uppercase text-black/50 dark:text-white/50 text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .elevator-wrap {
          --p: 0;
        }
        .elevator-left {
          transform: translateX(calc((1 - var(--p)) * 5vw));
          opacity: var(--p);
        }
        .elevator-right {
          transform: translateX(calc((var(--p) - 1) * 5vw));
          opacity: var(--p);
        }

        /* One-shot echoing drop-shadow trail, like the elevator doors settling */
        .echo-target {
          filter: drop-shadow(0 0 0 rgba(200, 57, 43, 0));
        }
        .echo-target.echo-play {
          animation: echoTrail 0.7s ease-out 0.35s both;
        }
        @keyframes echoTrail {
          0% {
            filter: drop-shadow(0 0 0 rgba(200, 57, 43, 0));
          }
          40% {
            filter: drop-shadow(0 0.12em 0 rgba(200, 57, 43, 0.35))
              drop-shadow(0 0.24em 0 rgba(200, 57, 43, 0.2));
          }
          100% {
            filter: drop-shadow(0 0.12em 0 rgba(200, 57, 43, 0.18))
              drop-shadow(0 0.28em 0 rgba(200, 57, 43, 0.1))
              drop-shadow(0 0.44em 0 rgba(200, 57, 43, 0.04));
          }
        }

        .tech-item {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .tech-grid.echo-play .tech-item {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
