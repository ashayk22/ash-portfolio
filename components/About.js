export default function About() {
  return (
    <section id="about" className="bg-[#f0f0f0] dark:bg-[#0e0e0e] transition-colors duration-300">
      <div className="px-6 md:px-10 py-16 md:py-20">
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-black/40 dark:text-white/40 mb-2">The person behind it</p>
      <div className="flex items-baseline gap-5 border-t-2 border-[#0e0e0e] dark:border-[#f0ede6] pt-4 mb-10 md:mb-12">
        <h2 className="font-syne font-extrabold text-[13px] tracking-[0.12em] uppercase text-[#0e0e0e] dark:text-[#f0ede6]">About</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-12 items-start">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#0e0e0e] dark:bg-[#f0ede6] text-[#f0f0f0] dark:text-[#0e0e0e] font-mono text-[11px] tracking-widest uppercase px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8392b] animate-pulse flex-shrink-0" />
            Available for work &amp; freelance
          </div>

          <h3 className="font-syne font-extrabold text-[clamp(2rem,6vw,42px)] leading-none tracking-tight text-[#0e0e0e] dark:text-[#f0ede6] mb-6">
            Hi, I&apos;m<br />
            <span className="text-outline">Ashay.</span>
          </h3>

          <p className="text-[15px] leading-relaxed text-black/75 dark:text-white/75 mb-5">
            I&apos;m a developer who builds things that are <strong className="text-[#0e0e0e] dark:text-[#f0ede6] font-semibold">fast, functional, and considered.</strong> My work sits at the intersection of clean engineering and visual craft.
          </p>
          <p className="text-[15px] leading-relaxed text-black/75 dark:text-white/75 mb-7">
            Right now I&apos;m deepening my full-stack skills — working with Next.js, Supabase, and PWA patterns — while taking on freelance frontend work on the side.
          </p>

          <hr className="border-black/10 dark:border-white/10 mb-7" />

          <div className="border-l-[3px] border-[#c8392b] pl-5 py-1">
            <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#c8392b] mb-2">On using AI</p>
            <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
              I use AI as a deliberate tool, not a crutch. I know what the code does, why it&apos;s structured that way, and how to debug it when it breaks. AI accelerates my process — it doesn&apos;t replace my judgment.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute inset-0 border border-[#0e0e0e] dark:border-[#f0ede6] bg-[#e6b800] translate-x-[5px] translate-y-[5px] -z-10" />
            <div className="relative border border-[#0e0e0e] dark:border-[#f0ede6] bg-[#f0f0f0] dark:bg-[#1a1a1a] p-6 transition-colors duration-300">
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-black/35 dark:text-white/35 mb-3">Currently building</p>
              <p className="font-syne font-extrabold text-lg text-[#0e0e0e] dark:text-[#f0ede6] mb-2">This portfolio + Nook</p>
              <p className="text-sm leading-relaxed text-black/65 dark:text-white/65">Shipping ash.dev while finishing Nook — a full-stack café &amp; restaurant discovery platform for student communities.</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 border border-[#0e0e0e] dark:border-[#f0ede6] bg-[#1a1aff] translate-x-[5px] translate-y-[5px] -z-10" />
            <div className="relative border border-[#0e0e0e] dark:border-[#f0ede6] bg-[#f0f0f0] dark:bg-[#1a1a1a] p-6 transition-colors duration-300">
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-black/35 dark:text-white/35 mb-4">Open to</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Full-time frontend / full-stack roles", color: "bg-[#c8392b]" },
                  { label: "Freelance builds & client projects", color: "bg-[#c8392b]" },
                  { label: "Collaborations & open source", color: "bg-[#e6b800]" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-[#0e0e0e] dark:text-[#f0ede6]">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
