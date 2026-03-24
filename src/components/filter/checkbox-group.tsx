"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

type CheckboxGroupProps = {
  label: string
  options: { value: string; label: string }[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: CheckboxGroupProps) {
  const [collapsed, setCollapsed] = useState(false)

  function handleToggle(value: string, checked: boolean) {
    if (checked) {
      onChange([...selected, value])
    } else {
      onChange(selected.filter((v) => v !== value))
    }
  }

  const selectedCount = selected.length

  return (
    <div>
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between w-full group"
      >
        <span className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {selectedCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-indigo-500/20 text-[11px] font-semibold text-indigo-400 tabular-nums">
              {selectedCount}
            </span>
          )}
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${
            collapsed ? "-rotate-90" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          collapsed ? "max-h-0 opacity-0 mt-0" : "max-h-[500px] opacity-100 mt-3"
        }`}
      >
        <div className="space-y-0.5">
          {options.map((option) => {
            const isChecked = selected.includes(option.value)
            return (
              <label
                key={option.value}
                className={`flex items-center gap-3 cursor-pointer rounded-lg px-2.5 py-2 transition-colors duration-150 ${
                  isChecked
                    ? "bg-indigo-500/10"
                    : "hover:bg-white/[0.03]"
                }`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleToggle(option.value, !!checked)
                  }
                />
                <span
                  className={`text-sm transition-colors duration-150 ${
                    isChecked ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
