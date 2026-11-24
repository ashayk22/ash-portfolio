"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader({ onComplete }) {
  const [phase, setPhase] = useState("center"); // 'center' | 'morph' | 'done'
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Check session storage to avoid annoying repeated reloads, but show once per session
    const hasSeen = sessionStorage.getItem("ash_intro_seen");
    if (hasSeen) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Lock body scroll during intro
    document.body.style.overflow = "hidden";

    // Sequence:
    // 0ms -> Center logo reveals & pulses
    // 650ms -> Morph towards navbar & curtain wipes up
    // 1300ms -> Done, reveal website completely
    const t1 = setTimeout(() => {
      setPhase("morph");
    }, 650);

    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("ash_intro_seen", "true");
      document.body.style.overflow = "";
      onComplete?.();
    }, 1350);

    const t3 = setTimeout(() => {
      setShouldRender(false);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro-curtain"
          initial={{ y: 0 }}
          animate={{
            y: phase === "morph" ? "-100%" : 0,
          }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0e0e0e] pointer-events-auto select-none"
        >
          {/* Subtle noise/grid backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Logo container that morphs to navbar position */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={
              phase === "center"
                ? { scale: 1, opacity: 1, y: 0, x: 0 }
                : {
                    scale: 0.35,
                    opacity: 0,
                    x: "-42vw",
                    y: "-45vh",
                    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
                  }
            }
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex flex-col items-center justify-center text-center px-4"
          >
            {/* The brand logo */}
            <div className="font-syne font-extrabold tracking-widest text-4xl sm:text-6xl md:text-7xl uppercase text-[#f0ede6] flex items-baseline">
              <span>ash</span>
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 0.6, repeat: 1, ease: "easeInOut" }}
                className="text-[#c8392b] inline-block mx-0.5"
              >
                .
              </motion.span>
              <span>dev</span>
            </div>

            {/* Subline tag */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={
                phase === "center"
                  ? { opacity: 0.6, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ delay: 0.15, duration: 0.4 }}
              className="font-mono text-xs sm:text-sm tracking-[0.28em] uppercase text-[#f0ede6] mt-4"
            >
              portfolio &middot; 2026
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
