"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LayoutSettings } from "./layout-settings"
import { HeaderSettings } from "./header-settings"
import { SectionSettings } from "./section-settings"
import { ProductSettings } from "./product-settings"
import type { MenuSettings } from "@/types/settings"

interface SettingsPanelProps {
  settings: MenuSettings
  onSettingChange: (path: string, value: any) => void
}

export const SettingsPanel = ({ settings, onSettingChange }: SettingsPanelProps) => {
  const [activeSection, setActiveSection] = useState("layout")
  const [selectedPreset, setSelectedPreset] = useState("standard")

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset)
    // Apply preset logic here
    switch (preset) {
      case "standard":
        onSettingChange("backgroundColor", "#ffffff")
        onSettingChange("headerText.color", "#1f2937")
        onSettingChange("categoryTitle.color", "#1f2937")
        onSettingChange("categoryDescription.color", "#6b7280")
        onSettingChange("itemTitle.color", "#374151")
        onSettingChange("itemDescription.color", "#6b7280")
        onSettingChange("price.color", "#1f2937")
        onSettingChange("priceLabel.color", "#6b7280")
        onSettingChange("sectionTitle.color", "#1f2937")
        onSettingChange("borderColor", "#e5e7eb")
        onSettingChange("headerDecorations.lineColor", "#1f2937")
        onSettingChange("categoryTitleStyle.lineColor", "#1f2937")
        onSettingChange("iconBackground.show", false)
        onSettingChange("iconBackground.color", "#f3f4f6")
        break
      case "qodeup":
        onSettingChange("backgroundColor", "#DC0746")
        onSettingChange("headerText.color", "#ffffff")
        onSettingChange("categoryTitle.color", "#ffffff")
        onSettingChange("categoryDescription.color", "#fce7f3")
        onSettingChange("itemTitle.color", "#ffffff")
        onSettingChange("itemDescription.color", "#fce7f3")
        onSettingChange("price.color", "#ffffff")
        onSettingChange("priceLabel.color", "#fce7f3")
        onSettingChange("sectionTitle.color", "#ffffff")
        onSettingChange("borderColor", "#ffffff")
        onSettingChange("headerDecorations.lineColor", "#f26387")
        onSettingChange("categoryTitleStyle.lineColor", "#f26387")
        onSettingChange("iconBackground.show", true)
        onSettingChange("iconBackground.color", "#fce7f3")
        break
      case "nature":
        onSettingChange("backgroundColor", "#92ae47")
        onSettingChange("headerText.color", "#1a2e05")
        onSettingChange("categoryTitle.color", "#e7ffaa")
        onSettingChange("categoryDescription.color", "#a0bd47")
        onSettingChange("itemTitle.color", "#e7ffaa")
        onSettingChange("itemDescription.color", "#a0bd47")
        onSettingChange("price.color", "#1a2e05")
        onSettingChange("priceLabel.color", "#365314")
        onSettingChange("sectionTitle.color", "#1a2e05")
        onSettingChange("borderColor", "#d4e170")
        onSettingChange("headerDecorations.lineColor", "#d4e170")
        onSettingChange("categoryTitleStyle.lineColor", "#d4e170")
        onSettingChange("iconBackground.show", true)
        onSettingChange("iconBackground.color", "#ecfccb")
        break
      case "ocean":
        onSettingChange("backgroundColor", "#0ea5e9")
        onSettingChange("headerText.color", "#0c4a6e")
        onSettingChange("categoryTitle.color", "#0c4a6e")
        onSettingChange("categoryDescription.color", "#075985")
        onSettingChange("itemTitle.color", "#0c4a6e")
        onSettingChange("itemDescription.color", "#075985")
        onSettingChange("price.color", "#0c4a6e")
        onSettingChange("priceLabel.color", "#075985")
        onSettingChange("sectionTitle.color", "#0c4a6e")
        onSettingChange("borderColor", "#7dd3fc")
        onSettingChange("headerDecorations.lineColor", "#7dd3fc")
        onSettingChange("categoryTitleStyle.lineColor", "#7dd3fc")
        onSettingChange("iconBackground.show", true)
        onSettingChange("iconBackground.color", "#e0f2fe")
        break
    }
  }

  return (
    <div className="w-80" style={{ backgroundColor: "#DC0746" }}>
      <div className="p-6">
        <Tabs defaultValue="main" className="w-full">
          <TabsList className="grid w-full grid-cols-1 bg-white mb-4">
            <TabsTrigger value="main" className="data-[state=active]:bg-[#DC0746] data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="mb-6">
            <Label className="text-sm font-medium text-white mb-2 block">Edit Section</Label>
            <Select value={activeSection} onValueChange={setActiveSection}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="layout">Layout & Colors</SelectItem>
                <SelectItem value="header">Menu Title</SelectItem>
                <SelectItem value="sections">Sections</SelectItem>
                <SelectItem value="products">Products</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="main" className="space-y-6 mt-6">
            {activeSection === "layout" && (
              <LayoutSettings
                settings={settings}
                onSettingChange={onSettingChange}
                selectedPreset={selectedPreset}
                onPresetChange={handlePresetChange}
              />
            )}

            {activeSection === "header" && <HeaderSettings settings={settings} onSettingChange={onSettingChange} />}

            {activeSection === "sections" && <SectionSettings settings={settings} onSettingChange={onSettingChange} />}

            {activeSection === "products" && <ProductSettings settings={settings} onSettingChange={onSettingChange} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
