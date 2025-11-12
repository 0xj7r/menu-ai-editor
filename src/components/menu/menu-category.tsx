"use client"

import type { Menu, MenuCategory } from "@/types/menu"
import type { MenuSettings } from "@/types/settings"
import { MenuItemComponent } from "./menu-item"
import { PageBreakIndicator } from "@/components/ui/page-break-indicator"
import { renderDecorativeLine } from "@/utils/decorative-lines"
import { EditableRichText } from "@/components/ui/editable-rich-text"

interface MenuCategoryProps {
  category: MenuCategory
  settings: MenuSettings
  onMenuChange?: (updater: (prev: Menu) => Menu) => void
  onAddPageBreak?: (elementId: string, position: "before" | "after") => void
  onRemovePageBreak?: (pageBreakId: string) => void
  hasPageBreakBefore?: boolean
  hasPageBreakAfter?: boolean
  pageBreakBeforeId?: string
  pageBreakAfterId?: string
  hasPageBreak?: (elementId: string, position: "before" | "after") => boolean
  getPageBreakId?: (elementId: string, position: "before" | "after") => string | undefined
}

export const MenuCategoryComponent = ({
  category,
  settings,
  onMenuChange,
  onAddPageBreak,
  onRemovePageBreak,
  hasPageBreakBefore = false,
  hasPageBreakAfter = false,
  pageBreakBeforeId,
  pageBreakAfterId,
  hasPageBreak,
  getPageBreakId,
}: MenuCategoryProps) => {
  return (
    <div className="relative w-full">
      {/* Page Break Indicator - Before Category */}
      {onAddPageBreak && (
        <div className="relative w-full" style={{ marginBottom: hasPageBreakBefore ? "0px" : "12px" }}>
          <PageBreakIndicator
            onAddPageBreak={() => onAddPageBreak(`category-${category.id}`, "before")}
            onRemovePageBreak={pageBreakBeforeId ? () => onRemovePageBreak?.(pageBreakBeforeId) : undefined}
            hasPageBreak={hasPageBreakBefore}
            position="before"
            elementType="category"
          />
        </div>
      )}

      {/* Category Content - With proper spacing from page breaks */}
      <div
        style={{
          marginBottom: `${settings.spacing.categorySpacing}px`,
          paddingTop: hasPageBreakBefore ? "16px" : "0px",
          paddingBottom: hasPageBreakAfter ? "16px" : "0px",
        }}
      >
        {/* Category Title */}
        <div
          style={{
            textAlign: settings.categoryTitleStyle.alignment as any,
            marginBottom: settings.categoryDescription.show ? "8px" : "16px",
            display:
              settings.categoryTitleStyle.lineType !== "none" && settings.categoryTitleStyle.linePosition === "beside"
                ? "flex"
                : "block",
            alignItems:
              settings.categoryTitleStyle.lineType !== "none" && settings.categoryTitleStyle.linePosition === "beside"
                ? "center"
                : "initial",
            gap:
              settings.categoryTitleStyle.lineType !== "none" && settings.categoryTitleStyle.linePosition === "beside"
                ? "12px"
                : "0",
            justifyContent:
              settings.categoryTitleStyle.alignment === "center"
                ? "center"
                : settings.categoryTitleStyle.alignment === "right"
                  ? "flex-end"
                  : "flex-start",
          }}
        >
          {settings.categoryTitleStyle.lineType !== "none" &&
            settings.categoryTitleStyle.linePosition === "beside" &&
            settings.categoryTitleStyle.alignment === "right" && (
              <div
                style={{
                  ...renderDecorativeLine(
                    settings.categoryTitleStyle.lineType,
                    settings.categoryTitleStyle.lineColor,
                    settings.categoryTitleStyle.lineThickness,
                  ),
                  flex: 1,
                  minWidth: "30px",
                }}
              />
            )}

          {settings.categoryTitleStyle.lineType !== "none" &&
            settings.categoryTitleStyle.linePosition === "beside" &&
            settings.categoryTitleStyle.alignment === "center" && (
              <div
                style={{
                  ...renderDecorativeLine(
                    settings.categoryTitleStyle.lineType,
                    settings.categoryTitleStyle.lineColor,
                    settings.categoryTitleStyle.lineThickness,
                  ),
                  flex: 1,
                  minWidth: "30px",
                }}
              />
            )}

          <EditableRichText
            value={category.name}
            onChange={(value) => {
              onMenuChange?.((prev) => ({
                ...prev,
                categories: prev.categories.map((c) =>
                  c.id === category.id ? { ...c, name: value } : c
                ),
              }))
            }}
            style={{
              fontSize: `${settings.categoryTitle.fontSize}px`,
              fontFamily: settings.categoryTitle.fontFamily,
              color: settings.categoryTitle.color,
              fontWeight: settings.categoryTitle.fontWeight === "bold" ? "bold" : "normal",
              fontStyle: settings.categoryTitle.fontWeight === "italic" ? "italic" : "normal",
              margin: 0,
              lineHeight: 1.2,
            }}
          />

          {settings.categoryTitleStyle.lineType !== "none" &&
            settings.categoryTitleStyle.linePosition === "beside" &&
            settings.categoryTitleStyle.alignment === "left" && (
              <div
                style={{
                  ...renderDecorativeLine(
                    settings.categoryTitleStyle.lineType,
                    settings.categoryTitleStyle.lineColor,
                    settings.categoryTitleStyle.lineThickness,
                  ),
                  flex: 1,
                  minWidth: "30px",
                }}
              />
            )}

          {settings.categoryTitleStyle.lineType !== "none" &&
            settings.categoryTitleStyle.linePosition === "beside" &&
            settings.categoryTitleStyle.alignment === "center" && (
              <div
                style={{
                  ...renderDecorativeLine(
                    settings.categoryTitleStyle.lineType,
                    settings.categoryTitleStyle.lineColor,
                    settings.categoryTitleStyle.lineThickness,
                  ),
                  flex: 1,
                  minWidth: "30px",
                }}
              />
            )}

          {settings.categoryTitleStyle.lineType !== "none" && settings.categoryTitleStyle.linePosition === "below" && (
            <div
              className="mt-2"
              style={renderDecorativeLine(
                settings.categoryTitleStyle.lineType,
                settings.categoryTitleStyle.lineColor,
                settings.categoryTitleStyle.lineThickness,
              )}
            />
          )}
        </div>

        {/* Category Description */}
        {settings.categoryDescription.show && (
          <div style={{ marginBottom: "24px" }}>
            <EditableRichText
              value={category.description}
              onChange={(value) => {
                onMenuChange?.((prev) => ({
                  ...prev,
                  categories: prev.categories.map((c) =>
                    c.id === category.id ? { ...c, description: value } : c
                  ),
                }))
              }}
              style={{
                fontSize: `${settings.categoryDescription.fontSize}px`,
                fontFamily: settings.categoryDescription.fontFamily,
                color: settings.categoryDescription.color,
                fontWeight: settings.categoryDescription.fontWeight === "bold" ? "bold" : "normal",
                fontStyle: settings.categoryDescription.fontWeight === "italic" ? "italic" : "normal",
                margin: 0,
                lineHeight: 1.4,
              }}
            />
          </div>
        )}

        {/* Category Items */}
        <div className="space-y-2">
          {category.items.map((item, itemIndex) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              settings={settings}
              categoryId={category.id}
              onMenuChange={onMenuChange}
              onAddPageBreak={onAddPageBreak}
              onRemovePageBreak={onRemovePageBreak}
              hasPageBreakBefore={hasPageBreak ? hasPageBreak(`item-${item.id}`, "before") : false}
              hasPageBreakAfter={hasPageBreak ? hasPageBreak(`item-${item.id}`, "after") : false}
              pageBreakBeforeId={getPageBreakId ? getPageBreakId(`item-${item.id}`, "before") : undefined}
              pageBreakAfterId={getPageBreakId ? getPageBreakId(`item-${item.id}`, "after") : undefined}
            />
          ))}
        </div>
      </div>

      {/* Page Break Indicator - After Category */}
      {onAddPageBreak && (
        <div className="relative w-full" style={{ marginTop: hasPageBreakAfter ? "0px" : "12px" }}>
          <PageBreakIndicator
            onAddPageBreak={() => onAddPageBreak(`category-${category.id}`, "after")}
            onRemovePageBreak={pageBreakAfterId ? () => onRemovePageBreak?.(pageBreakAfterId) : undefined}
            hasPageBreak={hasPageBreakAfter}
            position="after"
            elementType="category"
          />
        </div>
      )}
    </div>
  )
}
