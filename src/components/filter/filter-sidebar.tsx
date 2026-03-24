"use client"

import {
  MapPin,
  LayoutGrid,
  Building2,
  Sparkles,
  Footprints,
  RotateCcw,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { areas } from "@/data/areas"
import { type FilterState, defaultFilters } from "@/lib/utils"
import { CheckboxGroup } from "./checkbox-group"
import { RentRange } from "./rent-range"

type FilterSidebarProps = {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

const layoutOptions = [
  { value: "1R", label: "1R" },
  { value: "1K", label: "1K" },
  { value: "1DK", label: "1DK" },
  { value: "1LDK", label: "1LDK" },
  { value: "2K", label: "2K" },
  { value: "2DK", label: "2DK" },
  { value: "2LDK", label: "2LDK" },
  { value: "3LDK", label: "3LDK" },
]

const buildingTypeOptions = [
  { value: "マンション", label: "マンション" },
  { value: "アパート", label: "アパート" },
]

const featureOptions = [
  { value: "オートロック", label: "オートロック" },
  { value: "バストイレ別", label: "バストイレ別" },
  { value: "宅配ボックス", label: "宅配ボックス" },
  { value: "ペット可", label: "ペット可" },
  { value: "2階以上", label: "2階以上" },
  { value: "角部屋", label: "角部屋" },
]

const walkMinuteOptions = [
  { value: 0, label: "指定なし" },
  { value: 5, label: "5分以内" },
  { value: 10, label: "10分以内" },
  { value: 15, label: "15分以内" },
]

const areaOptions = areas.map((a) => ({ value: a.slug, label: a.name }))

function GradientSeparator() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  )
}

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-indigo-400/70">{children}</span>
  )
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  function update(patch: Partial<FilterState>) {
    onChange({ ...filters, ...patch })
  }

  function handleClear() {
    onChange({ ...defaultFilters })
  }

  const activeCount =
    filters.areas.length +
    filters.layouts.length +
    filters.buildingTypes.length +
    filters.features.length +
    (filters.walkMinutes !== null ? 1 : 0) +
    (filters.rentMin > 0 ? 1 : 0) +
    (filters.rentMax < 200000 ? 1 : 0)

  return (
    <div className="w-full space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-sm font-semibold text-foreground tracking-wide">
          絞り込み
        </h2>
        <button
          type="button"
          onClick={handleClear}
          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
            activeCount > 0
              ? "bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25"
              : "text-muted-foreground/50 hover:text-muted-foreground"
          }`}
        >
          <RotateCcw className="size-3" />
          クリア
          {activeCount > 0 && (
            <span className="ml-0.5 text-[10px] font-semibold tabular-nums">
              ({activeCount})
            </span>
          )}
        </button>
      </div>

      {/* エリア */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
        <div className="flex items-center gap-2 mb-1">
          <SectionIcon><MapPin className="size-3.5" /></SectionIcon>
        </div>
        <CheckboxGroup
          label="エリア"
          options={areaOptions}
          selected={filters.areas}
          onChange={(areas) => update({ areas })}
        />
      </div>

      <GradientSeparator />

      {/* 家賃 */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
        <RentRange
          min={filters.rentMin}
          max={filters.rentMax}
          onChange={(rentMin, rentMax) => update({ rentMin, rentMax })}
        />
      </div>

      <GradientSeparator />

      {/* 間取り */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
        <div className="flex items-center gap-2 mb-1">
          <SectionIcon><LayoutGrid className="size-3.5" /></SectionIcon>
        </div>
        <CheckboxGroup
          label="間取り"
          options={layoutOptions}
          selected={filters.layouts}
          onChange={(layouts) => update({ layouts })}
        />
      </div>

      <GradientSeparator />

      {/* 駅徒歩 */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
        <div className="flex items-center gap-2 mb-3">
          <SectionIcon><Footprints className="size-3.5" /></SectionIcon>
          <p className="text-sm font-medium text-foreground">駅徒歩</p>
          {filters.walkMinutes !== null && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-indigo-500/20 text-[11px] font-semibold text-indigo-400">
              1
            </span>
          )}
        </div>
        <Select
          value={filters.walkMinutes ?? 0}
          onValueChange={(val) =>
            update({ walkMinutes: (val as number) === 0 ? null : (val as number) })
          }
        >
          <SelectTrigger className="w-full text-xs bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15] transition-colors">
            <SelectValue placeholder="指定なし" />
          </SelectTrigger>
          <SelectContent>
            {walkMinuteOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <GradientSeparator />

      {/* 建物タイプ */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
        <div className="flex items-center gap-2 mb-1">
          <SectionIcon><Building2 className="size-3.5" /></SectionIcon>
        </div>
        <CheckboxGroup
          label="建物タイプ"
          options={buildingTypeOptions}
          selected={filters.buildingTypes}
          onChange={(buildingTypes) => update({ buildingTypes })}
        />
      </div>

      <GradientSeparator />

      {/* こだわり条件 */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
        <div className="flex items-center gap-2 mb-1">
          <SectionIcon><Sparkles className="size-3.5" /></SectionIcon>
        </div>
        <CheckboxGroup
          label="こだわり条件"
          options={featureOptions}
          selected={filters.features}
          onChange={(features) => update({ features })}
        />
      </div>
    </div>
  )
}
