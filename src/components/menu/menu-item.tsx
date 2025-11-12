"use client"

import type { Menu, MenuItem } from "@/types/menu"
import type { MenuSettings } from "@/types/settings"
import { iconTypes } from "@/constants/options"
import { EditableRichText } from "@/components/ui/editable-rich-text"
import { PageBreakIndicator } from "@/components/ui/page-break-indicator"

interface MenuItemProps {
  item: MenuItem
  settings: MenuSettings
  categoryId: number
  onMenuChange?: (updater: (prev: Menu) => Menu) => void
  onAddPageBreak?: (elementId: string, position: "before" | "after") => void
  onRemovePageBreak?: (pageBreakId: string) => void
  hasPageBreakBefore?: boolean
  hasPageBreakAfter?: boolean
  pageBreakBeforeId?: string
  pageBreakAfterId?: string
}

export const MenuItemComponent = ({
  item,
  settings,
  categoryId,
  onMenuChange,
  onAddPageBreak,
  onRemovePageBreak,
  hasPageBreakBefore = false,
  hasPageBreakAfter = false,
  pageBreakBeforeId,
  pageBreakAfterId,
}: MenuItemProps) => {
  return (
    <div className="relative w-full">
      {/* Page Break Indicator - Before Item */}
      {onAddPageBreak && (
        <div className="relative w-full" style={{ marginBottom: hasPageBreakBefore ? "0px" : "8px" }}>
          <PageBreakIndicator
            onAddPageBreak={() => onAddPageBreak(`item-${item.id}`, "before")}
            onRemovePageBreak={pageBreakBeforeId ? () => onRemovePageBreak?.(pageBreakBeforeId) : undefined}
            hasPageBreak={hasPageBreakBefore}
            position="before"
            elementType="item"
          />
        </div>
      )}

      {/* Item Content - With proper spacing from page breaks */}
      <div
        style={{
          marginBottom: `${settings.spacing.itemSpacing}px`,
          paddingTop: hasPageBreakBefore ? "12px" : "0px",
          paddingBottom: hasPageBreakAfter ? "12px" : "0px",
        }}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <EditableRichText
                value={item.name}
                onChange={(value) => {
                  onMenuChange?.((prev) => ({
                    ...prev,
                    categories: prev.categories.map((c) =>
                      c.id === categoryId
                        ? {
                            ...c,
                            items: c.items.map((it) =>
                              it.id === item.id ? { ...it, name: value } : it
                            ),
                          }
                        : c
                    ),
                  }))
                }}
                style={{
                  fontSize: `${settings.itemTitle.fontSize}px`,
                  fontFamily: settings.itemTitle.fontFamily,
                  color: settings.itemTitle.color,
                  fontWeight: settings.itemTitle.fontWeight === "bold" ? "bold" : "normal",
                  fontStyle: settings.itemTitle.fontWeight === "italic" ? "italic" : "normal",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              />
              {settings.showIcons && item.icons && (
                <div className="flex gap-1">
                  {item.icons.map((iconKey) => {
                    const iconType = iconTypes.find((type) => type.key === iconKey)
                    if (!iconType) return null
                    const IconComponent = iconType.icon
                    return (
                      <div
                        key={iconKey}
                        className="flex items-center justify-center"
                        style={{
                          width: `${settings.iconSize + 8}px`,
                          height: `${settings.iconSize + 8}px`,
                          borderRadius: "50%",
                          backgroundColor: settings.iconBackground.show
                            ? `${settings.iconBackground.color}${Math.round(settings.iconBackground.opacity * 255)
                                .toString(16)
                                .padStart(2, "0")}`
                            : "transparent",
                        }}
                      >
                        <IconComponent size={settings.iconSize} color={iconType.color} />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            {settings.itemDescription.show && (
              <EditableRichText
                value={item.description}
                onChange={(value) => {
                  onMenuChange?.((prev) => ({
                    ...prev,
                    categories: prev.categories.map((c) =>
                      c.id === categoryId
                        ? {
                            ...c,
                            items: c.items.map((it) =>
                              it.id === item.id ? { ...it, description: value } : it
                            ),
                          }
                        : c
                    ),
                  }))
                }}
                multiline={true}
                style={{
                  fontSize: `${settings.itemDescription.fontSize}px`,
                  fontFamily: settings.itemDescription.fontFamily,
                  color: settings.itemDescription.color,
                  fontWeight: settings.itemDescription.fontWeight === "bold" ? "bold" : "normal",
                  fontStyle: settings.itemDescription.fontWeight === "italic" ? "italic" : "normal",
                  margin: 0,
                  marginTop: "4px",
                  lineHeight: 1.3,
                  display: "block",
                }}
              />
            )}
          </div>
          <div className="text-right">
            {item.prices.map((price, priceIndex) => (
              <div
                key={priceIndex}
                className={
                  settings.priceStyle.multiPriceLayout === "stacked" ? "mb-1" : "inline-flex items-baseline gap-1 mr-2"
                }
                style={{ textAlign: "right" }}
              >
                {price.label && (
                  <EditableRichText
                    value={price.label}
                    onChange={(value) => {
                      onMenuChange?.((prev) => ({
                        ...prev,
                        categories: prev.categories.map((c) =>
                          c.id === categoryId
                            ? {
                                ...c,
                                items: c.items.map((it) =>
                                  it.id === item.id
                                    ? {
                                        ...it,
                                        prices: it.prices.map((p, idx) =>
                                          idx === priceIndex ? { ...p, label: value } : p
                                        ),
                                      }
                                    : it
                                ),
                              }
                            : c
                        ),
                      }))
                    }}
                    style={{
                      fontSize: `${settings.priceLabel.fontSize}px`,
                      fontFamily: settings.priceLabel.fontFamily,
                      color: settings.priceLabel.color,
                      fontWeight: settings.priceLabel.fontWeight === "bold" ? "bold" : "normal",
                      fontStyle: settings.priceLabel.fontWeight === "italic" ? "italic" : "normal",
                      lineHeight: 1.2,
                      marginRight: "4px",
                    }}
                  />
                )}
                <EditableRichText
                  value={`€${price.value.toFixed(2)}`}
                  onChange={(value) => {
                    // Extract numeric value from the formatted string
                    const numericValue = Number.parseFloat(value.replace(/[€,]/g, ""))
                    if (!isNaN(numericValue)) {
                      onMenuChange?.((prev) => ({
                        ...prev,
                        categories: prev.categories.map((c) =>
                          c.id === categoryId
                            ? {
                                ...c,
                                items: c.items.map((it) =>
                                  it.id === item.id
                                    ? {
                                        ...it,
                                        prices: it.prices.map((p, idx) =>
                                          idx === priceIndex ? { ...p, value: numericValue } : p
                                        ),
                                      }
                                    : it
                                ),
                              }
                            : c
                        ),
                      }))
                    }
                  }}
                  style={{
                    fontSize: `${settings.price.fontSize}px`,
                    fontFamily: settings.price.fontFamily,
                    color: settings.price.color,
                    fontWeight: settings.price.fontWeight === "bold" ? "bold" : "normal",
                    fontStyle: settings.price.fontWeight === "italic" ? "italic" : "normal",
                    lineHeight: 1.2,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page Break Indicator - After Item */}
      {onAddPageBreak && (
        <div className="relative w-full" style={{ marginTop: hasPageBreakAfter ? "0px" : "8px" }}>
          <PageBreakIndicator
            onAddPageBreak={() => onAddPageBreak(`item-${item.id}`, "after")}
            onRemovePageBreak={pageBreakAfterId ? () => onRemovePageBreak?.(pageBreakAfterId) : undefined}
            hasPageBreak={hasPageBreakAfter}
            position="after"
            elementType="item"
          />
        </div>
      )}
    </div>
  )
}
