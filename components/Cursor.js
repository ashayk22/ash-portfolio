"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const mouse = useRef({ x: -300, y: -300 });
  const glow = useRef({ x: -300, y: -300 });
  const raf = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const obs = new MutationObserver(checkDark);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setHovering(!!e.target.closest("a, button, [data-cursor='view']"));
    };

    window.addEventListener("mousemove", onMove);

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      glow.current.x = lerp(glow.current.x, mouse.current.x, 0.08);
      glow.current.y = lerp(glow.current.y, mouse.current.y, 0.08);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%,-50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x}px, ${glow.current.y}px) translate(-50%,-50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      obs.disconnect();
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const accent = "#c8392b";
  const ink = isDark ? "#f0ede6" : "#0e0e0e";

  return (
    <>
      {/* Soft glow halo — lags */}
      <div ref={glowRef} className="fixed top-0 left-0 pointer-events-none z-[9997]" style={{ willChange: "transform" }}>
        <div style={{
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          borderRadius: "50%",
          background: hovering ? accent : ink,
          opacity: 0.08,
          filter: "blur(8px)",
          transition: "width 0.3s ease, height 0.3s ease, background 0.25s ease",
        }} />
      </div>

      {/* Sharp center dot — snaps */}
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ willChange: "transform" }}>
        <div style={{
          width: hovering ? 7 : 5,
          height: hovering ? 7 : 5,
          borderRadius: "50%",
          background: hovering ? accent : ink,
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        }} />
      </div>
    </>
  );
}
