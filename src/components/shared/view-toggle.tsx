"use client"

import { Grid3x3, List } from "lucide-react"
import { cn } from "@/lib/utils"

type ViewToggleProps = {
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="relative flex items-center gap-0.5 rounded-full bg-secondary/80 p-1 ring-1 ring-inset ring-white/[0.06]">
      {/* Sliding indicator */}
      <div
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-2px)] rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.3)] transition-all duration-300 ease-out",
          view === "grid" ? "left-1" : "left-[calc(50%+1px)]"
        )}
      />

      <button
        type="button"
        onClick={() => onViewChange("grid")}
        className={cn(
          "relative z-10 p-2 rounded-full transition-colors duration-200",
          view === "grid"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="グリッド表示"
      >
        <Grid3x3 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onViewChange("list")}
        className={cn(
          "relative z-10 p-2 rounded-full transition-colors duration-200",
          view === "list"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="リスト表示"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  )
}
