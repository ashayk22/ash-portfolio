"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ProjectCard from "./ProjectCard";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

// Each row glides in from alternating sides as it scrolls into view, then
// settles at rest (x: 0) with every card in the row on screen — a short,
// scroll-linked reveal rather than a long pinned horizontal pan. The old
// pin-and-pan approach could leave a row "stuck" mid-scroll with a card
// only half-revealed; this always lands fully visible. Cards sit in a
// fixed 3-column grid (rather than fixed-width flex items) so all three
// always stay on one row and shrink together to fit the viewport, instead
// of the third card wrapping to its own line.
function ScrollRow({ cards, reverse, onDelete }) {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 90%", "start 45%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.4,
  });

  const x = useTransform(progress, [0, 1], reverse ? [140, 0] : [-140, 0]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);

  // Match the grid's column count to how many cards are actually in this
  // row, so a trailing row with fewer than 3 cards doesn't shrink down to
  // occupying just one narrow column.
  const gridCols = cards.length >= 3 ? "grid-cols-3" : cards.length === 2 ? "grid-cols-2" : "grid-cols-1 max-w-md";

  return (
    <div ref={rowRef} className="overflow-hidden">
      <motion.div
        style={{ x, opacity }}
        className={`grid ${gridCols} gap-6 md:gap-8 will-change-transform`}
      >
        {cards.map((project) => (
          <div key={project.id} className="min-w-0 h-[440px] md:h-[460px]">
            <ProjectCard project={project} featured={project.featured} onDelete={onDelete} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ProjectsScroll({ projects, onDelete }) {
  // Cap every row at 3 cards so rows stay a predictable, comfortable width.
  const rows = chunk(projects, 3);

  return (
    <div className="flex flex-col gap-10 md:gap-16 pb-4">
      {rows.map((row, i) => (
        <ScrollRow key={i} cards={row} reverse={i % 2 === 1} onDelete={onDelete} />
      ))}
    </div>
  );
}
