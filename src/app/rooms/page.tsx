"use client"

import { Suspense, useMemo, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, Search, X, Building2 } from "lucide-react"
import { properties } from "@/data/properties"
import { areas } from "@/data/areas"
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

const layoutLabelMap: Record<string, string> = {
  "1R": "1R", "1K": "1K", "1DK": "1DK", "1LDK": "1LDK",
  "2K": "2K", "2DK": "2DK", "2LDK": "2LDK", "3LDK": "3LDK",
}

function getInitialFilters(searchParams: ReturnType<typeof useSearchParams>): FilterState {
  const area = searchParams.get("area")
  const rentMax = searchParams.get("rentMax")
  return {
    ...defaultFilters,
    ...(area ? { areas: [area] } : {}),
    ...(rentMax ? { rentMax: Number(rentMax) } : {}),
  }
}

type ActiveFilter = {
  key: string
  label: string
  onRemove: () => void
}

function getActiveFilters(filters: FilterState, onChange: (f: FilterState) => void): ActiveFilter[] {
  const pills: ActiveFilter[] = []

  const areaMap = new Map(areas.map((a) => [a.slug, a.name]))

  for (const slug of filters.areas) {
    pills.push({
      key: `area-${slug}`,
      label: areaMap.get(slug) ?? slug,
      onRemove: () => onChange({ ...filters, areas: filters.areas.filter((a) => a !== slug) }),
    })
  }

  if (filters.rentMin > 0) {
    const man = filters.rentMin / 10000
    pills.push({
      key: "rentMin",
      label: `${man}万円以上`,
      onRemove: () => onChange({ ...filters, rentMin: 0 }),
    })
  }

  if (filters.rentMax < 200000) {
    const man = filters.rentMax / 10000
    pills.push({
      key: "rentMax",
      label: `${man}万円以下`,
      onRemove: () => onChange({ ...filters, rentMax: 200000 }),
    })
  }

  for (const layout of filters.layouts) {
    pills.push({
      key: `layout-${layout}`,
      label: layoutLabelMap[layout] ?? layout,
      onRemove: () => onChange({ ...filters, layouts: filters.layouts.filter((l) => l !== layout) }),
    })
  }

  if (filters.walkMinutes !== null) {
    pills.push({
      key: "walk",
      label: `徒歩${filters.walkMinutes}分以内`,
      onRemove: () => onChange({ ...filters, walkMinutes: null }),
    })
  }

  for (const bt of filters.buildingTypes) {
    pills.push({
      key: `bt-${bt}`,
      label: bt,
      onRemove: () => onChange({ ...filters, buildingTypes: filters.buildingTypes.filter((b) => b !== bt) }),
    })
  }

  for (const feat of filters.features) {
    pills.push({
      key: `feat-${feat}`,
      label: feat,
      onRemove: () => onChange({ ...filters, features: filters.features.filter((f) => f !== feat) }),
    })
  }

  return pills
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

  const activePills = useMemo(
    () => getActiveFilters(filters, setFilters),
    [filters]
  )

  const handleClearAll = useCallback(() => {
    setFilters({ ...defaultFilters })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero-like page header */}
      <div className="relative overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/[0.04] rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <Building2 className="size-5 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              物件一覧
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ml-[52px]">
            福岡の厳選された物件を探す
          </p>

          {/* Active filter pills */}
          {activePills.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-5 ml-[52px]">
              {activePills.map((pill) => (
                <button
                  key={pill.key}
                  type="button"
                  onClick={pill.onRemove}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-200"
                >
                  {pill.label}
                  <X className="size-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors px-2 py-1.5"
              >
                すべてクリア
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content area with subtle gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c14] via-transparent to-transparent h-64 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-6">
          {/* Mobile filter button */}
          <button
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
            className="md:hidden flex items-center gap-2 mb-4 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-muted-foreground hover:text-foreground hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-200"
          >
            <SlidersHorizontal className="size-4" />
            フィルター
            {activePills.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-indigo-500/20 text-[11px] font-semibold text-indigo-400 tabular-nums">
                {activePills.length}
              </span>
            )}
          </button>

          {/* Mobile filter drawer - overlay */}
          {filterDrawerOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
              onClick={() => setFilterDrawerOpen(false)}
            />
          )}

          {/* Mobile filter drawer - panel */}
          <div
            className={`fixed bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[#14141f] border-t border-white/[0.08] rounded-t-2xl z-50 md:hidden transition-transform duration-300 ease-out ${
              filterDrawerOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Drag handle */}
            <div className="sticky top-0 z-10 bg-[#14141f] pt-3 pb-2 px-4">
              <div className="w-10 h-1 rounded-full bg-white/[0.15] mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">絞り込み</h2>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors"
                  aria-label="フィルターを閉じる"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-4">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>
            <div className="sticky bottom-0 px-4 pt-4 pb-6 bg-gradient-to-t from-[#14141f] via-[#14141f] to-transparent">
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(false)}
                className="w-full py-3.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20"
              >
                {filtered.length}件の物件を表示
              </button>
            </div>
          </div>

          <div className="flex flex-row gap-8">
            {/* Sidebar - desktop only */}
            <aside className="hidden md:block w-72 shrink-0">
              <div className="sticky top-24">
                <div className="rounded-2xl border border-white/[0.06] bg-[#12121c] p-5 shadow-xl shadow-black/20">
                  <FilterSidebar filters={filters} onChange={setFilters} />
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold tabular-nums">{filtered.length}</span>
                  <span className="ml-1">件の物件</span>
                </p>
                <div className="flex items-center gap-3">
                  <Select
                    value={sortKey}
                    onValueChange={(val) => setSortKey(val as SortKey)}
                  >
                    <SelectTrigger className="w-[160px] text-xs bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15] transition-colors">
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
                <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-8">
                  <EmptyState
                    icon={<Search />}
                    title="物件が見つかりません"
                    description="条件を変更して、もう一度お探しください。フィルターをクリアすると全物件が表示されます。"
                    actionLabel="フィルターをクリア"
                    actionHref="/rooms"
                  />
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((property, index) => (
                    <div
                      key={property.id}
                      className="animate-[fadeSlideIn_0.3s_ease-out_both]"
                      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((property, index) => (
                    <div
                      key={property.id}
                      className="animate-[fadeSlideIn_0.3s_ease-out_both]"
                      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                    >
                      <PropertyListItem property={property} />
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Stagger animation keyframe */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeSlideIn {
              from {
                opacity: 0;
                transform: translateY(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `,
        }}
      />
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
