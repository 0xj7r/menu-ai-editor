"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PresetSelector } from "./preset-selector"
import { SliderControl } from "./slider-control"
import { ColorPicker } from "./color-picker"
import type { MenuSettings } from "@/types/settings"

interface LayoutSettingsProps {
  settings: MenuSettings
  onSettingChange: (path: string, value: any) => void
  selectedPreset: string
  onPresetChange: (preset: string) => void
}

export const LayoutSettings = ({ settings, onSettingChange, selectedPreset, onPresetChange }: LayoutSettingsProps) => (
  <>
    <PresetSelector selectedPreset={selectedPreset} onPresetChange={onPresetChange} />

    <Card style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Page Layout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-white">Page Format</Label>
          <Select value={settings.pageFormat} onValueChange={(value) => onSettingChange("pageFormat", value)}>
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">A4</SelectItem>
              <SelectItem value="letter">Letter</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-white">Orientation</Label>
          <Select value={settings.orientation} onValueChange={(value) => onSettingChange("orientation", value)}>
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-white">Columns</Label>
          <Select
            value={settings.layout.columns.toString()}
            onValueChange={(value) => onSettingChange("layout.columns", Number.parseInt(value))}
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Single Column</SelectItem>
              <SelectItem value="2">Two Columns</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {settings.layout.columns === 2 && (
          <SliderControl
            value={settings.layout.columnGap}
            onChange={(value) => onSettingChange("layout.columnGap", value)}
            label="Column Gap"
            min={16}
            max={64}
          />
        )}
        <SliderControl
          value={settings.margins}
          onChange={(value) => onSettingChange("margins", value)}
          label="Margins"
          min={10}
          max={80}
        />
        <ColorPicker
          value={settings.backgroundColor}
          onChange={(value) => onSettingChange("backgroundColor", value)}
          label="Background Color"
        />
      </CardContent>
    </Card>

    <Card style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Spacing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <SliderControl
          value={settings.branding.logoSize}
          onChange={(value) => onSettingChange("branding.logoSize", value)}
          label="Logo Size"
          min={24}
          max={160}
        />
        <div className="space-y-2">
          <Label className="text-sm font-medium text-white">Logo Position</Label>
          <Select
            value={settings.branding.logoPosition}
            onValueChange={(value) => onSettingChange("branding.logoPosition", value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <SliderControl
          value={settings.branding.topMargin}
          onChange={(value) => onSettingChange("branding.topMargin", value)}
          label="Logo Top Margin"
          min={0}
          max={120}
        />
        <SliderControl
          value={settings.spacing.logoToHeader}
          onChange={(value) => onSettingChange("spacing.logoToHeader", value)}
          label="Logo to Header"
          min={0}
          max={100}
        />
        <SliderControl
          value={settings.spacing.headerToSection}
          onChange={(value) => onSettingChange("spacing.headerToSection", value)}
          label="Header to Section"
          min={8}
          max={80}
        />
        <SliderControl
          value={settings.spacing.sectionToCategory}
          onChange={(value) => onSettingChange("spacing.sectionToCategory", value)}
          label="Section to Category"
          min={8}
          max={80}
        />
        <SliderControl
          value={settings.spacing.categorySpacing}
          onChange={(value) => onSettingChange("spacing.categorySpacing", value)}
          label="Between Categories"
          min={16}
          max={80}
        />
        <SliderControl
          value={settings.spacing.itemSpacing}
          onChange={(value) => onSettingChange("spacing.itemSpacing", value)}
          label="Between Items"
          min={8}
          max={48}
        />
      </CardContent>
    </Card>
  </>
)
