"use client"

import { useMemo } from "react"
import { Banknote } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type RentRangeProps = {
  min: number
  max: number
  onChange: (min: number, max: number) => void
}

const rentOptions = [
  { value: 0, label: "なし" },
  { value: 30000, label: "3万円" },
  { value: 40000, label: "4万円" },
  { value: 50000, label: "5万円" },
  { value: 60000, label: "6万円" },
  { value: 70000, label: "7万円" },
  { value: 80000, label: "8万円" },
  { value: 90000, label: "9万円" },
  { value: 100000, label: "10万円" },
  { value: 120000, label: "12万円" },
  { value: 150000, label: "15万円" },
  { value: 200000, label: "20万円" },
]

const SCALE_MIN = 0
const SCALE_MAX = 200000

function formatRentLabel(yen: number): string {
  if (yen === 0) return "下限なし"
  if (yen === 200000) return "上限なし"
  const man = yen / 10000
  return `${man % 1 === 0 ? man.toFixed(0) : man.toFixed(1)}万円`
}

export function RentRange({ min, max, onChange }: RentRangeProps) {
  const rangeBar = useMemo(() => {
    const leftPct = (min / SCALE_MAX) * 100
    const rightPct = (max / SCALE_MAX) * 100
    return { left: `${leftPct}%`, width: `${rightPct - leftPct}%` }
  }, [min, max])

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Banknote className="size-4 text-amber-500/70" />
        <p className="text-sm font-medium text-foreground">家賃</p>
      </div>

      {/* Visual range bar */}
      <div className="relative h-1.5 rounded-full bg-white/[0.06] mb-4">
        <div
          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
          style={rangeBar}
        />
        {/* Glow effect */}
        <div
          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-indigo-500/40 to-indigo-400/40 blur-sm"
          style={rangeBar}
        />
      </div>

      {/* Range label */}
      <p className="text-xs font-medium text-indigo-400 mb-3 tracking-wide">
        {formatRentLabel(min)} 〜 {formatRentLabel(max)}
      </p>

      {/* Selects */}
      <div className="flex items-center gap-2">
        <Select value={min} onValueChange={(val) => onChange(val as number, max)}>
          <SelectTrigger className="flex-1 text-xs bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15] transition-colors">
            <SelectValue placeholder="下限" />
          </SelectTrigger>
          <SelectContent>
            {rentOptions
              .filter((o) => o.value < max || o.value === 0)
              .map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.value === 0 ? "下限なし" : option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground/50 shrink-0 font-light">〜</span>
        <Select value={max} onValueChange={(val) => onChange(min, val as number)}>
          <SelectTrigger className="flex-1 text-xs bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15] transition-colors">
            <SelectValue placeholder="上限" />
          </SelectTrigger>
          <SelectContent>
            {rentOptions
              .filter((o) => o.value > min || o.value === 200000)
              .map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.value === 200000 ? "上限なし" : option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
