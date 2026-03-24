"use client"

import { Grid3x3, List } from "lucide-react"
import { cn } from "@/lib/utils"

type ViewToggleProps = {
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onViewChange("grid")}
        className={cn(
          "p-2 rounded-lg transition-colors",
          view === "grid"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-muted-foreground hover:text-foreground"
        )}
        aria-label="グリッド表示"
      >
        <Grid3x3 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onViewChange("list")}
        className={cn(
          "p-2 rounded-lg transition-colors",
          view === "list"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-muted-foreground hover:text-foreground"
        )}
        aria-label="リスト表示"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  )
}
