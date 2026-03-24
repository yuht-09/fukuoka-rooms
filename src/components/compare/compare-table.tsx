"use client"

import { X, Building2, Home, Wallet, LayoutGrid, Maximize2, Layers, Building, Calendar, Train, Footprints, Banknote, Gift, Sparkles } from "lucide-react"
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

  // Find best values for highlighting
  const minRent = Math.min(...items.map((p) => p.rent))
  const maxArea = Math.max(...items.map((p) => p.area))
  const minWalk = Math.min(...items.map((p) => p.walkMinutes))

  const rows: { label: string; icon: React.ReactNode; render: (p: Property) => React.ReactNode }[] = [
    {
      label: "家賃",
      icon: <Wallet className="w-3.5 h-3.5" />,
      render: (p) => (
        <span className={p.rent === minRent && items.length > 1
          ? "bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-bold"
          : ""
        }>
          {formatRent(p.rent)}
          {p.rent === minRent && items.length > 1 && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              BEST
            </span>
          )}
        </span>
      ),
    },
    {
      label: "管理費",
      icon: <Banknote className="w-3.5 h-3.5" />,
      render: (p) => <span>{p.managementFee.toLocaleString()}円</span>,
    },
    {
      label: "間取り",
      icon: <LayoutGrid className="w-3.5 h-3.5" />,
      render: (p) => <span className="font-medium">{p.layout}</span>,
    },
    {
      label: "専有面積",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      render: (p) => (
        <span className={p.area === maxArea && items.length > 1
          ? "bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-bold"
          : ""
        }>
          {formatArea(p.area)}
          {p.area === maxArea && items.length > 1 && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              BEST
            </span>
          )}
        </span>
      ),
    },
    {
      label: "階数",
      icon: <Layers className="w-3.5 h-3.5" />,
      render: (p) => <span>{p.floor}階 / {p.totalFloors}階建</span>,
    },
    {
      label: "建物タイプ",
      icon: <Building className="w-3.5 h-3.5" />,
      render: (p) => <span>{p.buildingType}</span>,
    },
    {
      label: "築年数",
      icon: <Calendar className="w-3.5 h-3.5" />,
      render: (p) => <span>{formatBuildAge(p.yearBuilt)}</span>,
    },
    {
      label: "最寄駅",
      icon: <Train className="w-3.5 h-3.5" />,
      render: (p) => <span>{p.nearestStation}</span>,
    },
    {
      label: "駅徒歩",
      icon: <Footprints className="w-3.5 h-3.5" />,
      render: (p) => (
        <span className={p.walkMinutes === minWalk && items.length > 1
          ? "bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-bold"
          : ""
        }>
          {formatWalkMinutes(p.walkMinutes)}
          {p.walkMinutes === minWalk && items.length > 1 && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              BEST
            </span>
          )}
        </span>
      ),
    },
    {
      label: "敷金",
      icon: <Gift className="w-3.5 h-3.5" />,
      render: (p) => <span>{p.deposit}ヶ月</span>,
    },
    {
      label: "礼金",
      icon: <Banknote className="w-3.5 h-3.5" />,
      render: (p) => <span>{p.keyMoney}ヶ月</span>,
    },
    {
      label: "設備・特徴",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      render: (p) => (
        <div className="flex flex-wrap gap-1.5">
          {p.features.map((f) => (
            <Badge key={f} variant="outline" className="text-xs border-[#2a2a3a] bg-[#0a0a0f]/50">
              {f}
            </Badge>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="relative overflow-x-auto -mx-4 px-4">
      {/* Scroll gradient indicators */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 md:hidden" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 md:hidden" />

      <div className="min-w-[600px]">
        {/* Property header cards */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
          {items.map((p) => (
            <div
              key={p.id}
              className="group relative rounded-xl overflow-hidden bg-[#14141f] border border-[#1e1e2e] hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Gradient top border */}
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />

              {/* Subtle glow */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="p-4 relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="w-full h-28 bg-[#0a0a0f] rounded-lg flex items-center justify-center mb-3 border border-[#1e1e2e]">
                      <Building2 className="w-8 h-8 text-indigo-500/40" />
                    </div>
                    <h3 className="font-semibold text-sm leading-tight truncate text-gray-100">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">{p.address}</p>
                  </div>
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="p-1.5 rounded-lg bg-[#0a0a0f]/50 border border-[#1e1e2e] text-gray-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-200 shrink-0"
                    aria-label={`${p.title}を比較から削除`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison rows */}
        <div className="rounded-xl overflow-hidden border border-[#1e1e2e] bg-[#14141f]">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid border-b border-[#1e1e2e] last:border-b-0 ${i % 2 === 0 ? "bg-[#14141f]" : "bg-[#11111a]"}`}
              style={{ gridTemplateColumns: `180px repeat(${items.length}, 1fr)` }}
            >
              {/* Label cell */}
              <div className="p-3.5 text-sm text-gray-400 font-medium flex items-center gap-2.5 border-r border-[#1e1e2e]">
                <span className="text-indigo-400/70">{row.icon}</span>
                {row.label}
              </div>
              {/* Value cells */}
              {items.map((p, j) => (
                <div
                  key={p.id}
                  className={`p-3.5 text-sm text-gray-200 flex items-center ${j < items.length - 1 ? "border-r border-[#1e1e2e]" : ""}`}
                >
                  {row.render(p)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
