"use client"

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
  function handleToggle(value: string, checked: boolean) {
    if (checked) {
      onChange([...selected, value])
    } else {
      onChange(selected.filter((v) => v !== value))
    }
  }

  return (
    <div>
      <p className="text-sm font-medium text-foreground mb-3">{label}</p>
      <div className="space-y-2">
        {options.map((option) => {
          const isChecked = selected.includes(option.value)
          return (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleToggle(option.value, !!checked)
                }
              />
              <span className="text-sm text-muted-foreground">
                {option.label}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
