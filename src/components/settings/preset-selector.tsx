"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PresetSelectorProps {
  selectedPreset: string
  onPresetChange: (preset: string) => void
}

export const PresetSelector = ({ selectedPreset, onPresetChange }: PresetSelectorProps) => (
  <Card style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg text-white">Color Presets</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3 pt-0">
      <div className="grid grid-cols-1 gap-2">
        {/* Standard Preset */}
        <button
          onClick={() => onPresetChange("standard")}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 shadow-sm border-2 ${
            selectedPreset === "standard"
              ? "bg-white border-white"
              : "bg-white/90 border-white/50 hover:bg-white hover:border-white"
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-100 border-2 border-gray-300 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-gray-800"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📄</span>
            </div>
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold text-gray-900 text-sm">Standard</div>
            <div className="text-xs text-gray-500">Clean white background with dark text</div>
          </div>
          {selectedPreset === "standard" && (
            <div className="w-5 h-5 bg-[#DC0746] rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </button>

        {/* Qodeup Style Preset */}
        <button
          onClick={() => onPresetChange("qodeup")}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 shadow-sm border-2 ${
            selectedPreset === "qodeup"
              ? "bg-white border-white"
              : "bg-white/90 border-white/50 hover:bg-white hover:border-white"
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-white"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🎨</span>
            </div>
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold text-gray-900 text-sm">Qodeup Style</div>
            <div className="text-xs text-gray-500">Bold red theme with elegant accents</div>
          </div>
          {selectedPreset === "qodeup" && (
            <div className="w-5 h-5 bg-[#DC0746] rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </button>

        {/* Nature Preset */}
        <button
          onClick={() => onPresetChange("nature")}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 shadow-sm border-2 ${
            selectedPreset === "nature"
              ? "bg-white border-white"
              : "bg-white/90 border-white/50 hover:bg-white hover:border-white"
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-green-800"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full flex items-center justify-center">
              <span className="text-green-800 text-xs">🌿</span>
            </div>
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold text-gray-900 text-sm">Nature</div>
            <div className="text-xs text-gray-500">Organic green with earth tones</div>
          </div>
          {selectedPreset === "nature" && (
            <div className="w-5 h-5 bg-[#DC0746] rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </button>

        {/* Ocean Preset */}
        <button
          onClick={() => onPresetChange("ocean")}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 shadow-sm border-2 ${
            selectedPreset === "ocean"
              ? "bg-white border-white"
              : "bg-white/90 border-white/50 hover:bg-white hover:border-white"
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-blue-900"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full flex items-center justify-center">
              <span className="text-blue-800 text-xs">🌊</span>
            </div>
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold text-gray-900 text-sm">Ocean</div>
            <div className="text-xs text-gray-500">Deep blue with aqua highlights</div>
          </div>
          {selectedPreset === "ocean" && (
            <div className="w-5 h-5 bg-[#DC0746] rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </button>
      </div>
    </CardContent>
  </Card>
)
