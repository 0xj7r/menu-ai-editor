"use client"

import { Label } from "@/components/ui/label"
import { alignmentOptions } from "@/constants/options"

interface AlignmentSelectorProps {
  value: string
  onChange: (alignment: string) => void
  label: string
}

export const AlignmentSelector = ({ value, onChange, label }: AlignmentSelectorProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-white">{label}</Label>
    <div className="flex gap-1">
      {alignmentOptions.map((align) => {
        const IconComponent = align.icon
        return (
          <button
            key={align.value}
            onClick={() => onChange(align.value)}
            className={`p-2 rounded border-2 transition-all ${
              value === align.value
                ? "bg-white text-[#DC0746] border-white"
                : "bg-transparent text-white border-white/30 hover:border-white/60"
            }`}
          >
            <IconComponent size={16} />
          </button>
        )
      })}
    </div>
  </div>
)
