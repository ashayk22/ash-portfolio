"use client";

import projects from "@/data/projects";

const stackTags = [
  { label: "Next.js", style: "border border-black/20 dark:border-white/20 text-black/50 dark:text-white/50" },
  { label: "React", style: "bg-[#e6b800] text-[#0e0e0e] border border-[#e6b800]" },
  { label: "HTML &middot; CSS &middot; JS", style: "border border-black/20 dark:border-white/20 text-black/50 dark:text-white/50" },
  { label: "Supabase", style: "bg-[#1a1aff] text-white border border-[#1a1aff]" },
  { label: "Tailwind", style: "bg-[#c8392b] text-white border border-[#c8392b]" },
];

const typeColorByShadow = {
  red: "bg-[#c8392b]",
  yellow: "bg-[#e6b800]",
  blue: "bg-[#1a1aff]",
};

// Pull the top two featured projects straight from data/projects.js so this
// preview panel never drifts out of sync with the main Projects section.
const featuredProjects = projects
  .filter((p) => p.featured)
  .slice(0, 2)
  .map((p) => ({
    type: p.type.split(" · ")[0],
    typeColor: typeColorByShadow[p.shadow] || "bg-[#c8392b]",
    title: p.title,
    desc: p.description,
    stack: p.tags.slice(0, 3),
    url: p.liveUrl,
  }));

export default function Hero() {
  return (
    <section className="bg-[#f0f0f0] dark:bg-[#0e0e0e] transition-colors duration-300">
      <div className="px-6 md:px-10 pt-10 md:pt-14 pb-10 md:pb-12">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

          {/* Left: heading + content */}
          <div className="flex flex-col gap-6 lg:max-w-[480px]">
            <div className="flex flex-col" style={{ lineHeight: 0.93 }}>
              <span className="font-syne font-extrabold tracking-tight text-[56px] md:text-[64px] relative inline-block w-fit">
                <span className="absolute left-[-4px] right-[-4px] bottom-[4px] z-0" style={{ height: "40%", background: "#e6b800" }} />
                <span className="relative z-10 text-[#0e0e0e] dark:text-[#f0ede6]">I build</span>
              </span>
              <span className="font-syne font-extrabold tracking-tight text-[56px] md:text-[64px] text-[#c8392b]">things</span>
              <span className="font-syne font-extrabold tracking-tight text-[56px] md:text-[64px] text-[#c8392b]">for</span>
              <span className="font-syne font-extrabold tracking-tight text-[56px] md:text-[64px] relative inline-block w-fit">
                <span className="absolute left-[-4px] right-[-4px] bottom-[4px] z-0" style={{ height: "40%", background: "#e6b800" }} />
                <span className="relative z-10 text-[#0e0e0e] dark:text-[#f0ede6]">the web.</span>
              </span>
            </div>

            <p className="font-mono text-xs md:text-sm text-black/60 dark:text-white/60 italic max-w-sm border-l-[3px] border-[#e6b800] pl-4 leading-relaxed">
              &ldquo;Art is only abandoned, never finished.&rdquo; &mdash; Hi, I&apos;m Ashay. A developer who ships products, not excuses. Full-stack web, clean UI, real problems solved.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-mono text-[10px] tracking-widest uppercase text-black/40 dark:text-white/40 mr-1">stack /</span>
              {stackTags.map((tag) => (
                <span key={tag.label} className={`font-mono text-[11px] px-3 py-1 tracking-wide ${tag.style}`} dangerouslySetInnerHTML={{ __html: tag.label }} />
              ))}
            </div>

            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              <a href="#projects" className="group relative overflow-hidden bg-[#0e0e0e] dark:bg-[#f0ede6] text-[#f0f0f0] dark:text-[#0e0e0e] font-syne font-extrabold text-sm uppercase tracking-tight px-8 py-3 border-2 border-[#0e0e0e] dark:border-[#f0ede6] inline-block">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#c8392b] z-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">See my work &rarr;</span>
              </a>
              <a href="mailto:ashayku22306@gmail.com" className="group relative font-mono text-[11px] tracking-widest uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors pb-[2px]">
                or get in touch
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#0e0e0e] dark:bg-[#f0ede6] group-hover:w-full transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Right: featured cards */}
          <div className="hidden lg:flex flex-col gap-4 w-[310px] flex-shrink-0">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-black/40 dark:text-white/40">// featured project</span>
            {featuredProjects.map((project) => (
              <a key={project.title} href={project.url || "#projects"} target={project.url ? "_blank" : "_self"} rel="noopener noreferrer"
                className="group relative bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 block transition-transform duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px]">
                <div className="absolute -bottom-[5px] -right-[5px] w-full h-full border border-black/10 -z-10 bg-[#e6b800] transition-all duration-200 group-hover:-bottom-[8px] group-hover:-right-[8px]" />
                <span className={`font-mono text-[10px] tracking-widest uppercase text-white ${project.typeColor} px-2 py-[3px] inline-block mb-3`}>{project.type}</span>
                <h3 className="font-syne font-bold text-lg tracking-tight text-[#0e0e0e] dark:text-[#f0ede6] mb-2 leading-tight">{project.title}</h3>
                <p className="text-[12px] text-black/50 dark:text-white/50 leading-relaxed mb-4">{project.desc}</p>
                <div className="flex justify-between items-center border-t border-black/[0.07] dark:border-white/10 pt-3">
                  <div className="flex gap-2 flex-wrap">
                    {project.stack.map((s) => (
                      <span key={s} className="font-mono text-[10px] text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10 bg-[#ebebeb] dark:bg-white/5 px-2 py-[2px]">{s}</span>
                    ))}
                  </div>
                  <span className="text-[#c8392b] font-bold text-lg group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200 inline-block">&#x2197;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
