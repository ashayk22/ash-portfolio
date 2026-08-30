"use client";

import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";

const emptyForm = {
  name: "",
  email: "",
  projectType: "Full-stack web app",
  budget: "",
  message: "",
};

export default function HireCTA() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setValues(emptyForm);
    }
  }, [open]);

  function handleChange(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mwvawjrl", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `New hire inquiry — ${values.name || "Someone"}`,
          name: values.name,
          email: values.email,
          projectType: values.projectType,
          budget: values.budget,
          message: values.message,
        }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[#f0f0f0] dark:bg-[#141414] border border-black/15 dark:border-white/15 px-3 py-2.5 text-sm font-mono text-[#0e0e0e] dark:text-[#f0ede6] placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#c8392b] transition-colors";
  const labelClass = "font-mono text-[10px] tracking-widest uppercase text-black/40 dark:text-white/40 mb-1.5 block";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#c8392b] text-white font-mono text-[11px] tracking-widest uppercase px-5 py-3 border-2 border-[#0e0e0e] dark:border-[#f0ede6] shadow-[4px_4px_0_0_#0e0e0e] dark:shadow-[4px_4px_0_0_#f0ede6] hover:shadow-[6px_6px_0_0_#0e0e0e] dark:hover:shadow-[6px_6px_0_0_#f0ede6] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
      >
        <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
        Hire me
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg bg-[#f0f0f0] dark:bg-[#161616] border border-[#0e0e0e] dark:border-[#f0ede6] my-8">
            <div className="absolute inset-0 border border-[#0e0e0e] dark:border-[#f0ede6] bg-[#c8392b] translate-x-[6px] translate-y-[6px] -z-10" />

            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 px-6 py-4">
              <h3 className="font-syne font-extrabold text-sm tracking-widest uppercase text-[#0e0e0e] dark:text-[#f0ede6]">
                Let&apos;s work together
              </h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1.5 -mr-1.5 text-black/50 dark:text-white/50 hover:text-[#c8392b] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="px-6 py-6">
              {status === "sent" ? (
                <div className="flex flex-col items-center text-center gap-3 py-8">
                  <p className="font-syne font-bold text-xl text-[#e6b800]">Message received.</p>
                  <p className="font-mono text-sm text-black/50 dark:text-white/50">
                    I&apos;ll get back to you soon — usually within a day or two.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2 font-mono text-xs tracking-widest uppercase border border-[#0e0e0e] dark:border-[#f0ede6] text-[#0e0e0e] dark:text-[#f0ede6] px-5 py-2.5 hover:bg-[#0e0e0e] hover:text-[#f0f0f0] dark:hover:bg-[#f0ede6] dark:hover:text-[#0e0e0e] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <p className="font-mono text-[11px] text-black/50 dark:text-white/50 leading-relaxed">
                    Tell me a bit about your project and I&apos;ll reply with next steps.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Name *</label>
                      <input
                        className={inputClass}
                        value={values.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Project type</label>
                      <select
                        className={inputClass}
                        value={values.projectType}
                        onChange={(e) => handleChange("projectType", e.target.value)}
                      >
                        <option>Full-stack web app</option>
                        <option>Landing page / marketing site</option>
                        <option>Frontend build from design</option>
                        <option>Ongoing / freelance work</option>
                        <option>Something else</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Budget (optional)</label>
                      <input
                        className={inputClass}
                        value={values.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                        placeholder="e.g. $500–1000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Message *</label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={4}
                      value={values.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="What are you looking to build?"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="bg-[#0e0e0e] dark:bg-[#f0ede6] text-[#f0f0f0] dark:text-[#0e0e0e] font-syne font-extrabold text-xs uppercase tracking-tight px-6 py-3 border-2 border-[#0e0e0e] dark:border-[#f0ede6] hover:bg-[#c8392b] hover:border-[#c8392b] hover:text-white transition-colors disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending..." : "Send inquiry"}
                    </button>
                    {status === "error" && (
                      <span className="font-mono text-xs text-[#c8392b]">Something went wrong — try emailing directly.</span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
