"use client"

import { SlidersHorizontal, RotateCcw } from "lucide-react"
import { Separator } from "@/components/ui/separator"
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

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  function update(patch: Partial<FilterState>) {
    onChange({ ...filters, ...patch })
  }

  function handleClear() {
    onChange({ ...defaultFilters })
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">絞り込み</h2>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="size-3" />
          クリア
        </button>
      </div>

      <Separator />

      {/* エリア */}
      <CheckboxGroup
        label="エリア"
        options={areaOptions}
        selected={filters.areas}
        onChange={(areas) => update({ areas })}
      />

      <Separator />

      {/* 家賃 */}
      <RentRange
        min={filters.rentMin}
        max={filters.rentMax}
        onChange={(rentMin, rentMax) => update({ rentMin, rentMax })}
      />

      <Separator />

      {/* 間取り */}
      <CheckboxGroup
        label="間取り"
        options={layoutOptions}
        selected={filters.layouts}
        onChange={(layouts) => update({ layouts })}
      />

      <Separator />

      {/* 駅徒歩 */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">駅徒歩</p>
        <Select
          value={filters.walkMinutes ?? 0}
          onValueChange={(val) =>
            update({ walkMinutes: (val as number) === 0 ? null : (val as number) })
          }
        >
          <SelectTrigger className="w-full text-xs">
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

      <Separator />

      {/* 建物タイプ */}
      <CheckboxGroup
        label="建物タイプ"
        options={buildingTypeOptions}
        selected={filters.buildingTypes}
        onChange={(buildingTypes) => update({ buildingTypes })}
      />

      <Separator />

      {/* こだわり条件 */}
      <CheckboxGroup
        label="こだわり条件"
        options={featureOptions}
        selected={filters.features}
        onChange={(features) => update({ features })}
      />
    </div>
  )
}
