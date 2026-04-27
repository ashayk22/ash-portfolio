"use client";
import { useState } from "react";

export default function StackContact() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.target);
    const res = await fetch("https://formspree.io/f/mwvawjrl", { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (res.ok) { setStatus("sent"); e.target.reset(); } else { setStatus("error"); }
  }

  const inputClass = "bg-transparent border border-white/20 text-[#f0ede6] font-mono text-sm px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-[#e6b800] transition-colors";

  return (
    <section id="contact" className="bg-[#0e0e0e] text-[#f0ede6]">
      <div className="px-6 md:px-10 py-16 md:py-20">
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">Get in touch</p>
      <h2 className="font-syne font-extrabold text-[clamp(2rem,6vw,4rem)] leading-tight tracking-tight mb-2">Got a project?</h2>
      <h2 className="font-syne font-extrabold text-[clamp(2rem,6vw,4rem)] leading-tight tracking-tight text-outline-white mb-10 md:mb-12">Let&apos;s build it.</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="flex flex-col gap-4">
          {status === "sent" ? (
            <div className="border border-[#e6b800] px-6 py-8">
              <p className="font-syne font-bold text-xl text-[#e6b800] mb-2">Message received.</p>
              <p className="font-mono text-sm text-white/50">I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" name="name" required placeholder="Your name" className={`flex-1 ${inputClass}`} />
                <input type="email" name="email" required placeholder="Your email" className={`flex-1 ${inputClass}`} />
              </div>
              <input type="text" name="subject" placeholder="Subject" className={inputClass} />
              <textarea name="message" required rows={5} placeholder="Tell me about your project..." className={`${inputClass} resize-none`} />
              <button type="submit" disabled={status === "sending"}
                className="group relative overflow-hidden bg-[#f0ede6] text-[#0e0e0e] font-syne font-extrabold text-sm uppercase tracking-tight px-8 py-4 border-2 border-[#f0ede6] w-fit">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#e6b800] z-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                <span className="relative z-10">{status === "sending" ? "Sending..." : "Send message \u2192"}</span>
              </button>
              {status === "error" && <p className="font-mono text-xs text-[#c8392b]">Something went wrong. Try emailing directly.</p>}
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6 pt-0 md:pt-2">
          {[
            { label: "Email", value: "ashayku22306@gmail.com", href: "mailto:ashayku22306@gmail.com" },
            { label: "LinkedIn", value: "linkedin.com/in/ashay", href: "www.linkedin.com/in/ashay-kumar-06a53b405" },
            { label: "GitHub", value: "github.com/ashayk22", href: "https://github.com/ashayk22" },
          ].map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
              className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-[#e6b800] transition-colors">
              <span className="font-mono text-xs tracking-widest uppercase text-white/40">{item.label}</span>
              <span className="font-mono text-xs md:text-sm text-[#f0ede6] group-hover:text-[#e6b800] transition-colors truncate ml-4">{item.value}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-16 md:mt-20 pt-8 border-t border-white/10">
        <span className="font-syne font-extrabold text-sm tracking-widest text-white/40">ash.dev</span>
        <span className="font-mono text-xs text-white/20 italic">Art is only abandoned, never finished.</span>
      </div>
    </div>
    </section>
  );
}
