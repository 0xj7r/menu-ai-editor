"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FontSelector } from "./font-selector"
import { FontWeightSelector } from "./font-weight-selector"
import { FontSizeSelector } from "./font-size-selector"
import { ColorPicker } from "./color-picker"
import type { MenuSettings } from "@/types/settings"

interface ProductSettingsProps {
  settings: MenuSettings
  onSettingChange: (path: string, value: any) => void
}

export const ProductSettings = ({ settings, onSettingChange }: ProductSettingsProps) => (
  <Card style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg text-white">Products</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6 pt-0">
      <div className="space-y-4">
        <FontSelector
          value={settings.itemTitle.fontFamily}
          onChange={(value) => onSettingChange("itemTitle.fontFamily", value)}
          label="Product Name Font Family"
        />
        <FontWeightSelector
          value={settings.itemTitle.fontWeight}
          onChange={(value) => onSettingChange("itemTitle.fontWeight", value)}
          label="Product Name Font Weight"
        />
        <FontSizeSelector
          value={settings.itemTitle.fontSize}
          onChange={(value) => onSettingChange("itemTitle.fontSize", value)}
          label="Product Name Font Size"
          textType="item"
        />
        <ColorPicker
          value={settings.itemTitle.color}
          onChange={(value) => onSettingChange("itemTitle.color", value)}
          label="Product Name Text Color"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="show-product-descriptions"
          checked={settings.itemDescription.show}
          onCheckedChange={(checked) => onSettingChange("itemDescription.show", checked)}
        />
        <Label htmlFor="show-product-descriptions" className="text-sm font-medium text-white">
          Show Product Descriptions
        </Label>
      </div>

      {settings.itemDescription.show && (
        <>
          <FontSelector
            value={settings.itemDescription.fontFamily}
            onChange={(value) => onSettingChange("itemDescription.fontFamily", value)}
            label="Description Font Family"
          />
          <FontWeightSelector
            value={settings.itemDescription.fontWeight}
            onChange={(value) => onSettingChange("itemDescription.fontWeight", value)}
            label="Description Font Weight"
          />
          <FontSizeSelector
            value={settings.itemDescription.fontSize}
            onChange={(value) => onSettingChange("itemDescription.fontSize", value)}
            label="Description Font Size"
            textType="description"
          />
          <ColorPicker
            value={settings.itemDescription.color}
            onChange={(value) => onSettingChange("itemDescription.color", value)}
            label="Description Text Color"
          />
        </>
      )}

      <div className="space-y-4">
        <h3 className="text-md font-semibold text-white border-b border-white/20 pb-2">Prices</h3>
        <FontSelector
          value={settings.price.fontFamily}
          onChange={(value) => onSettingChange("price.fontFamily", value)}
          label="Price Font Family"
        />
        <FontWeightSelector
          value={settings.price.fontWeight}
          onChange={(value) => onSettingChange("price.fontWeight", value)}
          label="Price Font Weight"
        />
        <FontSizeSelector
          value={settings.price.fontSize}
          onChange={(value) => onSettingChange("price.fontSize", value)}
          label="Price Font Size"
          textType="price"
        />
        <ColorPicker
          value={settings.price.color}
          onChange={(value) => onSettingChange("price.color", value)}
          label="Price Text Color"
        />

        <FontSelector
          value={settings.priceLabel.fontFamily}
          onChange={(value) => onSettingChange("priceLabel.fontFamily", value)}
          label="Price Label Font Family"
        />
        <FontWeightSelector
          value={settings.priceLabel.fontWeight}
          onChange={(value) => onSettingChange("priceLabel.fontWeight", value)}
          label="Price Label Font Weight"
        />
        <FontSizeSelector
          value={settings.priceLabel.fontSize}
          onChange={(value) => onSettingChange("priceLabel.fontSize", value)}
          label="Price Label Font Size"
          textType="priceLabel"
        />
        <ColorPicker
          value={settings.priceLabel.color}
          onChange={(value) => onSettingChange("priceLabel.color", value)}
          label="Price Label Text Color"
        />
      </div>
    </CardContent>
  </Card>
)
