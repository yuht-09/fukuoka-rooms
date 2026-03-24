"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, Search, X } from "lucide-react"
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

function getInitialFilters(searchParams: ReturnType<typeof useSearchParams>): FilterState {
  const area = searchParams.get("area")
  const rentMax = searchParams.get("rentMax")
  return {
    ...defaultFilters,
    ...(area ? { areas: [area] } : {}),
    ...(rentMax ? { rentMax: Number(rentMax) } : {}),
  }
}

function RoomsContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>(() => getInitialFilters(searchParams))
  const [sortKey, setSortKey] = useState<SortKey>("rent-asc")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

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
        onClick={() => setFilterDrawerOpen(true)}
        className="md:hidden flex items-center gap-2 mb-4 px-4 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <SlidersHorizontal className="size-4" />
        フィルター
      </button>

      {/* Mobile filter drawer */}
      {filterDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setFilterDrawerOpen(false)}
        />
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto bg-card border-t border-border rounded-t-2xl p-4 z-50 md:hidden transition-transform duration-300 ${
          filterDrawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">絞り込み</h2>
          <button
            type="button"
            onClick={() => setFilterDrawerOpen(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="フィルターを閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <FilterSidebar filters={filters} onChange={setFilters} />
        <div className="sticky bottom-0 pt-4 pb-2 bg-card">
          <button
            type="button"
            onClick={() => setFilterDrawerOpen(false)}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            適用する
          </button>
        </div>
      </div>

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
