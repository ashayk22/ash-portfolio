"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, Mail, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

function scrollToSection(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

function NavIconLink({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="group relative p-2 text-[#0e0e0e]/60 dark:text-[#f0ede6]/60 hover:text-[#0e0e0e] dark:hover:text-[#f0ede6] transition-colors"
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#c8392b] group-hover:w-4/5 transition-all duration-200" />
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navIcons = [
    { icon: Briefcase, label: "Work", onClick: () => scrollToSection("#projects") },
    { icon: User, label: "About", onClick: () => scrollToSection("#about") },
    { icon: Mail, label: "Contact", onClick: () => scrollToSection("#contact") },
  ];

  const mobileLinks = [
    { label: "Work", id: "#projects" },
    { label: "About", id: "#about" },
    { label: "Contact", id: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 bg-[#f0f0f0]/95 dark:bg-[#0e0e0e]/95 backdrop-blur-md transition-[border-color,padding] duration-300 border-b ${
        scrolled ? "border-black/10 dark:border-white/10" : "border-transparent"
      }`}
    >
      <div className="px-6 md:px-10 lg:px-12 flex items-center justify-between gap-6 py-5">
        <span className="font-syne font-extrabold text-sm tracking-widest uppercase text-[#0e0e0e] dark:text-[#f0ede6] shrink-0">
          ash<span className="text-[#c8392b]">.</span>dev
        </span>

        {/* Desktop: icon links + toggle + Hire me, right-aligned */}
        <div className="hidden md:flex items-center gap-1">
          {navIcons.map((item) => (
            <NavIconLink key={item.label} {...item} />
          ))}

          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            title={dark ? "Light mode" : "Dark mode"}
            className="ml-2 mr-4 p-2 text-[#0e0e0e]/60 dark:text-[#f0ede6]/60 hover:text-[#0e0e0e] dark:hover:text-[#f0ede6] transition-colors"
          >
            {dark ? <Sun className="w-[18px] h-[18px]" strokeWidth={2} /> : <Moon className="w-[18px] h-[18px]" strokeWidth={2} />}
          </button>

          <a
            href="mailto:ashayku22306@gmail.com"
            className="font-mono text-[11px] tracking-widest uppercase bg-[#0e0e0e] dark:bg-[#f0ede6] text-[#f0f0f0] dark:text-[#0e0e0e] border-2 border-[#0e0e0e] dark:border-[#f0ede6] px-5 py-2.5 hover:bg-[#c8392b] hover:border-[#c8392b] hover:text-white dark:hover:bg-[#c8392b] dark:hover:border-[#c8392b] dark:hover:text-white transition-colors"
          >
            Hire me
          </a>
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-4 md:hidden ml-auto">
          <button onClick={toggle} aria-label="Toggle dark mode" className="text-[#0e0e0e]/50 dark:text-[#f0ede6]/50">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 text-[#0e0e0e] dark:text-[#f0ede6]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-black/10 dark:border-white/10 bg-[#f0f0f0] dark:bg-[#0e0e0e] md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {mobileLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  onClick={() => {
                    setOpen(false);
                    scrollToSection(link.id);
                  }}
                  className="text-left font-mono text-xs tracking-widest uppercase text-[#0e0e0e]/60 dark:text-[#f0ede6]/60 py-3 border-b border-black/5 dark:border-white/5"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * mobileLinks.length }}
                href="mailto:ashayku22306@gmail.com"
                className="font-mono text-xs tracking-widest uppercase bg-[#0e0e0e] dark:bg-[#f0ede6] text-[#f0f0f0] dark:text-[#0e0e0e] px-4 py-3 w-fit mt-4"
              >
                Hire me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
