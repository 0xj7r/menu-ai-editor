"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fontOptions } from "@/constants/options"

interface FontSelectorProps {
  value: string
  onChange: (font: string) => void
  label: string
}

export const FontSelector = ({ value, onChange, label }: FontSelectorProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-white">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {fontOptions.map((font) => (
          <SelectItem key={font.value} value={font.value}>
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)
