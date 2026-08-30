"use client";

import { useProjects } from "@/lib/useProjects";
import ProjectCard from "./ProjectCard";
import ProjectsScroll from "./ProjectsScroll";
import HireCTA from "./HireCTA";

export default function Projects() {
  const { projects, hydrated } = useProjects();

  const ordered = projects.map((p, i) => ({ ...p, order: i + 1, total: projects.length }));
  const featuredList = ordered.filter((p) => p.featured);
  const restList = ordered.filter((p) => !p.featured);
  const scrollOrder = [...featuredList, ...restList];

  return (
    <section id="projects" className="bg-[#f0f0f0] dark:bg-[#0e0e0e] transition-colors duration-300 [overflow-x:clip]">
      <div className="px-6 md:px-10 pt-8 pb-10 md:pt-10 md:pb-6">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-black/40 dark:text-white/40 mb-2">Selected work</p>
        <div className="flex items-baseline gap-5 border-t-2 border-[#0e0e0e] dark:border-[#f0ede6] pt-4 mb-2 md:mb-4">
          <h2 className="font-syne font-extrabold text-[13px] tracking-[0.12em] uppercase text-[#0e0e0e] dark:text-[#f0ede6]">Projects</h2>
          <span className="font-mono text-[11px] text-black/30 dark:text-white/30">{String(projects.length).padStart(2, "0")} total</span>
        </div>
        {/* Mobile: simple stacked list, no scroll-linked motion */}
        <div className="flex flex-col gap-6 md:hidden pt-4 pb-6">
          {featuredList.map((p) => (
            <ProjectCard key={p.id} project={p} featured />
          ))}
          {restList.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      {/* Desktop: cards glide horizontally as the section is scrolled — no drag, no scrollbar */}
      <div className="hidden md:block">
        <ProjectsScroll projects={scrollOrder} />
      </div>

      {hydrated && <HireCTA />}
    </section>
  );
}
