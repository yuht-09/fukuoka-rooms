"use client"

import { X, Building2 } from "lucide-react"
import { properties } from "@/data/properties"
import { useCompare } from "@/context/compare-context"
import { formatRent, formatArea, formatBuildAge, formatWalkMinutes } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Property } from "@/lib/types"

type CompareTableProps = {
  propertyIds: string[]
}

export function CompareTable({ propertyIds }: CompareTableProps) {
  const { removeFromCompare } = useCompare()

  const items = propertyIds
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is Property => p !== undefined)

  if (items.length === 0) return null

  const colCount = items.length + 1 // label column + property columns
  const gridCols =
    colCount === 2
      ? "grid-cols-[160px_1fr]"
      : colCount === 3
        ? "grid-cols-[160px_1fr_1fr]"
        : "grid-cols-[160px_1fr_1fr_1fr]"

  // Find best values for highlighting
  const minRent = Math.min(...items.map((p) => p.rent))
  const minWalk = Math.min(...items.map((p) => p.walkMinutes))

  const rows: { label: string; render: (p: Property) => React.ReactNode }[] = [
    {
      label: "家賃",
      render: (p) => (
        <span className={p.rent === minRent && items.length > 1 ? "text-primary font-semibold" : ""}>
          {formatRent(p.rent)}
        </span>
      ),
    },
    {
      label: "管理費",
      render: (p) => <span>{p.managementFee.toLocaleString()}円</span>,
    },
    {
      label: "間取り",
      render: (p) => <span>{p.layout}</span>,
    },
    {
      label: "専有面積",
      render: (p) => <span>{formatArea(p.area)}</span>,
    },
    {
      label: "階数",
      render: (p) => <span>{p.floor}階 / {p.totalFloors}階建</span>,
    },
    {
      label: "建物タイプ",
      render: (p) => <span>{p.buildingType}</span>,
    },
    {
      label: "築年数",
      render: (p) => <span>{formatBuildAge(p.yearBuilt)}</span>,
    },
    {
      label: "最寄駅",
      render: (p) => <span>{p.nearestStation}</span>,
    },
    {
      label: "駅徒歩",
      render: (p) => (
        <span className={p.walkMinutes === minWalk && items.length > 1 ? "text-primary font-semibold" : ""}>
          {formatWalkMinutes(p.walkMinutes)}
        </span>
      ),
    },
    {
      label: "敷金",
      render: (p) => <span>{p.deposit}ヶ月</span>,
    },
    {
      label: "礼金",
      render: (p) => <span>{p.keyMoney}ヶ月</span>,
    },
    {
      label: "設備・特徴",
      render: (p) => (
        <div className="flex flex-wrap gap-1">
          {p.features.map((f) => (
            <Badge key={f} variant="outline" className="text-xs">
              {f}
            </Badge>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="overflow-x-auto -mx-4 px-4">
    <div className="bg-card rounded-xl border border-border overflow-hidden min-w-[600px]">
      {/* Header row: images + title + remove */}
      <div className={`grid ${gridCols}`}>
        <div className="bg-secondary/50 p-4" />
        {items.map((p) => (
          <div key={p.id} className="p-4 border-l border-border">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="w-full h-32 bg-secondary/50 rounded-lg flex items-center justify-center mb-3">
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-sm leading-tight truncate">
                  {p.title}
                </h3>
              </div>
              <button
                onClick={() => removeFromCompare(p.id)}
                className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0"
                aria-label={`${p.title}を比較から削除`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison rows */}
      {rows.map((row) => (
        <div key={row.label} className={`grid ${gridCols} border-t border-border`}>
          <div className="bg-secondary/50 p-3 text-sm text-muted-foreground font-medium flex items-center">
            {row.label}
          </div>
          {items.map((p) => (
            <div key={p.id} className="p-3 text-sm border-l border-border flex items-center">
              {row.render(p)}
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  )
}
