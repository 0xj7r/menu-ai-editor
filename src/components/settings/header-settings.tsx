"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FontSelector } from "./font-selector"
import { FontWeightSelector } from "./font-weight-selector"
import { FontSizeSelector } from "./font-size-selector"
import { ColorPicker } from "./color-picker"
import { AlignmentSelector } from "./alignment-selector"
import { SliderControl } from "./slider-control"
import type { MenuSettings } from "@/types/settings"

interface HeaderSettingsProps {
  settings: MenuSettings
  onSettingChange: (path: string, value: any) => void
}

export const HeaderSettings = ({ settings, onSettingChange }: HeaderSettingsProps) => (
  <Card style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg text-white">Menu Title</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6 pt-0">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-white">Menu Name</Label>
        <Input
          value={settings.branding.headerText}
          onChange={(e) => onSettingChange("branding.headerText", e.target.value)}
          placeholder="Menu"
          className="bg-white"
        />
      </div>

      <FontSelector
        value={settings.headerText.fontFamily}
        onChange={(value) => onSettingChange("headerText.fontFamily", value)}
        label="Font Family"
      />
      <FontWeightSelector
        value={settings.headerText.fontWeight}
        onChange={(value) => onSettingChange("headerText.fontWeight", value)}
        label="Font Weight"
      />
      <FontSizeSelector
        value={settings.headerText.fontSize}
        onChange={(value) => onSettingChange("headerText.fontSize", value)}
        label="Font Size"
        textType="header"
      />
      <ColorPicker
        value={settings.headerText.color}
        onChange={(value) => onSettingChange("headerText.color", value)}
        label="Text Color"
      />

      <AlignmentSelector
        value={settings.headerText.alignment}
        onChange={(value) => onSettingChange("headerText.alignment", value)}
        label="Text Alignment"
      />

      <div className="space-y-2">
        <Label className="text-sm font-medium text-white">Line Style</Label>
        <Select
          value={settings.headerDecorations.lineType}
          onValueChange={(value) => onSettingChange("headerDecorations.lineType", value)}
        >
          <SelectTrigger className="bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="straight">Straight</SelectItem>
            <SelectItem value="dotted">Dotted</SelectItem>
            <SelectItem value="dashed">Dashed</SelectItem>
            <SelectItem value="double">Double</SelectItem>
            <SelectItem value="diamond">Diamond</SelectItem>
            <SelectItem value="stars">Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {settings.headerDecorations.lineType !== "none" && (
        <>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Line Position</Label>
            <Select
              value={settings.headerDecorations.linePosition}
              onValueChange={(value) => onSettingChange("headerDecorations.linePosition", value)}
            >
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="below">Below Text</SelectItem>
                <SelectItem value="beside">Beside Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SliderControl
            value={settings.headerDecorations.lineThickness}
            onChange={(value) => onSettingChange("headerDecorations.lineThickness", value)}
            label="Line Thickness"
            min={1}
            max={8}
          />
          <ColorPicker
            value={settings.headerDecorations.lineColor}
            onChange={(value) => onSettingChange("headerDecorations.lineColor", value)}
            label="Line Color"
          />
        </>
      )}
    </CardContent>
  </Card>
)
