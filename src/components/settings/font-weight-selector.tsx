"use client"

import { Label } from "@/components/ui/label"
import { fontWeightOptions } from "@/constants/options"

interface FontWeightSelectorProps {
  value: string
  onChange: (weight: string) => void
  label: string
}

export const FontWeightSelector = ({ value, onChange, label }: FontWeightSelectorProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-white">{label}</Label>
    <div className="flex gap-1">
      {fontWeightOptions.map((weight) => {
        const IconComponent = weight.icon
        return (
          <button
            key={weight.value}
            onClick={() => onChange(weight.value)}
            className={`p-3 rounded border-2 transition-all ${
              value === weight.value
                ? "bg-white text-[#DC0746] border-white"
                : "bg-transparent text-white border-white/30 hover:border-white/60"
            }`}
            title={weight.label}
          >
            <IconComponent size={16} />
          </button>
        )
      })}
    </div>
  </div>
)
