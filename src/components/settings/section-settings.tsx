"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { FontSelector } from "./font-selector"
import { FontWeightSelector } from "./font-weight-selector"
import { FontSizeSelector } from "./font-size-selector"
import { ColorPicker } from "./color-picker"
import { AlignmentSelector } from "./alignment-selector"
import { SliderControl } from "./slider-control"
import type { MenuSettings } from "@/types/settings"

interface SectionSettingsProps {
  settings: MenuSettings
  onSettingChange: (path: string, value: any) => void
}

export const SectionSettings = ({ settings, onSettingChange }: SectionSettingsProps) => (
  <Card style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg text-white">Sections</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6 pt-0">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-white">Food Section Title</Label>
        <Input
          value={settings.sectionTitles.foodSection}
          onChange={(e) => onSettingChange("sectionTitles.foodSection", e.target.value)}
          placeholder="FOOD"
          className="bg-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-white">Beverage Section Title</Label>
        <Input
          value={settings.sectionTitles.beverageSection}
          onChange={(e) => onSettingChange("sectionTitles.beverageSection", e.target.value)}
          placeholder="BEVERAGES"
          className="bg-white"
        />
      </div>

      <FontSelector
        value={settings.categoryTitle.fontFamily}
        onChange={(value) => onSettingChange("categoryTitle.fontFamily", value)}
        label="Font Family"
      />
      <FontWeightSelector
        value={settings.categoryTitle.fontWeight}
        onChange={(value) => onSettingChange("categoryTitle.fontWeight", value)}
        label="Font Weight"
      />
      <FontSizeSelector
        value={settings.categoryTitle.fontSize}
        onChange={(value) => onSettingChange("categoryTitle.fontSize", value)}
        label="Font Size"
        textType="category"
      />
      <ColorPicker
        value={settings.categoryTitle.color}
        onChange={(value) => onSettingChange("categoryTitle.color", value)}
        label="Text Color"
      />

      <AlignmentSelector
        value={settings.categoryTitleStyle.alignment}
        onChange={(value) => onSettingChange("categoryTitleStyle.alignment", value)}
        label="Text Alignment"
      />

      <div className="space-y-2">
        <Label className="text-sm font-medium text-white">Line Style</Label>
        <Select
          value={settings.categoryTitleStyle.lineType}
          onValueChange={(value) => onSettingChange("categoryTitleStyle.lineType", value)}
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

      {settings.categoryTitleStyle.lineType !== "none" && (
        <>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Line Position</Label>
            <Select
              value={settings.categoryTitleStyle.linePosition}
              onValueChange={(value) => onSettingChange("categoryTitleStyle.linePosition", value)}
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
            value={settings.categoryTitleStyle.lineThickness}
            onChange={(value) => onSettingChange("categoryTitleStyle.lineThickness", value)}
            label="Line Thickness"
            min={1}
            max={6}
          />
          <ColorPicker
            value={settings.categoryTitleStyle.lineColor}
            onChange={(value) => onSettingChange("categoryTitleStyle.lineColor", value)}
            label="Line Color"
          />
        </>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="show-category-descriptions"
          checked={settings.categoryDescription.show}
          onCheckedChange={(checked) => onSettingChange("categoryDescription.show", checked)}
        />
        <Label htmlFor="show-category-descriptions" className="text-sm font-medium text-white">
          Show Category Descriptions
        </Label>
      </div>

      {settings.categoryDescription.show && (
        <>
          <FontSelector
            value={settings.categoryDescription.fontFamily}
            onChange={(value) => onSettingChange("categoryDescription.fontFamily", value)}
            label="Description Font Family"
          />
          <FontWeightSelector
            value={settings.categoryDescription.fontWeight}
            onChange={(value) => onSettingChange("categoryDescription.fontWeight", value)}
            label="Description Font Weight"
          />
          <FontSizeSelector
            value={settings.categoryDescription.fontSize}
            onChange={(value) => onSettingChange("categoryDescription.fontSize", value)}
            label="Description Font Size"
            textType="description"
          />
          <ColorPicker
            value={settings.categoryDescription.color}
            onChange={(value) => onSettingChange("categoryDescription.color", value)}
            label="Description Text Color"
          />
        </>
      )}
    </CardContent>
  </Card>
)
