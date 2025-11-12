"use client"

import type { Menu, MenuCategory } from "@/types/menu"
import type { MenuSettings } from "@/types/settings"
import { MenuCategoryComponent } from "./menu-category"
import { PageBreakIndicator } from "@/components/ui/page-break-indicator"
import { EditableRichText } from "@/components/ui/editable-rich-text"
import { renderDecorativeLine } from "@/utils/decorative-lines"

interface MenuSectionProps {
  categories: MenuCategory[]
  sectionTitle: string
  settings: MenuSettings
  onSettingChange: (path: string, value: any) => void
  onMenuChange?: (updater: (prev: Menu) => Menu) => void
  sectionType: "food" | "drink"
  onAddPageBreak?: (elementId: string, position: "before" | "after") => void
  onRemovePageBreak?: (pageBreakId: string) => void
  hasPageBreakBefore?: boolean
  hasPageBreakAfter?: boolean
  pageBreakBeforeId?: string
  pageBreakAfterId?: string
  hasPageBreak?: (elementId: string, position: "before" | "after") => boolean
  getPageBreakId?: (elementId: string, position: "before" | "after") => string | undefined
}

export const MenuSectionComponent = ({
  categories,
  sectionTitle,
  settings,
  onSettingChange,
  onMenuChange,
  sectionType,
  onAddPageBreak,
  onRemovePageBreak,
  hasPageBreakBefore = false,
  hasPageBreakAfter = false,
  pageBreakBeforeId,
  pageBreakAfterId,
  hasPageBreak,
  getPageBreakId,
}: MenuSectionProps) => {
  const filteredCategories = categories.filter((cat) => cat.type === sectionType)

  if (filteredCategories.length === 0) return null

  const settingPath = sectionType === "food" ? "sectionTitles.foodSection" : "sectionTitles.beverageSection"

  return (
    <div className="relative w-full">
      {/* Page Break Indicator - Before Section */}
      {onAddPageBreak && (
        <div className="relative w-full" style={{ marginBottom: hasPageBreakBefore ? "0px" : "16px" }}>
          <PageBreakIndicator
            onAddPageBreak={() => onAddPageBreak(`section-${sectionType}`, "before")}
            onRemovePageBreak={pageBreakBeforeId ? () => onRemovePageBreak?.(pageBreakBeforeId) : undefined}
            hasPageBreak={hasPageBreakBefore}
            position="before"
            elementType="section"
          />
        </div>
      )}

      {/* Section Content - With proper spacing from page breaks */}
      <div
        style={{
          paddingTop: hasPageBreakBefore ? "20px" : "0px",
          paddingBottom: hasPageBreakAfter ? "20px" : "0px",
        }}
      >
        <div
          style={{
            textAlign: settings.sectionTitles.alignment as any,
            marginBottom: `${settings.spacing.sectionToCategory}px`,
          }}
        >
          <EditableRichText
            value={sectionTitle}
            onChange={(value) => onSettingChange(settingPath, value)}
            style={{
              fontSize: `${settings.sectionTitle.fontSize}px`,
              fontFamily: settings.sectionTitle.fontFamily,
              color: settings.sectionTitle.color,
              fontWeight: settings.sectionTitle.fontWeight === "bold" ? "bold" : "normal",
              fontStyle: settings.sectionTitle.fontWeight === "italic" ? "italic" : "normal",
              margin: 0,
              lineHeight: 1.2,
            }}
          />
          {settings.sectionTitleStyle.showLine && (
            <div
              className="mt-2"
              style={renderDecorativeLine(settings.sectionTitleStyle.lineType, settings.sectionTitle.color, 2)}
            />
          )}
        </div>

        {filteredCategories.map((category, categoryIndex) => (
          <MenuCategoryComponent
            key={category.id}
            category={category}
            settings={settings}
            onMenuChange={onMenuChange}
            onAddPageBreak={onAddPageBreak}
            onRemovePageBreak={onRemovePageBreak}
            hasPageBreakBefore={hasPageBreak ? hasPageBreak(`category-${category.id}`, "before") : false}
            hasPageBreakAfter={hasPageBreak ? hasPageBreak(`category-${category.id}`, "after") : false}
            pageBreakBeforeId={getPageBreakId ? getPageBreakId(`category-${category.id}`, "before") : undefined}
            pageBreakAfterId={getPageBreakId ? getPageBreakId(`category-${category.id}`, "after") : undefined}
            hasPageBreak={hasPageBreak}
            getPageBreakId={getPageBreakId}
          />
        ))}
      </div>

      {/* Page Break Indicator - After Section */}
      {onAddPageBreak && (
        <div className="relative w-full" style={{ marginTop: hasPageBreakAfter ? "0px" : "16px" }}>
          <PageBreakIndicator
            onAddPageBreak={() => onAddPageBreak(`section-${sectionType}`, "after")}
            onRemovePageBreak={pageBreakAfterId ? () => onRemovePageBreak?.(pageBreakAfterId) : undefined}
            hasPageBreak={hasPageBreakAfter}
            position="after"
            elementType="section"
          />
        </div>
      )}
    </div>
  )
}
