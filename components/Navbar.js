"use client";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <nav className="border-b border-black/10 dark:border-white/10 bg-[#f0f0f0] dark:bg-[#0e0e0e] transition-colors duration-300 relative z-50">
      <div className="px-6 md:px-10 flex items-center justify-between py-5">
        <span className="font-syne font-extrabold text-sm tracking-widest uppercase text-[#0e0e0e] dark:text-[#f0ede6]">
          ash<span className="text-[#c8392b]">.</span>dev
        </span>

        <div className="hidden md:flex items-center gap-8">
          <a href="#projects" className="font-mono text-xs tracking-widest uppercase text-[#0e0e0e]/50 dark:text-[#f0ede6]/50 hover:text-[#0e0e0e] dark:hover:text-[#f0ede6] transition-colors">Work</a>
          <a href="#about" className="font-mono text-xs tracking-widest uppercase text-[#0e0e0e]/50 dark:text-[#f0ede6]/50 hover:text-[#0e0e0e] dark:hover:text-[#f0ede6] transition-colors">About</a>
          <a href="#contact" className="font-mono text-xs tracking-widest uppercase text-[#0e0e0e]/50 dark:text-[#f0ede6]/50 hover:text-[#0e0e0e] dark:hover:text-[#f0ede6] transition-colors">Contact</a>

          <button onClick={toggle} aria-label="Toggle dark mode"
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#0e0e0e]/40 dark:text-[#f0ede6]/40 hover:text-[#0e0e0e] dark:hover:text-[#f0ede6] transition-colors">
            <span className="relative w-9 h-5 rounded-full border border-black/20 dark:border-white/20 transition-colors duration-300"
              style={{ background: dark ? "#e6b800" : "transparent" }}>
              <span className="absolute top-[3px] w-[14px] h-[14px] rounded-full bg-[#0e0e0e] dark:bg-[#f0ede6] transition-all duration-300"
                style={{ left: dark ? "calc(100% - 17px)" : "3px" }} />
            </span>
            {dark ? "☀" : "🌙"}
          </button>

          <a href="mailto:ashayku22306@gmail.com"
            className="font-mono text-xs tracking-widest uppercase bg-[#0e0e0e] dark:bg-[#f0ede6] text-[#f0f0f0] dark:text-[#0e0e0e] px-4 py-2 hover:bg-[#c8392b] dark:hover:bg-[#c8392b] dark:hover:text-white transition-colors">
            Hire me
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggle} className="text-[#0e0e0e]/50 dark:text-[#f0ede6]/50 text-base">{dark ? "☀" : "🌙"}</button>
          <button className="flex flex-col gap-[5px] p-2" onClick={() => setOpen(!open)}>
            <span className={`block w-5 h-[1.5px] bg-[#0e0e0e] dark:bg-[#f0ede6] transition-all duration-200 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#0e0e0e] dark:bg-[#f0ede6] transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#0e0e0e] dark:bg-[#f0ede6] transition-all duration-200 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#f0f0f0] dark:bg-[#0e0e0e] border-b border-black/10 dark:border-white/10 flex flex-col px-6 py-6 gap-5 md:hidden">
          <a href="#projects" onClick={() => setOpen(false)} className="font-mono text-xs tracking-widest uppercase text-[#0e0e0e]/50 dark:text-[#f0ede6]/50">Work</a>
          <a href="#about" onClick={() => setOpen(false)} className="font-mono text-xs tracking-widest uppercase text-[#0e0e0e]/50 dark:text-[#f0ede6]/50">About</a>
          <a href="#contact" onClick={() => setOpen(false)} className="font-mono text-xs tracking-widest uppercase text-[#0e0e0e]/50 dark:text-[#f0ede6]/50">Contact</a>
          <a href="mailto:ashayku22306@gmail.com" className="font-mono text-xs tracking-widest uppercase bg-[#0e0e0e] dark:bg-[#f0ede6] text-white dark:text-[#0e0e0e] px-4 py-2 w-fit">Hire me</a>
        </div>
      )}
    </nav>
  );
}
