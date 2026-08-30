"use client";
import { useEffect, useMemo, useState } from "react";

// Builds a continuous vertical wavy line of cubic-bezier segments that
// always spans the full requested height, however tall the page is.
function buildWavePath({ height, baseX, amplitude, segment, seed }) {
  if (!height) return "";
  let d = `M${baseX},0`;
  let y = 0;
  let i = seed;
  while (y < height) {
    const step = segment;
    const nextY = Math.min(y + step, height);
    const dir = i % 2 === 0 ? 1 : -1;
    const wobble = amplitude * (0.7 + 0.3 * Math.sin(i * 0.9));
    const cx = baseX + dir * wobble;
    const c1y = y + step * 0.33;
    const c2y = y + step * 0.66;
    d += ` C${cx},${c1y} ${cx},${c2y} ${baseX},${nextY}`;
    y = nextY;
    i += 1;
  }
  return d;
}

function WaveSVG({ side, height }) {
  const isLeft = side === "left";

  const { p1, p2, p3 } = useMemo(
    () => ({
      p1: buildWavePath({ height, baseX: isLeft ? 65 : 55, amplitude: 40, segment: 200, seed: 0 }),
      p2: buildWavePath({ height, baseX: isLeft ? 45 : 75, amplitude: 30, segment: 180, seed: 3 }),
      p3: buildWavePath({ height, baseX: isLeft ? 80 : 40, amplitude: 25, segment: 160, seed: 6 }),
    }),
    [height, isLeft]
  );

  return (
    <svg
      viewBox={`0 0 120 ${height || 2000}`}
      preserveAspectRatio="xMidYMin slice"
      className="w-full text-black dark:text-white opacity-[0.09] dark:opacity-[0.12]"
      style={{ display: "block", height: height ? `${height}px` : "100%" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .wv1 { animation: wv1 9s ease-in-out infinite alternate; }
        .wv2 { animation: wv2 13s ease-in-out infinite alternate; }
        .wv3 { animation: wv3 17s ease-in-out infinite alternate; }
        @keyframes wv1 { from { transform: translateX(0); } to { transform: translateX(${isLeft ? 12 : -12}px); } }
        @keyframes wv2 { from { transform: translateX(0); } to { transform: translateX(${isLeft ? -8 : 8}px); } }
        @keyframes wv3 { from { transform: translateX(0); } to { transform: translateX(${isLeft ? 6 : -6}px); } }
      `}</style>
      <path className="wv1" d={p1} fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path className="wv2" d={p2} fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path className="wv3" d={p3} fill="none" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export default function GutterWaves() {
  const [height, setHeight] = useState(0);
  const [gutterWidth, setGutterWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      setHeight(document.documentElement.scrollHeight);
      // clientWidth excludes the scrollbar, unlike 100vw — using 100vw here
      // was the cause of the page's horizontal scroll (it's wider than the
      // actually visible viewport whenever a vertical scrollbar is present).
      const w = document.documentElement.clientWidth;
      setGutterWidth(Math.max(0, (w - 1200) / 2));
    };
    measure();
    window.addEventListener("resize", measure);
    // Re-check after fonts/images/video/layout settle
    const t1 = setTimeout(measure, 500);
    const t2 = setTimeout(measure, 1500);
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
    };
  }, []);

  if (gutterWidth <= 0) return null;

  return (
    <>
      <div
        className="absolute left-0 top-0 h-full pointer-events-none overflow-hidden hidden xl:block"
        style={{ zIndex: 0, width: gutterWidth }}
      >
        <WaveSVG side="left" height={height} />
      </div>
      <div
        className="absolute right-0 top-0 h-full pointer-events-none overflow-hidden hidden xl:block"
        style={{ zIndex: 0, width: gutterWidth }}
      >
        <WaveSVG side="right" height={height} />
      </div>
    </>
  );
}
