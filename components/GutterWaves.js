"use client";
import { useEffect, useRef } from "react";

function WaveSVG({ side }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const resize = () => {
      if (svgRef.current) {
        const h = document.documentElement.scrollHeight;
        svgRef.current.setAttribute("viewBox", `0 0 120 ${h}`);
        svgRef.current.style.height = `${h}px`;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    // Re-check after fonts/images load
    const t = setTimeout(resize, 800);
    return () => { window.removeEventListener("resize", resize); clearTimeout(t); };
  }, []);

  const isLeft = side === "left";

  // Mirror paths for right side
  const p1 = isLeft
    ? "M90,0 C50,150 110,300 60,500 C10,700 90,900 50,1100 C10,1300 70,1500 60,1700 C90,1900 40,2100 70,2300 C30,2500 80,2700 50,2900"
    : "M30,0 C70,150 10,300 60,500 C110,700 30,900 70,1100 C110,1300 50,1500 60,1700 C30,1900 80,2100 50,2300 C90,2500 40,2700 70,2900";
  const p2 = isLeft
    ? "M65,0 C25,130 80,280 35,450 C-10,620 65,800 25,980 C-15,1160 50,1340 40,1520 C70,1700 20,1880 55,2060 C15,2240 60,2420 45,2600"
    : "M55,0 C95,130 40,280 85,450 C130,620 55,800 95,980 C135,1160 70,1340 80,1520 C50,1700 100,1880 65,2060 C105,2240 60,2420 75,2600";
  const p3 = isLeft
    ? "M105,0 C65,100 110,240 75,400 C35,560 100,720 65,880 C25,1040 85,1200 75,1360 C100,1520 55,1680 85,1840 C50,2000 90,2160 75,2320"
    : "M15,0 C55,100 10,240 45,400 C85,560 20,720 55,880 C95,1040 35,1200 45,1360 C20,1520 65,1680 35,1840 C70,2000 30,2160 45,2320";

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 2000"
      preserveAspectRatio="xMidYMin slice"
      className="w-full opacity-[0.09] dark:opacity-[0.05]"
      style={{ display: "block" }}
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
      <path className="wv1" d={p1} fill="none" stroke="black" strokeWidth="2.5"/>
      <path className="wv2" d={p2} fill="none" stroke="black" strokeWidth="1.5"/>
      <path className="wv3" d={p3} fill="none" stroke="black" strokeWidth="0.8"/>
    </svg>
  );
}

export default function GutterWaves() {
  return (
    <>
      <div className="absolute left-0 top-0 w-[calc((100vw-1200px)/2)] h-full pointer-events-none overflow-hidden hidden xl:block" style={{ zIndex: 0 }}>
        <WaveSVG side="left" />
      </div>
      <div className="absolute right-0 top-0 w-[calc((100vw-1200px)/2)] h-full pointer-events-none overflow-hidden hidden xl:block" style={{ zIndex: 0 }}>
        <WaveSVG side="right" />
      </div>
    </>
  );
}
