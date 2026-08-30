"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DockIconButton = React.forwardRef(function DockIconButton(
  { icon: Icon, label, onClick, className },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "relative group p-2.5 transition-colors rounded-sm",
        "hover:bg-[#0e0e0e] hover:text-[#f0f0f0] dark:hover:bg-[#f0ede6] dark:hover:text-[#0e0e0e]",
        "text-[#0e0e0e]/70 dark:text-[#f0ede6]/70",
        className
      )}
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
      <span
        className={cn(
          "absolute -top-9 left-1/2 -translate-x-1/2",
          "px-2.5 py-1 whitespace-nowrap pointer-events-none",
          "font-mono text-[10px] tracking-widest uppercase",
          "bg-[#0e0e0e] text-[#f0ede6] dark:bg-[#f0ede6] dark:text-[#0e0e0e]",
          "opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      >
        {label}
      </span>
    </button>
  );
});

const Dock = React.forwardRef(function Dock({ items, className, itemsClassName }, ref) {
  return (
    <div ref={ref} className={cn("flex items-center justify-center", className)}>
      <div className={cn("flex items-center gap-1", itemsClassName)}>
        {items.map((item) => (
          <DockIconButton key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
});

export { Dock };
