"use client"

import { useState } from "react"
import type { MenuSettings } from "@/types/settings"
import { defaultSettings } from "@/constants/default-settings"

export const useMenuSettings = () => {
  const [settings, setSettings] = useState<MenuSettings>(defaultSettings)

  const updateSetting = (path: string, value: any) => {
    setSettings((prev) => {
      const keys = path.split(".")
      const newSettings = { ...prev }
      let current: any = newSettings

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newSettings
    })
  }

  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case "standard":
        updateSetting("backgroundColor", "#ffffff")
        updateSetting("headerText.color", "#1f2937")
        updateSetting("categoryTitle.color", "#1f2937")
        updateSetting("categoryDescription.color", "#6b7280")
        updateSetting("itemTitle.color", "#374151")
        updateSetting("itemDescription.color", "#6b7280")
        updateSetting("price.color", "#1f2937")
        updateSetting("priceLabel.color", "#6b7280")
        updateSetting("sectionTitle.color", "#1f2937")
        updateSetting("borderColor", "#e5e7eb")
        updateSetting("headerDecorations.lineColor", "#1f2937")
        updateSetting("categoryTitleStyle.lineColor", "#1f2937")
        updateSetting("iconBackground.show", false)
        updateSetting("iconBackground.color", "#f3f4f6")
        break
      case "qodeup":
        updateSetting("backgroundColor", "#DC0746")
        updateSetting("headerText.color", "#ffffff")
        updateSetting("categoryTitle.color", "#ffffff")
        updateSetting("categoryDescription.color", "#fce7f3")
        updateSetting("itemTitle.color", "#ffffff")
        updateSetting("itemDescription.color", "#fce7f3")
        updateSetting("price.color", "#ffffff")
        updateSetting("priceLabel.color", "#fce7f3")
        updateSetting("sectionTitle.color", "#ffffff")
        updateSetting("borderColor", "#ffffff")
        updateSetting("headerDecorations.lineColor", "#f26387")
        updateSetting("categoryTitleStyle.lineColor", "#f26387")
        updateSetting("iconBackground.show", true)
        updateSetting("iconBackground.color", "#fce7f3")
        break
      case "nature":
        updateSetting("backgroundColor", "#92ae47")
        updateSetting("headerText.color", "#1a2e05")
        updateSetting("categoryTitle.color", "#e7ffaa")
        updateSetting("categoryDescription.color", "#a0bd47")
        updateSetting("itemTitle.color", "#e7ffaa")
        updateSetting("itemDescription.color", "#a0bd47")
        updateSetting("price.color", "#1a2e05")
        updateSetting("priceLabel.color", "#365314")
        updateSetting("sectionTitle.color", "#1a2e05")
        updateSetting("borderColor", "#d4e170")
        updateSetting("headerDecorations.lineColor", "#d4e170")
        updateSetting("categoryTitleStyle.lineColor", "#d4e170")
        updateSetting("iconBackground.show", true)
        updateSetting("iconBackground.color", "#ecfccb")
        break
      case "ocean":
        updateSetting("backgroundColor", "#0ea5e9")
        updateSetting("headerText.color", "#0c4a6e")
        updateSetting("categoryTitle.color", "#0c4a6e")
        updateSetting("categoryDescription.color", "#075985")
        updateSetting("itemTitle.color", "#0c4a6e")
        updateSetting("itemDescription.color", "#075985")
        updateSetting("price.color", "#0c4a6e")
        updateSetting("priceLabel.color", "#075985")
        updateSetting("sectionTitle.color", "#0c4a6e")
        updateSetting("borderColor", "#7dd3fc")
        updateSetting("headerDecorations.lineColor", "#7dd3fc")
        updateSetting("categoryTitleStyle.lineColor", "#7dd3fc")
        updateSetting("iconBackground.show", true)
        updateSetting("iconBackground.color", "#e0f2fe")
        break
    }
  }

  return {
    settings,
    updateSetting,
    applyPreset,
  }
}
