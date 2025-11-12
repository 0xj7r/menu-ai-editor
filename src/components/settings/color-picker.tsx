"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label: string
}

export const ColorPicker = ({ value, onChange, label }: ColorPickerProps) => (
  <div className="flex items-center gap-2">
    <Label className="text-sm font-medium text-white">{label}</Label>
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded border-2 border-white cursor-pointer"
        style={{ backgroundColor: value }}
        onClick={() => {
          const input = document.createElement("input")
          input.type = "color"
          input.value = value
          input.onchange = (e) => onChange((e.target as HTMLInputElement).value)
          input.click()
        }}
      />
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="w-20 text-xs bg-white" />
    </div>
  </div>
)
