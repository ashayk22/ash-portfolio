const shadowColors = { red: "bg-[#c8392b]", yellow: "bg-[#e6b800]", blue: "bg-[#1a1aff]" };

// Decorative code lines shown in featured card negative space
const codeLines = [
  { indent: 0, text: "const project = {", color: "text-black/20 dark:text-white/10" },
  { indent: 1, text: 'stack: ["Next.js", "React"],', color: "text-black/15 dark:text-white/8" },
  { indent: 1, text: 'status: "shipped",', color: "text-[#c8392b]/25" },
  { indent: 1, text: 'passion: Infinity,', color: "text-black/15 dark:text-white/8" },
  { indent: 0, text: "}", color: "text-black/20 dark:text-white/10" },
  { indent: 0, text: "", color: "" },
  { indent: 0, text: "// art is only abandoned,", color: "text-black/12 dark:text-white/8" },
  { indent: 0, text: "// never finished.", color: "text-black/12 dark:text-white/8" },
];

export default function ProjectCard({ project, featured = false }) {
  const shadow = shadowColors[project.shadow] || "bg-[#c8392b]";
  return (
    <div data-cursor="view" className={`relative group ${featured ? "row-span-2" : ""}`}>
      <div className={`absolute inset-0 border border-[#0e0e0e] dark:border-[#f0ede6] ${shadow} translate-x-[6px] translate-y-[6px] -z-10 transition-all duration-150 group-hover:translate-x-[8px] group-hover:translate-y-[8px]`} />
      <div className="relative bg-[#f0f0f0] dark:bg-[#1a1a1a] border border-[#0e0e0e] dark:border-[#f0ede6] p-7 h-full flex flex-col transition-all duration-150 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] overflow-hidden">

        {/* Subtle dot-grid background for featured card */}
        {featured && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }} />
        )}

        {project.inProgress && (
          <div className="flex items-center gap-2 bg-[#0e0e0e] dark:bg-[#f0ede6] text-[#f0f0f0] dark:text-[#0e0e0e] font-mono text-[10px] tracking-widest uppercase px-7 py-2.5 -mx-7 -mt-7 mb-7 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e6b800] flex-shrink-0 animate-pulse" />
            Deployment in progress — check back soon
          </div>
        )}

        {featured && (
          <div className="inline-block bg-[#c8392b] text-white font-mono text-[9px] tracking-widest uppercase px-3 py-1 mb-5 self-start relative z-10">&#9733; Featured</div>
        )}

        <p className="font-mono text-[10px] text-black/30 dark:text-white/30 tracking-widest mb-5 relative z-10">
          {String(project.order).padStart(2, "0")} / {String(project.total).padStart(2, "0")}
        </p>

        <p className={`font-mono text-[10px] tracking-widest uppercase mb-2 relative z-10 ${featured ? "text-[#c8392b]" : project.inProgress ? "text-black/35 dark:text-white/35" : "text-[#1a1aff] dark:text-[#6677ff]"}`}>
          {project.type}
        </p>

        <h3 className={`font-syne font-extrabold leading-tight text-[#0e0e0e] dark:text-[#f0ede6] mb-4 relative z-10 ${featured ? "text-[clamp(28px,3vw,40px)]" : "text-2xl"}`}>
          {project.title.split(" ").map((word, i) => <span key={i} className="block">{word}</span>)}
        </h3>

        <hr className="border-black/10 dark:border-white/10 mb-5 relative z-10" />

        <p className={`text-black/70 dark:text-white/70 leading-relaxed mb-6 relative z-10 ${featured ? "text-[15px]" : "text-sm"}`}>{project.description}</p>

        {/* Decorative code block fills negative space in featured card */}
        {featured && (
          <div className="flex-1 flex items-end mb-6 relative z-10">
            <div className="font-mono text-[11px] leading-relaxed select-none w-full">
              {codeLines.map((line, i) => (
                <div key={i} className={`${line.color}`} style={{ paddingLeft: line.indent * 16 }}>
                  {line.text || "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        )}

        {!featured && <div className="flex-1" />}

        <div className="flex flex-wrap gap-1.5 mb-7 relative z-10">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] tracking-wider border border-black/40 dark:border-white/20 text-black/50 dark:text-white/50 px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>

        <div className="flex gap-4 items-center relative z-10">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-wider text-[#0e0e0e] dark:text-[#f0ede6] border-b border-[#0e0e0e] dark:border-[#f0ede6] pb-px hover:text-[#c8392b] hover:border-[#c8392b] transition-colors">Live &#x2197;</a>
          ) : (
            <span className="font-mono text-[11px] tracking-wider text-black/25 dark:text-white/25">Live — coming soon</span>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-wider text-[#0e0e0e] dark:text-[#f0ede6] border-b border-[#0e0e0e] dark:border-[#f0ede6] pb-px hover:text-[#c8392b] hover:border-[#c8392b] transition-colors">GitHub &#x2197;</a>
          )}
        </div>
      </div>
    </div>
  );
}
