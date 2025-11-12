"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface SliderControlProps {
  value: number
  onChange: (value: number) => void
  label: string
  min?: number
  max?: number
  step?: number
}

export const SliderControl = ({ value, onChange, label, min = 8, max = 48, step = 1 }: SliderControlProps) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <Label className="text-sm font-medium text-white">{label}</Label>
      <span className="text-sm text-gray-300">
        {value}
        {label.includes("Size") || label.includes("Thickness") ? "px" : ""}
      </span>
    </div>
    <Slider
      value={[value]}
      onValueChange={(values) => onChange(values[0])}
      min={min}
      max={max}
      step={step}
      className="w-full [&_.slider-track]:bg-white/20 [&_.slider-range]:bg-white [&_.slider-thumb]:bg-white [&_.slider-thumb]:border-white"
    />
  </div>
)
