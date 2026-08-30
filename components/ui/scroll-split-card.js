"use client";

/**
 * ScrollSplitCard — a scroll-driven card that separates into panels and
 * crossfades to reveal content, adapted from Componentry's ScrollSplitCard
 * (https://componentry.dev/docs/components/scroll-split-card, MIT license,
 * https://github.com/harshjdhv/componentry) to plain JS + this project's
 * Tailwind tokens.
 *
 * The reference implementation reveals the back content with a true 3D
 * rotateY flip (transform-style: preserve-3d + backface-visibility). That's
 * removed here in favor of an opacity crossfade over the same scroll range:
 * a 3D flip only stays visible if every ancestor between this component and
 * the page root avoids introducing a stacking/flattening context (overflow,
 * transform, filter, etc.), which is easy to violate once this sits among
 * other animated sections — and when it breaks, both faces render edge-on
 * with no error, just a blank gap. Opacity can't fail that way.
 */

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Below this width the three panels stack in a single column instead of
// sitting side-by-side. Below sm (640px), each of the 3 flex-row panels is
// only ~110-150px wide, so the desktop "separation" animation — which
// shoves the left card up to 90px further left and the right card 90px
// further right — pushes their text straight off the visible edge (this is
// what was clipping the "It's Street Coffee" card). Stacking removes the
// narrow-column problem; zeroing the x-offset below removes the shove.
const MOBILE_QUERY = "(max-width: 639px)";

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  containerRef: externalContainerRef,
  startingLabel = "Scroll down",
  endingText = "So cool, right?",
}) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: externalContainerRef,
    offset: ["start start", "end end"],
  });

  // Stage 1: Separation (0 to 0.12) — quick, so the reveal doesn't feel slow.
  // On mobile the panels are stacked (see className below), so this stays
  // at 0: there's no adjacent panel to separate from, and any horizontal
  // offset here would just push a full-width card partly off-screen.
  const leftX = useTransform(scrollYProgress, [0, 0.12, 0.85], isMobile ? [0, 0, 0] : [0, -90, -56]);
  const rightX = useTransform(scrollYProgress, [0, 0.12, 0.85], isMobile ? [0, 0, 0] : [0, 90, 56]);
  const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.9]);

  // Stage 2: crossfade from the shared image to each card's own color/
  // content — also quick (0.12 to 0.22). Deliberately NOT a 3D
  // backface-visibility flip: that mechanic is easy to silently break via
  // an ancestor's overflow/transform/filter establishing a new stacking or
  // flattening context (exactly the kind of thing a page with other
  // scroll-animated siblings tends to introduce), and when it breaks, both
  // faces just render edge-on/invisible with no error. Opacity crossfade
  // can't produce that failure mode — at every point in the range, at
  // least one side is visibly non-zero.
  const frontOpacity = useTransform(scrollYProgress, [0.12, 0.2], [1, 0]);
  const backOpacity = useTransform(scrollYProgress, [0.14, 0.22], [0, 1]);
  const frontPointerEvents = useTransform(scrollYProgress, (v) => (v < 0.18 ? "auto" : "none"));
  const backPointerEvents = useTransform(scrollYProgress, (v) => (v < 0.18 ? "none" : "auto"));
  const rotateZLeft = useTransform(scrollYProgress, [0.12, 0.22], [0, 4]);
  const rotateZRight = useTransform(scrollYProgress, [0.12, 0.22], [0, -4]);

  // Dynamic borders/radii so it looks like ONE flat image initially
  const borderRadiusLeft = useTransform(scrollYProgress, [0, 0.08], ["16px 0px 0px 16px", "16px 16px 16px 16px"]);
  const borderRadiusMiddle = useTransform(scrollYProgress, [0, 0.08], ["0px 0px 0px 0px", "16px 16px 16px 16px"]);
  const borderRadiusRight = useTransform(scrollYProgress, [0, 0.08], ["0px 16px 16px 0px", "16px 16px 16px 16px"]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 0.4]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;

  // Stage 3: DWELL. From 0.22 to 0.85 of the scroll range nothing further
  // changes — the cards just sit there, fully visible and readable, while
  // the user keeps scrolling. This is the part that was missing: reveal
  // logic that finishes in the first ~20% of the section left ~65% of the
  // scroll as a dead, un-narrated gap. Making that stretch a deliberate
  // "stay put" dwell (rather than trying to redistribute more animation
  // across it) is what actually makes the cards read as present while
  // scrolling, not as a blip you scroll past.

  // Stage 4: Cards lift slightly and exit as the section unpins (0.85 to 1)
  const cardsY = useTransform(scrollYProgress, [0.85, 1], [0, -80]);

  // Text appearance at the end in the sticky viewport
  const textOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.85, 1], [40, 0]);

  // Indicator text appearance at the start
  const startTextOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const startTextY = useTransform(scrollYProgress, [0, 0.06], [0, 20]);

  return (
    <div ref={containerRef} className={cn("relative h-[220vh] w-full", className)}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        {/* Starting text indicator */}
        <motion.div
          className="absolute top-[18%] left-0 right-0 text-center"
          style={{ opacity: startTextOpacity, y: startTextY }}
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#0e0e0e]/50 dark:text-[#f0ede6]/50">
            {startingLabel}
          </p>
        </motion.div>

        <motion.div
          style={{ scale, y: cardsY }}
          className={cn(
            "flex w-full max-w-6xl px-4 relative",
            isMobile ? "flex-col gap-4 h-auto py-4" : "flex-row gap-7 sm:gap-12 h-[460px] sm:h-[560px]"
          )}
        >
          {cards.slice(0, 3).map((card, i) => {
            // Clickable only on mobile: on desktop these panels are a
            // preview before the full Projects section below (which has
            // its own Live/GitHub buttons), so a link here just risks an
            // accidental click mid-scroll-animation. On mobile there's no
            // separate "preview vs full" distinction happening on the same
            // scroll, so tapping through is the expected affordance.
            const clickable = isMobile && (card.href || card.onClick);
            const CardTag = isMobile && card.href ? "a" : isMobile && card.onClick ? "button" : "div";
            const cardTagProps = isMobile && card.href
              ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
              : isMobile && card.onClick
                ? { type: "button", onClick: card.onClick }
                : {};
            const rotateZ = i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0;
            return (
              <motion.div
                key={card.title || i}
                className={isMobile ? "relative w-full h-[190px]" : "relative h-full flex-1"}
                style={{
                  x: i === 0 ? leftX : i === 2 ? rightX : 0,
                  rotateZ,
                  zIndex: i,
                }}
              >
                {/* Front side: shared image split across the three panels */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    zIndex: 2,
                    opacity: frontOpacity,
                    pointerEvents: frontPointerEvents,
                    borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                    boxShadow,
                  }}
                >
                  <div
                    className="absolute inset-0 h-full w-[300%]"
                    style={{
                      left: `${-100 * i}%`,
                      backgroundImage: `url("${imageSrc}")`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                    }}
                  />
                </motion.div>

                {/* Back side: the project card, crossfaded in over the image */}
                <motion.div
                  style={{ opacity: backOpacity, pointerEvents: backPointerEvents, zIndex: 1 }}
                  className="absolute inset-0"
                >
                  <CardTag
                    {...cardTagProps}
                    className={cn(
                      "absolute inset-0 overflow-hidden flex flex-col p-4 sm:p-8 text-left rounded-2xl will-change-transform w-full h-full",
                      "border border-white/5 bg-gradient-to-br from-white/10 to-transparent",
                      "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-24px_48px_rgba(0,0,0,0.2)]",
                      clickable && "cursor-pointer"
                    )}
                    style={{
                      backgroundColor: card.bgColor,
                      color: card.textColor,
                    }}
                  >
                    {/* Subtle dot-grid, matching the rest of the site's brand texture */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.15]"
                      style={{
                        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {card.tag && (
                      <span className="relative z-10 font-mono text-[10px] tracking-widest uppercase opacity-70 w-fit">
                        {card.tag}
                      </span>
                    )}

                    {/* Fills the space between the tag and the title — an
                        oversized, low-opacity index numeral rather than
                        leaving a bare gap. min-h-0 stops it (or its
                        oversized text) from ever forcing this flex column
                        taller than the card — a fixed-size flex item's
                        default min-height is its content size, not 0. */}
                    <div className="relative z-10 flex-1 min-h-0 flex items-center" aria-hidden="true">
                      <span className="font-syne font-extrabold leading-none tracking-tight opacity-[0.14] select-none text-[5.5rem] sm:text-[7.5rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="mb-3 font-syne font-extrabold text-xl sm:text-2xl leading-tight">
                        {card.title}
                      </h3>
                      {/* Description stays for desktop/tablet (matches the
                          original design); hidden on mobile only, where the
                          card is a compact clickable link to the project
                          instead of a content preview. */}
                      {card.description && (
                        <p className="hidden sm:block text-sm opacity-80 leading-relaxed">{card.description}</p>
                      )}
                      {clickable && (
                        <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase opacity-90">
                          View project
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </CardTag>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Ending text, fixed in the sticky viewport */}
        <motion.div
          className="absolute bottom-[16%] left-0 right-0 text-center px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="font-syne italic font-bold text-2xl sm:text-3xl tracking-tight text-[#0e0e0e]/80 dark:text-[#f0ede6]/80">
            {endingText}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
