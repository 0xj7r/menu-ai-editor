"use client"

import { Label } from "@/components/ui/label"
import { getSizeOptions } from "@/constants/options"

interface FontSizeSelectorProps {
  value: number
  onChange: (size: number) => void
  label: string
  textType?: string
}

export const FontSizeSelector = ({ value, onChange, label, textType = "default" }: FontSizeSelectorProps) => {
  const sizeOptions = getSizeOptions(textType)

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white">{label}</Label>
      <div className="flex gap-1">
        {sizeOptions.map((size) => (
          <button
            key={size.label}
            onClick={() => onChange(size.value)}
            className={`px-3 py-2 rounded border-2 transition-all text-sm font-medium ${
              value === size.value
                ? "bg-white text-[#DC0746] border-white"
                : "bg-transparent text-white border-white/30 hover:border-white/60"
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  )
}
