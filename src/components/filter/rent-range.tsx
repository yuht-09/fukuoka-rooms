"use client"

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

function formatRentLabel(yen: number): string {
  if (yen === 0) return "下限なし"
  if (yen === 200000) return "上限なし"
  const man = yen / 10000
  return `${man % 1 === 0 ? man.toFixed(0) : man.toFixed(1)}万円`
}

export function RentRange({ min, max, onChange }: RentRangeProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground mb-3">家賃</p>
      <div className="flex items-center gap-2">
        <Select value={min} onValueChange={(val) => onChange(val as number, max)}>
          <SelectTrigger className="flex-1 text-xs">
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
        <span className="text-xs text-muted-foreground shrink-0">〜</span>
        <Select value={max} onValueChange={(val) => onChange(min, val as number)}>
          <SelectTrigger className="flex-1 text-xs">
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
      <p className="text-xs text-muted-foreground mt-2">
        {formatRentLabel(min)} 〜 {formatRentLabel(max)}
      </p>
    </div>
  )
}
