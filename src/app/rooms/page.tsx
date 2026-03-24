"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Building2, SlidersHorizontal, Search } from "lucide-react"
import { properties } from "@/data/properties"
import { FilterSidebar } from "@/components/filter/filter-sidebar"
import { PropertyCard } from "@/components/property/property-card"
import { PropertyListItem } from "@/components/property/property-list-item"
import { ViewToggle } from "@/components/shared/view-toggle"
import { EmptyState } from "@/components/shared/empty-state"
import {
  filterProperties,
  sortProperties,
  defaultFilters,
  type FilterState,
  type SortKey,
} from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "rent-asc", label: "家賃が安い順" },
  { value: "rent-desc", label: "家賃が高い順" },
  { value: "year-desc", label: "築年が新しい順" },
  { value: "walk-asc", label: "駅から近い順" },
]

function RoomsContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [sortKey, setSortKey] = useState<SortKey>("rent-asc")
  const [view, setView] = useState<"grid" | "list">("grid")

  // Read URL params on mount
  useEffect(() => {
    const area = searchParams.get("area")
    const rentMax = searchParams.get("rentMax")

    if (area || rentMax) {
      setFilters((prev) => ({
        ...prev,
        ...(area ? { areas: [area] } : {}),
        ...(rentMax ? { rentMax: Number(rentMax) } : {}),
      }))
    }
  }, [searchParams])

  const filtered = useMemo(
    () => sortProperties(filterProperties(properties, filters), sortKey),
    [filters, sortKey]
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <h1 className="text-2xl font-bold mb-6">物件一覧</h1>

      {/* Mobile filter button */}
      <button
        type="button"
        className="md:hidden flex items-center gap-2 mb-4 px-4 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <SlidersHorizontal className="size-4" />
        フィルター
      </button>

      <div className="flex flex-row gap-8">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="sticky top-24">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filtered.length}件の物件
            </p>
            <div className="flex items-center gap-3">
              <Select
                value={sortKey}
                onValueChange={(val) => setSortKey(val as SortKey)}
              >
                <SelectTrigger className="w-[160px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ViewToggle view={view} onViewChange={setView} />
            </div>
          </div>

          {/* Property list */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Search />}
              title="物件が見つかりません"
              description="条件に合う物件が見つかりませんでした"
            />
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((property) => (
                <PropertyListItem key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function RoomsPage() {
  return (
    <Suspense>
      <RoomsContent />
    </Suspense>
  )
}
