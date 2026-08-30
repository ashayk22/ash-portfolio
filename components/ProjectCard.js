const shadowColors = { red: "bg-[#c8392b]", yellow: "bg-[#e6b800]", blue: "bg-[#1a1aff]" };

export default function ProjectCard({ project, featured = false, onDelete }) {
  const shadow = shadowColors[project.shadow] || "bg-[#c8392b]";
  return (
    <div data-cursor="view" className="relative group">
      <div className={`absolute inset-0 border border-[#0e0e0e] dark:border-[#f0ede6] ${shadow} translate-x-[6px] translate-y-[6px] -z-10 transition-all duration-150 group-hover:translate-x-[8px] group-hover:translate-y-[8px]`} />
      <div className="relative bg-[#f0f0f0] dark:bg-[#1a1a1a] border border-[#0e0e0e] dark:border-[#f0ede6] p-7 h-full flex flex-col transition-all duration-150 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] overflow-hidden">
        {project.custom && onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(project.id);
            }}
            aria-label="Remove locally added project"
            className="absolute top-4 right-4 z-20 font-mono text-[10px] tracking-widest uppercase text-black/30 dark:text-white/30 hover:text-[#c8392b] border border-black/10 dark:border-white/10 hover:border-[#c8392b] px-2 py-1 transition-colors"
          >
            Remove
          </button>
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

        <p className={`font-mono text-[10px] tracking-widest uppercase mb-2 relative z-10 flex items-center gap-2 ${featured ? "text-[#c8392b]" : project.inProgress ? "text-black/35 dark:text-white/35" : "text-[#1a1aff] dark:text-[#6677ff]"}`}>
          {project.type}
          {project.custom && (
            <span className="text-black/30 dark:text-white/30 border border-black/15 dark:border-white/15 px-1.5 py-[1px] normal-case tracking-normal">local</span>
          )}
        </p>

        <h3 className="font-syne font-extrabold leading-tight text-[#0e0e0e] dark:text-[#f0ede6] mb-4 relative z-10 text-2xl">
          {project.title.split(" ").map((word, i) => <span key={i} className="block">{word}</span>)}
        </h3>

        <hr className="border-black/10 dark:border-white/10 mb-5 relative z-10" />

        <p className="text-black/70 dark:text-white/70 leading-relaxed mb-6 relative z-10 text-sm">{project.description}</p>

        <div className="flex-1" />

        <div className="flex flex-wrap gap-1.5 mb-7 relative z-10">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] tracking-wider border border-black/40 dark:border-white/20 text-black/50 dark:text-white/50 px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center relative z-10">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-wider uppercase text-[#0e0e0e] dark:text-[#f0ede6] border border-[#0e0e0e] dark:border-[#f0ede6] px-3.5 py-2 hover:bg-[#0e0e0e] hover:text-[#f0f0f0] dark:hover:bg-[#f0ede6] dark:hover:text-[#0e0e0e] transition-colors"
            >
              Live &#x2197;
            </a>
          ) : (
            <span className="font-mono text-[11px] tracking-wider uppercase text-black/25 dark:text-white/25 border border-black/10 dark:border-white/10 px-3.5 py-2 cursor-not-allowed">
              Live — coming soon
            </span>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-wider uppercase text-[#0e0e0e] dark:text-[#f0ede6] border border-[#0e0e0e] dark:border-[#f0ede6] px-3.5 py-2 hover:bg-[#0e0e0e] hover:text-[#f0f0f0] dark:hover:bg-[#f0ede6] dark:hover:text-[#0e0e0e] transition-colors"
            >
              GitHub &#x2197;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
