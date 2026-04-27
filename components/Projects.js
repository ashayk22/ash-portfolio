import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const ordered = projects.map((p, i) => ({ ...p, order: i + 1, total: projects.length }));
  const featuredOrdered = ordered.find((p) => p.featured);
  const restOrdered = ordered.filter((p) => !p.featured);

  return (
    <section id="projects" className="bg-[#f0f0f0] dark:bg-[#0e0e0e] transition-colors duration-300">
      <div className="px-6 md:px-10 pt-8 pb-16 md:pt-10 md:pb-20">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-black/40 dark:text-white/40 mb-2">Selected work</p>
        <div className="flex items-baseline gap-5 border-t-2 border-[#0e0e0e] dark:border-[#f0ede6] pt-4 mb-10">
          <h2 className="font-syne font-extrabold text-[13px] tracking-[0.12em] uppercase text-[#0e0e0e] dark:text-[#f0ede6]">Projects</h2>
          <span className="font-mono text-[11px] text-black/30 dark:text-white/30">{String(projects.length).padStart(2, "0")} total</span>
        </div>
        <div className="flex flex-col gap-6 md:hidden">
          {featuredOrdered && <ProjectCard project={featuredOrdered} featured={true} />}
          {restOrdered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-[auto_auto] gap-6">
          {featuredOrdered && <ProjectCard project={featuredOrdered} featured={true} />}
          {restOrdered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}
